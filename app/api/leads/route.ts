import { NextRequest } from "next/server";

export const runtime = "nodejs";

type Touchpoint = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
};

type LeadPayload = {
  coverage?: string;
  zip?: string;
  ageRange?: string;
  qualification?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  preferredCallTime?: string;
  consent?: boolean;
  website?: string;
  attribution?: {
    firstTouch?: Touchpoint;
    lastTouch?: Touchpoint;
    sourcePage?: string;
    hubspotUtk?: string;
  };
};

const allowedCoverage = new Set(["final-expense", "medicare", "both"]);

function clean(value: unknown, maxLength = 250) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validateLead(payload: LeadPayload) {
  const coverage = clean(payload.coverage, 30);
  const zip = clean(payload.zip, 5);
  const phone = clean(payload.phone, 40);
  const firstName = clean(payload.firstName, 80);
  const lastName = clean(payload.lastName, 80);

  return (
    allowedCoverage.has(coverage) &&
    /^\d{5}$/.test(zip) &&
    phone.length >= 7 &&
    firstName.length >= 1 &&
    lastName.length >= 1 &&
    clean(payload.ageRange, 30).length > 0 &&
    clean(payload.qualification, 160).length > 0 &&
    payload.consent === true
  );
}

function hubspotFields(payload: LeadPayload, leadId: string, submittedAt: string) {
  const first = payload.attribution?.firstTouch;
  const last = payload.attribution?.lastTouch;
  const fields = [
    ["firstname", payload.firstName],
    ["lastname", payload.lastName],
    ["phone", payload.phone],
    ["email", payload.email],
    ["zip", payload.zip],
    ["fsi_lead_id", leadId],
    ["fsi_coverage_interest", payload.coverage],
    ["fsi_age_range", payload.ageRange],
    ["fsi_qualification_answer", payload.qualification],
    ["fsi_preferred_call_time", payload.preferredCallTime],
    ["fsi_source_page", payload.attribution?.sourcePage],
    ["fsi_first_touch_source", first?.utmSource],
    ["fsi_first_touch_medium", first?.utmMedium],
    ["fsi_first_touch_campaign", first?.utmCampaign],
    ["fsi_first_touch_landing_page", first?.landingPage],
    ["fsi_last_touch_source", last?.utmSource],
    ["fsi_last_touch_medium", last?.utmMedium],
    ["fsi_last_touch_campaign", last?.utmCampaign],
    ["fsi_gclid", last?.gclid || first?.gclid],
    ["fsi_fbclid", last?.fbclid || first?.fbclid],
    ["fsi_msclkid", last?.msclkid || first?.msclkid],
    ["fsi_tcpa_consent", "true"],
    ["fsi_consent_timestamp", submittedAt],
  ];

  return fields
    .filter(([, value]) => clean(value).length > 0)
    .map(([name, value]) => ({ name, value: clean(value, 500) }));
}

async function deliverToHubSpot(
  payload: LeadPayload,
  leadId: string,
  submittedAt: string,
  ipAddress: string,
) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
  if (!portalId || !formGuid) return null;

  const pageUri = clean(payload.attribution?.lastTouch?.landingPage, 500);
  const context: Record<string, string> = {
    pageName: clean(payload.attribution?.sourcePage, 100) || "Find Senior Insurance",
    pageUri: pageUri ? `https://www.findseniorinsurance.com${pageUri}` : "https://www.findseniorinsurance.com/",
  };
  if (ipAddress) context.ipAddress = ipAddress;
  if (payload.attribution?.hubspotUtk) context.hutk = clean(payload.attribution.hubspotUtk, 200);

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(portalId)}/${encodeURIComponent(formGuid)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: String(Date.parse(submittedAt)),
        fields: hubspotFields(payload, leadId, submittedAt),
        context,
        skipValidation: true,
      }),
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) {
    throw new Error(`HubSpot rejected lead with status ${response.status}`);
  }

  return "hubspot";
}

async function deliverToWebhook(
  payload: LeadPayload,
  leadId: string,
  submittedAt: string,
  ipAddress: string,
  userAgent: string,
) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return null;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.LEAD_WEBHOOK_SECRET) {
    headers["X-Lead-Secret"] = process.env.LEAD_WEBHOOK_SECRET;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      leadId,
      submittedAt,
      ...payload,
      requestContext: { ipAddress, userAgent },
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook rejected lead with status ${response.status}`);
  }

  return "webhook";
}

export async function POST(request: NextRequest) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (clean(payload.website, 100)) {
    return Response.json({ accepted: true }, { status: 202 });
  }

  if (!validateLead(payload)) {
    return Response.json({ error: "Please complete all required fields" }, { status: 400 });
  }

  const leadId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const ipAddress = clean(request.headers.get("x-forwarded-for")?.split(",")[0], 64);
  const userAgent = clean(request.headers.get("user-agent"), 300);

  const configured = Boolean(
    (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID) ||
    process.env.LEAD_WEBHOOK_URL,
  );

  if (!configured) {
    console.error("Lead delivery is not configured", { leadId });
    return Response.json({ error: "Lead delivery is not configured" }, { status: 503 });
  }

  const deliveries = await Promise.allSettled([
    deliverToHubSpot(payload, leadId, submittedAt, ipAddress),
    deliverToWebhook(payload, leadId, submittedAt, ipAddress, userAgent),
  ]);

  const accepted = deliveries.some(
    (delivery) => delivery.status === "fulfilled" && delivery.value,
  );

  if (!accepted) {
    console.error("All configured lead destinations failed", {
      leadId,
      failures: deliveries
        .filter((delivery) => delivery.status === "rejected")
        .map((delivery) => delivery.reason instanceof Error ? delivery.reason.message : "Unknown failure"),
    });
    return Response.json({ error: "Lead delivery failed" }, { status: 502 });
  }

  console.info("Lead accepted", { leadId });
  return Response.json({ accepted: true, leadId }, { status: 201 });
}
