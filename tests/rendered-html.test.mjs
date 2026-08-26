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

test("server-renders the complete Seedance 2.5 landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Seedance 2\.5 AI Video Generator/);
  assert.match(html, /<h1>Seedance 2\.5 AI Video Generator<\/h1>/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /rel="canonical" href="https:\/\/wizstar\.com\/ai-model\/seedance-2-5"/);
  assert.match(html, /Seedance 2\.5 Questions and Answers/);
  assert.match(html, /Can I use multiple references for Seedance 2\.5 image to video\?/);
  assert.match(html, /application\/ld\+json/);
});

test("covers the verified keyword cluster through useful page modules", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Seedance 2\.5 AI Video Generator/);
  assert.match(html, /Create Videos Up to 30 Seconds/);
  assert.match(html, /Image to Video with Multiple References/);
  assert.match(html, /Keyframe to Video with First and Last Frames/);
  assert.match(html, /Reference to Video/);
  assert.match(html, /Seedance 2\.5 Text to Video/);
  assert.match(html, /type="file"/);
  assert.match(html, /multiple=""/);
  assert.match(html, /<textarea[^>]+aria-label="Video prompt"/);
});

test("serves the landing page at its production SEO path", async () => {
  const response = await render("/ai-model/seedance-2-5");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<h1>Seedance 2\.5 AI Video Generator<\/h1>/);
});

test("keeps product claims inside the verified fact boundary", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /up to 50 image, video, and audio references/i);
  assert.match(html, /4, 10, 15, 20, 25, or 30 seconds/i);
  assert.match(html, /first frame as the required visual starting point/i);
  assert.doesNotMatch(html, /free Seedance 2\.5 AI Video Generator/i);
  assert.doesNotMatch(html, /native audio generation[^<]{0,30}(included|available|supported)/i);
  assert.doesNotMatch(html, /4K generation/i);
});
