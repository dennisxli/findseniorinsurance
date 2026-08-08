# Lead funnel and revenue attribution

## Recommended starting CRM

Use HubSpot Free CRM first. It provides contact records, deal pipelines, tasks,
forms, and basic reporting without a migration when the business later upgrades.
The website also supports a generic webhook so lead buyers or another CRM can be
added without rebuilding the form.

Official references:

- https://www.hubspot.com/pricing/crm
- https://developers.hubspot.com/docs/api-reference/legacy/marketing/forms/v3-legacy/submit-data-unauthenticated

## Funnel data flow

1. A visitor arrives with campaign parameters such as UTM values, GCLID,
   FBCLID, or MSCLKID.
2. The site saves the first touch and records the most recent touch before the
   lead submits.
3. The three-step form captures product, ZIP, age range, a product-specific
   qualification answer, contact details, call preference, and consent.
4. `/api/leads` validates the request and delivers it to every configured
   destination.
5. The success screen appears only after at least one destination accepts the
   lead.
6. The CRM pipeline carries the lead through contact, qualification, quote,
   and sale so revenue can be reported by source and campaign.

## HubSpot setup

Create a HubSpot form and include the standard contact fields `firstname`,
`lastname`, `phone`, `email`, and `zip`. Create these custom contact properties
and add them to the form:

| Property | Purpose |
| --- | --- |
| `fsi_lead_id` | Unique website lead ID |
| `fsi_coverage_interest` | Final expense, Medicare, or both |
| `fsi_age_range` | Age qualification band |
| `fsi_qualification_answer` | Product-specific qualification response |
| `fsi_preferred_call_time` | Requested contact window |
| `fsi_source_page` | Homepage or paid landing page |
| `fsi_first_touch_source` | First UTM source |
| `fsi_first_touch_medium` | First UTM medium |
| `fsi_first_touch_campaign` | First UTM campaign |
| `fsi_first_touch_landing_page` | First page and query string |
| `fsi_last_touch_source` | Most recent UTM source |
| `fsi_last_touch_medium` | Most recent UTM medium |
| `fsi_last_touch_campaign` | Most recent UTM campaign |
| `fsi_gclid` | Google Ads click ID |
| `fsi_fbclid` | Meta click ID |
| `fsi_msclkid` | Microsoft Ads click ID |
| `fsi_tcpa_consent` | Consent captured flag |
| `fsi_consent_timestamp` | Consent timestamp |

Copy the HubSpot account ID and form GUID into `HUBSPOT_PORTAL_ID` and
`HUBSPOT_FORM_GUID` in Vercel project environment variables. Use Production,
Preview, and Development scopes only where the same destination is appropriate.

## Recommended CRM pipeline

Use a single pipeline initially:

1. New lead
2. Contact attempted
3. Connected
4. Qualified
5. Quote presented
6. Closed won
7. Unqualified or closed lost

Create a deal when a lead is qualified, then enter expected value and final
revenue on the deal. Keep the associated contact and its first-touch fields
unchanged.

## Analytics events

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable Google Analytics 4. The site emits:

- `lead_cta_clicked`
- `lead_form_started`
- `lead_step_completed`
- `lead_submitted`
- `post_submit_phone_clicked`

The CRM is the source of truth for downstream outcomes. At minimum, report:

- landing-page conversion rate;
- accepted lead rate;
- contact rate;
- qualified lead rate;
- quote rate;
- sale rate;
- cost per accepted and qualified lead;
- revenue per lead and revenue per visitor; and
- revenue by source, campaign, product, state, and landing page.

When a deal becomes closed won, send that outcome and value back to the
advertising platform as an offline conversion. This closes the loop between ad
spend and actual revenue instead of optimizing only for inexpensive form fills.

## Before paid traffic

- Replace the reserved `(800) 555-0147` placeholder with a real tracked number.
- Test HubSpot and any buyer webhook with non-consumer test data.
- Confirm that rejected deliveries show an error instead of a false success.
- Have qualified counsel review the privacy policy, partner disclosure, consent
  language, calling/texting procedures, Medicare marketing, and state rules.
- Verify that all insurance partners and vendors handle consent revocation and
  suppression requests consistently.
