"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

const referenceUrl = "https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5";
const keyframeUrl = "https://wizstar.com/tools/ai_video_generator?tab=keyframe2video&model=seedance2.5";
const textUrl = "https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5";

const Arrow = () => <span aria-hidden="true">→</span>;

const modeDetails = {
  Reference: { title: "Add multimodal references", hint: "Image · Video · Audio · up to 50", settings: ["10s", "720P", "9:16", "1 Output"] },
  Keyframe: { title: "Add first and end frames", hint: "First frame required · End frame optional", settings: ["15s", "720P", "Frame ratio", "1 Output"] },
  Text: { title: "Start from a written scene", hint: "Describe subject · camera · motion · pacing", settings: ["15s", "720P", "9:16", "1 Output"] },
} as const;

const creationLabels = ["Multimodal narrative", "Character continuity", "Product storytelling", "Long-form scene", "Camera direction", "Reference-led motion"];

export default function Home() {
  const [mode, setMode] = useState<keyof typeof modeDetails>("Reference");
  const heroRef = useRef<HTMLDivElement>(null);
  const currentMode = modeDetails[mode];

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.14, rootMargin: "0px 0px -5%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const moveHeroLight = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="https://wizstar.com/" aria-label="Wizstar home">
          <img src="/assets/wizstar-logo.png" alt="Wizstar" />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="https://wizstar.com/home">Products <small className="nav-chevron" aria-hidden="true" /></a>
          <a href="https://wizstar.com/official/enterprise">Enterprise <small className="nav-chevron" aria-hidden="true" /></a>
          <a href="https://wizstar.com/blog">Resources <small className="nav-chevron" aria-hidden="true" /></a>
          <a href="https://wizstar.com/official/pricing">Pricing</a>
          <a href="https://wizstar.com/official/api">API</a>
        </nav>
        <a className="sign-in" href="https://wizstar.com/?login=1">Sign in</a>
      </header>

      <section className="hero">
        <div className="hero-heading page-width" data-reveal>
          <h1>Seedance 2.5 — AI Video Generation Model</h1>
          <p>Create coherent videos up to 30 seconds with text, keyframes, and as many as 50 image, video, or audio references on Wizstar.</p>
        </div>

        <div className="hero-workspace page-width" ref={heroRef} onPointerMove={moveHeroLight} data-reveal>
          <section className="creator" aria-label="Seedance 2.5 generator preview">
            <div className="mode-tabs" aria-label="Generation modes">
              {(Object.keys(modeDetails) as Array<keyof typeof modeDetails>).map((item) => <button className={mode === item ? "active" : ""} type="button" key={item} onClick={() => setMode(item)}>{item}</button>)}
            </div>
            <div className="model-select"><img className="model-mark" src="/assets/seedance-model-mark.svg" alt="" /><div><small>Model</small><strong>Seedance 2.5</strong></div><span className="select-chevron" aria-hidden="true" /></div>
            <div className="upload-box" key={mode}><b>＋</b><span>{currentMode.title}</span><small>{currentMode.hint}</small></div>
            <div className="prompt-box"><span>Describe the video you want to generate...</span><small>0 / 2000</small></div>
            <div className="settings">{currentMode.settings.map((setting) => <span key={setting}>{setting}</span>)}</div>
            <a className="generate" href={referenceUrl}>Generate with Seedance 2.5</a>
          </section>

          <div className="hero-media" aria-label="Seedance 2.5 example video placeholder">
            <div className="media-label"><span>Seedance 2.5 output</span><small>Approved launch video goes here</small></div>
            <button type="button" aria-label="Video preview placeholder">▶</button>
            <div className="media-meta"><span>30 sec</span><span>720P</span><span>16:9</span></div>
          </div>
        </div>
      </section>

      <section className="community page-width" id="creations">
        <div className="section-heading" data-reveal>
          <h2>Community Creations</h2>
          <p>See how creators use Seedance 2.5 for longer narratives, reference-led scenes, and commercial video production.</p>
          <a href={referenceUrl}>Create with Seedance 2.5 <Arrow /></a>
        </div>
        <div className="creation-marquee" data-reveal>
          <div className="creation-track">{[...creationLabels, ...creationLabels].map((label, index) => <article key={`top-${index}`}><span>{String((index % creationLabels.length) + 1).padStart(2,"0")}</span><b>{label}</b><em>▶</em></article>)}</div>
          <div className="creation-track reverse-track">{[...creationLabels.slice().reverse(), ...creationLabels.slice().reverse()].map((label, index) => <article key={`bottom-${index}`}><span>{String((index % creationLabels.length) + 1).padStart(2,"0")}</span><b>{label}</b><em>▶</em></article>)}</div>
        </div>
      </section>

      <section className="features page-width" id="features">
        <div className="section-heading centered" data-reveal><h2>Key Features of Seedance 2.5 on Wizstar</h2><p>Longer generation, rich references, and three practical ways to start.</p></div>

        <article className="feature-row" data-reveal>
          <div className="feature-media duration-media"><span>00:30</span><div className="scrubber"><i /></div><small>Replace with approved feature video</small></div>
          <div className="feature-copy"><span className="feature-number">01</span><h3>Up to 30-Second Generation</h3><p>Choose 4, 10, 15, 20, 25, or 30 seconds and give a scene room to develop in one generation.</p><a href={textUrl}>Try it now <Arrow /></a></div>
        </article>
        <article className="feature-row reverse" data-reveal>
          <div className="feature-media reference-media"><div className="reference-card">Image</div><div className="reference-card">Video</div><div className="reference-card">Audio</div><small>Replace with reference-to-result video</small></div>
          <div className="feature-copy"><span className="feature-number">02</span><h3>Up to 50 Multimodal References</h3><p>Use image, video, and audio material together, then mention uploaded assets in the prompt to direct identity, motion, look, and sound.</p><a href={referenceUrl}>Try it now <Arrow /></a></div>
        </article>
        <article className="feature-row" data-reveal>
          <div className="feature-media modes-media"><div><b>Reference</b><b>Keyframe</b><b>Text</b></div><small>Three modes in one video workspace</small></div>
          <div className="feature-copy"><span className="feature-number">03</span><h3>Three Ways to Start</h3><p>Build from a complete reference pack, direct motion between keyframes, or create from text alone.</p><a href={keyframeUrl}>Try it now <Arrow /></a></div>
        </article>
        <article className="feature-row reverse pending-row" data-reveal>
          <div className="feature-media pending-media"><span>04</span><small>Approved product demonstration goes here</small></div>
          <div className="feature-copy"><span className="feature-number">04 · Product fact pending</span><h3>Verified Capability Slot</h3><p>This section is reserved because the OpenArt reference contains a fourth feature chapter. Final copy and media will be added only after the matching Wizstar capability is verified.</p><a href={referenceUrl}>Open Seedance 2.5 <Arrow /></a></div>
        </article>
        <article className="feature-row pending-row" data-reveal>
          <div className="feature-media pending-media"><span>05</span><small>Approved product demonstration goes here</small></div>
          <div className="feature-copy"><span className="feature-number">05 · Product fact pending</span><h3>Verified Capability Slot</h3><p>This fifth feature chapter stays in the framework. It will not receive a marketing claim until product confirms the fact and supplies appropriate evidence.</p><a href={referenceUrl}>Open Seedance 2.5 <Arrow /></a></div>
        </article>
      </section>

      <section className="how page-width" id="how-it-works">
        <div className="section-heading centered" data-reveal><h2>How to Use Seedance 2.5 on Wizstar</h2><p>Three steps from source material to your first video.</p></div>
        <div className="steps" data-reveal>
          <article><div className="step-image product-shot"><img src="/assets/wizstar-seedance-generator.png" alt="Seedance 2.5 model selected in Wizstar AI Video Generator" /></div><span>Step 01</span><h3>Choose Your Mode</h3><p>Select Reference to Video, Keyframe to Video, or Text to Video.</p></article>
          <article><div className="step-image step-reference"><span>@Image 1</span><span>@Video 1</span><span>@Audio 1</span></div><span>Step 02</span><h3>Add Direction</h3><p>Upload source material where needed and describe the scene, movement, camera, and pacing.</p></article>
          <article><div className="step-image step-settings"><b>10 sec</b><b>720P</b><b>9:16</b><b>1 Output</b></div><span>Step 03</span><h3>Set and Generate</h3><p>Confirm the available duration, resolution, ratio, and output settings, then generate on Wizstar.</p></article>
        </div>
      </section>

      <section className="use-cases page-width" id="workflows">
        <div className="section-heading centered" data-reveal><h2>Built for the Full Scene, Not Just the Shot</h2><p>Use Seedance 2.5 directly, or inside Wizstar’s broader Agent workflows.</p></div>
        <div className="use-grid" data-reveal>
          <article><span>Direct creation</span><h3>Reference to Video</h3><p>Use up to 50 image, video, and audio references in one brief.</p><a href={referenceUrl}>Open workflow <Arrow /></a></article>
          <article><span>Direct creation</span><h3>Keyframe to Video</h3><p>Set the first frame, add an optional end frame, and generate the motion between them.</p><a href={keyframeUrl}>Open workflow <Arrow /></a></article>
          <article><span>Direct creation</span><h3>Text to Video</h3><p>Start with a written scene and choose the available output controls.</p><a href={textUrl}>Open workflow <Arrow /></a></article>
          <article><span>Wizstar Agent</span><h3>E-commerce & Creative</h3><p>Use Seedance 2.5 in product-led and general creative Agent workflows.</p><a href="https://wizstar.com/home">Explore Agents <Arrow /></a></article>
        </div>
      </section>

      <section className="tips page-width">
        <div className="section-heading centered" data-reveal><h2>Tips for Better Results</h2></div>
        <div className="tip-grid"><article><span>01</span><h3>Write in clear beats</h3><p>Separate setup, action, transition, and ending so the longer sequence has an intentional structure.</p></article><article><span>02</span><h3>Name each reference</h3><p>Use reference mentions in the prompt to say what each uploaded asset should control.</p></article><article><span>03</span><h3>Match the mode to the brief</h3><p>Choose keyframes for defined endpoints, references for continuity, and text for open exploration.</p></article><article><span>04</span><h3>Guidance slot</h3><p>Reserved for a fourth verified best-practice tip from the Wizstar product team.</p></article></div>
      </section>

      <section className="insights page-width" id="insights">
        <div className="section-heading" data-reveal><h2>Get Insights from Experts Blog</h2><p>Reserved for Seedance 2.5 guides, comparisons, and practical use-case articles from Wizstar.</p><a href="https://wizstar.com/blog">Read more <Arrow /></a></div>
        <div className="article-grid" data-reveal>
          <article><div className="article-cover"><span>ARTICLE 01</span></div><small>Publication date</small><h3>Seedance 2.5 article title</h3><p>Editorial slot for a verified Wizstar guide or product story.</p></article>
          <article><div className="article-cover"><span>ARTICLE 02</span></div><small>Publication date</small><h3>Seedance 2.5 article title</h3><p>Editorial slot for a verified comparison or prompting guide.</p></article>
          <article><div className="article-cover"><span>ARTICLE 03</span></div><small>Publication date</small><h3>Seedance 2.5 article title</h3><p>Editorial slot for a verified workflow or use-case article.</p></article>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="page-width"><div className="section-heading centered" data-reveal><h2>Loved by Creators</h2><p>This chapter is retained for approved Wizstar customer feedback.</p></div></div>
        <div className="quote-track" aria-label="Testimonial placeholders" data-reveal>
          <article><span>“</span><p>Approved creator testimonial will appear here.</p><small>Creator name · Source</small></article>
          <article><span>“</span><p>Approved creator testimonial will appear here.</p><small>Creator name · Source</small></article>
          <article><span>“</span><p>Approved creator testimonial will appear here.</p><small>Creator name · Source</small></article>
          <article><span>“</span><p>Approved creator testimonial will appear here.</p><small>Creator name · Source</small></article>
        </div>
      </section>

      <section className="faq page-width" id="faq">
        <div className="section-heading centered" data-reveal><h2>Frequently Asked Questions</h2></div>
        <div className="faq-list"><details open><summary>Which Seedance 2.5 modes are available on Wizstar?</summary><p>Reference to Video, Keyframe to Video, and Text to Video are available in AI Video Generator. Seedance 2.5 is also selectable in E-commerce and Creative Agent workflows.</p></details><details><summary>What can I upload in Reference to Video?</summary><p>The inspected Wizstar interface supports image, video, and audio references, up to 50 multimodal assets.</p></details><details><summary>What settings are available?</summary><p>Reference and Text modes offer 4–30 second durations, 480P or 720P, 9:16 or 16:9, and 1–4 outputs. Keyframe mode uses the uploaded frame dimensions rather than a separate ratio picker.</p></details><details><summary>Is there a dedicated Seedance 2.5 API?</summary><p>The currently inspected API area does not verify a model-specific Seedance 2.5 endpoint, so this page links to Wizstar’s working creation tools.</p></details><details><summary>Product FAQ slot 05</summary><p>Reserved for a verified Wizstar product question and answer.</p></details><details><summary>Product FAQ slot 06</summary><p>Reserved for a verified Wizstar product question and answer.</p></details><details><summary>Product FAQ slot 07</summary><p>Reserved for a verified Wizstar product question and answer.</p></details><details><summary>Product FAQ slot 08</summary><p>Reserved for a verified Wizstar product question and answer.</p></details></div>
      </section>

      <section className="final-cta"><div className="page-width" data-reveal><h2>Create with Seedance 2.5 on Wizstar</h2><p>Start with references, keyframes, or a written idea.</p><a href={referenceUrl}>Get Started for Free <Arrow /></a></div></section>

      <footer className="site-footer page-width"><a className="brand" href="https://wizstar.com/"><img src="/assets/wizstar-logo.png" alt="Wizstar" /></a><p>The AI creation platform for turning ideas into video.</p><div><a href="https://wizstar.com/official/pricing">Pricing</a><a href="https://wizstar.com/official/api">API</a><a href="https://wizstar.com/blog">Blog</a></div></footer>
    </main>
  );
}
