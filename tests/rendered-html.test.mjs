import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

test("uses the native Next.js build required by Vercel", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", projectRoot), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.engines.node, "22.x");
  assert.equal(packageJson.devDependencies?.vinext, undefined);
  assert.equal(packageJson.devDependencies?.wrangler, undefined);
});

test("keeps the differentiated senior insurance experience and disclosures", async () => {
  const page = await readFile(new URL("app/page.tsx", projectRoot), "utf8");
  const layout = await readFile(new URL("app/layout.tsx", projectRoot), "utf8");
  const leadForm = await readFile(new URL("app/components/LeadForm.tsx", projectRoot), "utf8");
  const privacy = await readFile(new URL("app/privacy/page.tsx", projectRoot), "utf8");

  assert.match(page, /A clearer path through life &amp; Medicare insurance\./);
  assert.match(page, /YOUR GUIDE\. YOUR ADVOCATE\. YOUR CHOICE\./);
  assert.match(page, /Insurance guidance built around the person—not the policy\./);
  assert.match(page, /Final Expense Insurance/);
  assert.match(page, /Medicare Insurance/);
  assert.match(page, /Help Me Compare My Options/);
  assert.match(leadForm, /Step \{step\} of 3/);
  assert.match(leadForm, /How much coverage are you considering\?/);
  assert.match(leadForm, /Where are you in your Medicare journey\?/);
  assert.match(leadForm, /\/api\/leads/);
  assert.match(leadForm, /prior express written consent/i);
  assert.match(page, /\/logo-mark\.png/);
  assert.doesNotMatch(page, /trust-strip|Free service/);
  assert.match(page, /not affiliated with or endorsed by the U\.S\. government/i);
  assert.match(page, /from "next\/image"/);
  assert.match(layout, /Find Senior Insurance \| Navigate Life & Medicare Insurance/);
  assert.match(layout, /\/og\.png/);
  assert.match(privacy, /Telephone and text-message consent/);
  assert.match(privacy, /STOP, QUIT, END, REVOKE, OPT OUT, CANCEL, or UNSUBSCRIBE/);
  assert.doesNotMatch(page, /codex-preview|Your site is taking shape/i);
});

test("includes paid landing pages and accepted-lead delivery", async () => {
  const finalExpense = await readFile(new URL("app/final-expense/page.tsx", projectRoot), "utf8");
  const medicare = await readFile(new URL("app/medicare-insurance/page.tsx", projectRoot), "utf8");
  const productPage = await readFile(new URL("app/components/ProductLandingPage.tsx", projectRoot), "utf8");
  const leadRoute = await readFile(new URL("app/api/leads/route.ts", projectRoot), "utf8");
  const attribution = await readFile(new URL("app/lib/attribution.ts", projectRoot), "utf8");
  const envExample = await readFile(new URL(".env.example", projectRoot), "utf8");

  assert.match(finalExpense, /product="final-expense"/);
  assert.match(medicare, /product="medicare"/);
  assert.match(productPage, /defaultCoverage=\{product\}/);
  assert.match(leadRoute, /HUBSPOT_PORTAL_ID/);
  assert.match(leadRoute, /LEAD_WEBHOOK_URL/);
  assert.match(leadRoute, /status: 503/);
  assert.match(leadRoute, /status: 201/);
  assert.match(attribution, /utm_source/);
  assert.match(attribution, /gclid/);
  assert.match(envExample, /NEXT_PUBLIC_GA_MEASUREMENT_ID=/);
});
