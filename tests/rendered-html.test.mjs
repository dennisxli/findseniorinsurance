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

test("keeps the senior insurance lead experience and disclosures", async () => {
  const page = await readFile(new URL("app/page.tsx", projectRoot), "utf8");
  const layout = await readFile(new URL("app/layout.tsx", projectRoot), "utf8");

  assert.match(page, /Find coverage you can feel good about\./);
  assert.match(page, /Final Expense Insurance/);
  assert.match(page, /Medicare Insurance/);
  assert.match(page, /Request your free insurance review/);
  assert.match(page, /not affiliated with or endorsed by the U\.S\. government/i);
  assert.match(page, /from "next\/image"/);
  assert.match(layout, /Find Senior Insurance \| Life & Health Insurance Guidance/);
  assert.doesNotMatch(page, /codex-preview|Your site is taking shape/i);
});
