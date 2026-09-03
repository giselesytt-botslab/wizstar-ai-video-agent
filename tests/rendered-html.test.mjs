import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete AI Video Agent landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AI Video Agent for Complete Video Creation/);
  assert.match(html, /AI VIDEO/);
  assert.match(html, /AGENT/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /rel="canonical" href="https:\/\/wizstar\.com\/official\/ai-video-agent"/);
  assert.match(html, /Questions and Answers/);
  assert.match(html, /What is the Wizstar AI Video Agent\?/);
  assert.match(html, /application\/ld\+json/);
});

test("covers the verified keyword cluster through useful page modules", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /AI Video Agent Workflows/);
  assert.match(html, /end-to-end AI video generator/i);
  assert.match(html, /AI agent for video creation/);
  assert.match(html, /script-to-video AI agent/i);
  assert.match(html, /Multiple AI Models/);
  assert.match(html, /Wizstar AI Video Agent/);
  assert.match(html, /type="file"/);
  assert.match(html, /multiple=""/);
  assert.match(html, /<textarea[^>]+aria-label="Video prompt"/);
});

test("serves the landing page at its production SEO path", async () => {
  const response = await render("/official/ai-video-agent");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Questions and Answers/);
});

test("redirects the legacy Seedance path to the AI Video Agent canonical path", async () => {
  const response = await render("/ai-model/seedance-2-5");
  assert.ok([301, 302, 307, 308].includes(response.status));
  assert.equal(response.headers.get("location"), "/official/ai-video-agent");
});

test("keeps product claims inside the verified fact boundary", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /connect planning, scene creation, voice and sound direction, editing, and revisions/i);
  assert.match(html, /end-to-end creative workspace/i);
  assert.match(html, /Availability and credit usage depend on your current Wizstar account and plan/i);
  assert.doesNotMatch(html, /free Seedance 2\.5 AI Video Generator/i);
  assert.match(html, /id="reference-to-video"/);
  assert.match(html, /id="keyframe-to-video"/);
  assert.match(html, /id="text-to-video"/);
  assert.match(html, /id="workflow-automation"/);
});

test("routes calls to action to their intended Wizstar destinations", async () => {
  const response = await render();
  const html = await response.text();
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((match) => match[1]);
  assert.ok(hrefs.length > 0, "expected rendered anchors");
  assert.equal(hrefs.filter((href) => href === "https://wizstar.com/billing").length, 1);
  assert.ok(hrefs.every((href) => ["https://wizstar.com/home", "https://wizstar.com/billing"].includes(href)), `unexpected link targets: ${hrefs.join(", ")}`);
});
