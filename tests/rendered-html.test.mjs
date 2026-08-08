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

  assert.match(page, /A clearer path through life &amp; Medicare insurance\./);
  assert.match(page, /YOUR GUIDE\. YOUR ADVOCATE\. YOUR CHOICE\./);
  assert.match(page, /Insurance guidance built around the person—not the policy\./);
  assert.match(page, /Final Expense Insurance/);
  assert.match(page, /Medicare Insurance/);
  assert.match(page, /Start your free guidance request/);
  assert.match(page, /\/logo-mark\.png/);
  assert.doesNotMatch(page, /trust-strip|Free service/);
  assert.match(page, /not affiliated with or endorsed by the U\.S\. government/i);
  assert.match(page, /from "next\/image"/);
  assert.match(layout, /Find Senior Insurance \| Navigate Life & Medicare Insurance/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(page, /codex-preview|Your site is taking shape/i);
});
