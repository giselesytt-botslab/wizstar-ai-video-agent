"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

const referenceUrl = "https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5";
const keyframeUrl = "https://wizstar.com/tools/ai_video_generator?tab=keyframe2video&model=seedance2.5";
const textUrl = "https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5";

const Arrow = () => <span aria-hidden="true">→</span>;

const modeDetails = {
  Reference: { title: "Build a reference pack", hint: "Image · Video · Audio · up to 50", settings: ["10s", "720P", "9:16", "1 Output"] },
  Keyframe: { title: "Define the first and final moment", hint: "First frame required · End frame optional", settings: ["15s", "720P", "Frame ratio", "1 Output"] },
  Text: { title: "Direct the scene in words", hint: "Subject · camera · motion · pacing", settings: ["15s", "720P", "9:16", "1 Output"] },
} as const;

const workShowcases = [
  { eyebrow: "Reference to Video", title: "Reference-Led Narrative", description: "Combine image, video, and audio references to direct the look, motion, and sound of a scene.", tags: ["Up to 50 assets", "16:9"], tone: "cyan" },
  { eyebrow: "E-commerce Agent", title: "Product Launch Film", description: "Use product images, a product URL, and selling points inside Wizstar’s E-commerce Agent workflow.", tags: ["Product assets", "9:16"], tone: "violet" },
  { eyebrow: "Keyframe to Video", title: "Frame-to-Frame Motion", description: "Start with a required first frame and an optional end frame to direct the transition.", tags: ["First + end frame", "720P"], tone: "blue" },
  { eyebrow: "Text to Video", title: "Text-Directed Scene", description: "Describe the subject, camera movement, pacing, and action from a written prompt.", tags: ["Prompt-led", "16:9"], tone: "magenta" },
  { eyebrow: "Social Creative", title: "Vertical Campaign", description: "Create vertical 9:16 concepts for short-form placements with the available duration controls.", tags: ["9:16", "4–30 sec"], tone: "aqua" },
  { eyebrow: "Longer Generation", title: "30-Second Brand Story", description: "Use up to 30 seconds to structure a clear setup, action, and closing moment.", tags: ["Up to 30 sec", "720P"], tone: "indigo" },
] as const;

const footerColumns = [
  { title: "Product", links: [["AI Avatar", "https://wizstar.com/official/ai-avatar"], ["AI Video Generator", "https://wizstar.com/official/video-generator"], ["Viral Video Recreation", "https://wizstar.com/tools/viral_video_recreation"], ["AI Product Video", "https://wizstar.com/tools/ai_product_video"], ["AI Image Generator", "https://wizstar.com/image?mode=general"], ["AI Video Translation", "https://wizstar.com/tools/ai_video_translation"], ["AI Avatar Turbo", "https://wizstar.com/tools/ai_avatar_turbo"], ["E-commerce Agent", "https://wizstar.com/agent?mode=ecommerce"], ["Creative Agent", "https://wizstar.com/agent?mode=creative"], ["Novel to Script", "https://wizstar.com/drama?mode=conversion"], ["Script Translation", "https://wizstar.com/drama?mode=translation"]] },
  { title: "Solution", links: [["Sales", "https://wizstar.com/official/enterprise/sales"], ["Marketing", "https://wizstar.com/official/enterprise/marketing"], ["Social Ads", "https://wizstar.com/official/enterprise/social-ads"], ["Learning & Development", "https://wizstar.com/official/enterprise/learning-development"], ["Localization", "https://wizstar.com/official/enterprise/localization"], ["Offline Services", "https://wizstar.com/official/enterprise/off-market-services"], ["E-Commerce", "https://wizstar.com/official/enterprise/e-commerce"], ["Real Estate", "https://wizstar.com/official/enterprise/real-estate-property"], ["Financial Services", "https://wizstar.com/official/enterprise/financial-services"], ["Local Services", "https://wizstar.com/official/enterprise/local-services"]] },
  { title: "Company", links: [["For Enterprise", "https://wizstar.com/official/enterprise"], ["Contact Sales", "https://calendly.com/wizstar-solutions/15"], ["API", "https://wizstar.com/official/api"], ["Pricing", "https://wizstar.com/official/pricing"], ["Terms", "https://wizstar.com/agreement?key=service_agreement"], ["Privacy", "https://wizstar.com/agreement?key=privacy_agreement"]] },
  { title: "Resources", links: [["Blog", "https://wizstar.com/blog"], ["Content Partner Program", "https://wizstar.ai/activitypages/cpp"]] },
] as const;

export default function Home() {
  const [mode, setMode] = useState<keyof typeof modeDetails>("Reference");
  const heroRef = useRef<HTMLDivElement>(null);
  const trailLastFrame = useRef(0);
  const trailIndex = useRef(0);
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

  const spawnCtaFrame = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    if (now - trailLastFrame.current < 95) return;
    trailLastFrame.current = now;

    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const frame = document.createElement("span");
    const frameAssets = ["/assets/wizstar-seedance-generator.png", "/assets/wizstar-home-agents.png"];
    const index = trailIndex.current++;
    frame.className = "cta-trail-frame";
    frame.setAttribute("aria-hidden", "true");
    frame.style.left = `${event.clientX - bounds.left}px`;
    frame.style.top = `${event.clientY - bounds.top}px`;
    frame.style.backgroundImage = `url(${frameAssets[index % frameAssets.length]})`;
    frame.style.setProperty("--trail-rotate", `${[-7, 5, -3, 8][index % 4]}deg`);
    target.appendChild(frame);
    window.setTimeout(() => frame.remove(), 1050);
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
          <h1>Seedance 2.5 — AI Video Generator</h1>
          <p>Create up to 30 seconds of directed video from text, keyframes, or as many as 50 image, video, and audio references—inside Wizstar.</p>
          <div className="hero-specs" aria-label="Seedance 2.5 highlights">
            <span>Up to 30s</span>
            <span>50 references</span>
            <span>Multimodal direction</span>
          </div>
        </div>

        <div className="hero-workspace page-width" ref={heroRef} onPointerMove={moveHeroLight} data-reveal>
          <section className="creator" aria-label="Seedance 2.5 generator preview">
            <div className="mode-tabs" aria-label="Generation modes">
              {(Object.keys(modeDetails) as Array<keyof typeof modeDetails>).map((item) => <button className={mode === item ? "active" : ""} type="button" key={item} onClick={() => setMode(item)}>{item}</button>)}
            </div>
            <div className="model-select"><img className="model-mark" src="/assets/seedance-model-mark.svg" alt="" /><div><small>Model</small><strong>Seedance 2.5</strong></div><span className="select-chevron" aria-hidden="true" /></div>
            <div className="upload-box" key={mode}><b>＋</b><span>{currentMode.title}</span><small>{currentMode.hint}</small></div>
            <div className="prompt-box"><span>Direct the subject, camera, action, and pacing...</span><small>0 / 2000</small></div>
            <div className="settings">{currentMode.settings.map((setting) => <span key={setting}>{setting}</span>)}</div>
            <a className="generate" href={referenceUrl}>Create a video on Wizstar</a>
          </section>

          <div className="hero-media" aria-label="Seedance 2.5 example video placeholder">
            <div className="media-label"><span>Featured Seedance 2.5 work</span><small>Selected launch film will appear here</small></div>
            <button type="button" aria-label="Video preview placeholder">▶</button>
            <div className="media-meta"><span>30 sec</span><span>720P</span><span>16:9</span></div>
          </div>
        </div>
      </section>

      <section className="community page-width" id="showcase">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">Work Showcase</span>
          <h2>See Seedance 2.5 in Action</h2>
          <p>Explore the scenes and production workflows you can build on Wizstar—from product campaigns to reference-led narratives.</p>
          <a href={referenceUrl}>Start creating on Wizstar <Arrow /></a>
        </div>
        <div className="creation-marquee" aria-label="Seedance 2.5 work showcase" data-reveal>
          <div className="creation-track">{[...workShowcases, ...workShowcases].map((item, index) => <article className={`showcase-card tone-${item.tone}`} key={`top-${index}`}><div className="showcase-visual"><span>{item.eyebrow}</span><em aria-hidden="true">▶</em><small>SCENE {String((index % workShowcases.length) + 1).padStart(2,"0")}</small></div><div className="showcase-copy"><h3>{item.title}</h3><p>{item.description}</p><div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
          <div className="creation-track reverse-track">{[...workShowcases.slice().reverse(), ...workShowcases.slice().reverse()].map((item, index) => <article className={`showcase-card tone-${item.tone}`} key={`bottom-${index}`}><div className="showcase-visual"><span>{item.eyebrow}</span><em aria-hidden="true">▶</em><small>SCENE {String((index % workShowcases.length) + 1).padStart(2,"0")}</small></div><div className="showcase-copy"><h3>{item.title}</h3><p>{item.description}</p><div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        </div>
      </section>

      <section className="features page-width" id="features">
        <div className="section-heading centered feature-heading" data-reveal><span className="section-kicker">Seedance 2.5 Core Features</span><h2>More Story. More Source Material. More Control.</h2><p>Seedance 2.5 gives creators a longer timeline, a richer multimodal reference pack, and multiple ways to direct how an idea moves from source material to finished video on Wizstar.</p></div>
        <div className="feature-summary" aria-label="Seedance 2.5 capability overview" data-reveal>
          <article><strong>30s</strong><span>Room for a complete narrative arc</span><small>4, 10, 15, 20, 25, or 30 seconds</small></article>
          <article><strong>50</strong><span>Multimodal references in one brief</span><small>Images, video, and audio</small></article>
          <article><strong>3</strong><span>Ways to begin the scene</span><small>Reference, Keyframe, or Text</small></article>
          <article><strong>1–4</strong><span>Outputs from one direction</span><small>Available in Reference and Text modes</small></article>
        </div>

        <article className="feature-row" data-reveal>
          <div className="feature-media duration-media"><span>00:30</span><div className="scrubber"><i /></div><small>A longer timeline for a complete sequence</small></div>
          <div className="feature-copy"><span className="feature-number">01</span><h3>Give the Story Up to 30 Seconds</h3><p>Choose 4, 10, 15, 20, 25, or 30 seconds so the idea can move from setup to action and finish without being reduced to a single moment.</p><a href={textUrl}>Open Text to Video <Arrow /></a></div>
        </article>
        <article className="feature-row reverse" data-reveal>
          <div className="feature-media reference-media"><div className="reference-card">Image</div><div className="reference-card">Video</div><div className="reference-card">Audio</div><small>One brief, a richer source pack</small></div>
          <div className="feature-copy"><span className="feature-number">02</span><h3>Direct with a Full Reference Pack</h3><p>Bring together as many as 50 image, video, and audio assets, then tell Seedance 2.5 what each source should contribute to the result.</p><a href={referenceUrl}>Open Reference to Video <Arrow /></a></div>
        </article>
        <article className="feature-row" data-reveal>
          <div className="feature-media modes-media"><div><b>Reference</b><b>Keyframe</b><b>Text</b></div><small>Three modes in one video workspace</small></div>
          <div className="feature-copy"><span className="feature-number">03</span><h3>Start from the Material You Already Have</h3><p>Use a complete reference pack, animate between defined key moments, or begin with nothing more than a written scene.</p><a href={keyframeUrl}>Compare the three modes <Arrow /></a></div>
        </article>
        <article className="feature-row reverse" data-reveal>
          <div className="feature-media output-media"><div><b>4–30 sec</b><b>480P / 720P</b><b>9:16 / 16:9</b><b>1–4 outputs</b></div><small>Available controls in Reference and Text modes</small></div>
          <div className="feature-copy"><span className="feature-number">04</span><h3>Shape the Delivery for Each Channel</h3><p>In Reference and Text modes, choose the duration, resolution, aspect ratio, and output count that fit the placement you are creating for.</p><a href={referenceUrl}>Set up an output <Arrow /></a></div>
        </article>
        <article className="feature-row" data-reveal>
          <div className="feature-media agent-media"><div><b>E-commerce Agent</b><span>Product URL · images · selling points</span></div><div><b>Creative Agent</b><span>Text · images · video</span></div><small>Seedance 2.5 is selectable in both Agent workflows</small></div>
          <div className="feature-copy"><span className="feature-number">05</span><h3>Take Seedance Beyond the Generator</h3><p>Select Seedance 2.5 inside Wizstar’s E-commerce Agent for product-led briefs or Creative Agent for broader creative production.</p><a href="https://wizstar.com/home">Explore Wizstar Agents <Arrow /></a></div>
        </article>
      </section>

      <section className="how page-width" id="how-it-works">
        <div className="section-heading centered" data-reveal><span className="section-kicker">From input to output</span><h2>Three Moves from Source Material to Video</h2><p>Choose a starting point, give every input a clear job, and tune the delivery for where the video will live.</p></div>
        <div className="steps" data-reveal>
          <article><div className="step-image product-shot"><img src="/assets/wizstar-seedance-generator.png" alt="Seedance 2.5 model selected in Wizstar AI Video Generator" /></div><span>Move 01</span><h3>Pick the Right Starting Point</h3><p>Choose Reference, Keyframe, or Text based on the material already available for the brief.</p></article>
          <article><div className="step-image step-reference"><span>@Image 1</span><span>@Video 1</span><span>@Audio 1</span></div><span>Move 02</span><h3>Give Every Input a Job</h3><p>Upload what the mode needs, then direct the subject, movement, camera, and pacing in the prompt.</p></article>
          <article><div className="step-image step-settings"><b>10 sec</b><b>720P</b><b>9:16</b><b>1 Output</b></div><span>Move 03</span><h3>Set the Delivery</h3><p>Confirm the available duration, resolution, ratio, and output count before sending the brief to Seedance 2.5.</p></article>
        </div>
      </section>

      <section className="use-cases page-width" id="workflows">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Choose the workflow</span><h2>One Model, Four Ways to Move an Idea Forward</h2><p>Work directly in AI Video Generator or bring Seedance 2.5 into a wider Wizstar production flow.</p></div>
        <div className="use-grid" data-reveal>
          <article><span>Reference mode</span><h3>Build from a Reference Pack</h3><p>Combine up to 50 image, video, and audio sources in one directed brief.</p><a href={referenceUrl}>Enter Reference mode <Arrow /></a></article>
          <article><span>Keyframe mode</span><h3>Animate Between Key Moments</h3><p>Anchor the beginning with a required first frame and add an optional ending frame.</p><a href={keyframeUrl}>Enter Keyframe mode <Arrow /></a></article>
          <article><span>Text mode</span><h3>Direct a Scene from Words</h3><p>Write the subject, action, camera, and pacing, then choose the available output controls.</p><a href={textUrl}>Enter Text mode <Arrow /></a></article>
          <article><span>Wizstar Agents</span><h3>Turn Inputs into Campaign Work</h3><p>Use Seedance 2.5 with product inputs in E-commerce Agent or broader material in Creative Agent.</p><a href="https://wizstar.com/home">See the Agent workflows <Arrow /></a></article>
        </div>
      </section>

      <section className="tips page-width">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Write like a director</span><h2>Give Seedance 2.5 a Brief It Can Follow</h2></div>
        <div className="tip-grid"><article><span>01</span><h3>Plan a sequence, not a still</h3><p>Write the setup, action, transition, and ending as separate beats so the full duration has a clear arc.</p></article><article><span>02</span><h3>Tell each reference what to control</h3><p>Mention uploaded assets directly and connect each one to a subject, look, motion cue, or sound direction.</p></article><article><span>03</span><h3>Choose the mode before the brief</h3><p>Use references for a source-rich brief, keyframes for defined endpoints, and text when the scene begins in words.</p></article><article><span>04</span><h3>Design for the destination</h3><p>Decide whether the result needs 9:16 or 16:9, then select the available duration and output settings around that placement.</p></article></div>
      </section>

      <section className="insights page-width" id="insights">
        <div className="section-heading" data-reveal><span className="section-kicker">Wizstar field notes</span><h2>Learn the Craft Behind Better AI Video</h2><p>Practical guides for choosing a mode, directing a longer sequence, and connecting Seedance 2.5 to real creative work.</p><a href="https://wizstar.com/blog">Visit the Wizstar blog <Arrow /></a></div>
        <div className="article-grid" data-reveal>
          <article><div className="article-cover"><span>DIRECTING GUIDE</span></div><small>Guide in progress</small><h3>How to Structure a 30-Second AI Video Brief</h3><p>A beat-by-beat framework for turning one idea into a complete moving sequence.</p></article>
          <article><div className="article-cover"><span>MODE GUIDE</span></div><small>Guide in progress</small><h3>Reference, Keyframe, or Text: Where Should You Start?</h3><p>A practical way to match the material in hand with the right creation mode.</p></article>
          <article><div className="article-cover"><span>WORKFLOW GUIDE</span></div><small>Guide in progress</small><h3>From Product Inputs to a Video Concept in Wizstar</h3><p>How product URLs, images, selling points, and Seedance 2.5 meet inside Agent workflows.</p></article>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="page-width"><div className="section-heading centered" data-reveal><span className="section-kicker">Creator voices</span><h2>Real Feedback, Clearly Sourced</h2><p>Verified feedback from Wizstar creators will appear here with names and sources attached—never invented, never anonymous.</p></div></div>
        <div className="quote-track" aria-label="Testimonial placeholders" data-reveal>
          <article><span>“</span><p>Verified feedback about reference-led creation is reserved for this card.</p><small>Creator attribution pending</small></article>
          <article><span>“</span><p>Verified feedback about longer video direction is reserved for this card.</p><small>Creator attribution pending</small></article>
          <article><span>“</span><p>Verified feedback about keyframe and text workflows is reserved for this card.</p><small>Creator attribution pending</small></article>
          <article><span>“</span><p>Verified feedback about Wizstar Agent production is reserved for this card.</p><small>Creator attribution pending</small></article>
        </div>
      </section>

      <section className="faq page-width" id="faq">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Seedance 2.5 on Wizstar</span><h2>What to Know Before You Create</h2></div>
        <div className="faq-list"><details open><summary>What are the three ways to begin a Seedance 2.5 video?</summary><p>Wizstar’s AI Video Generator offers Reference to Video, Keyframe to Video, and Text to Video, so you can begin with source assets, defined frames, or a written scene.</p></details><details><summary>What belongs in a Reference mode source pack?</summary><p>You can combine image, video, and audio references and include as many as 50 multimodal assets in the inspected Wizstar interface.</p></details><details><summary>Which output controls can I set?</summary><p>Reference and Text modes offer 4–30 second durations, 480P or 720P, 9:16 or 16:9, and 1–4 outputs. Keyframe mode follows the uploaded frame dimensions rather than offering a separate ratio picker.</p></details><details><summary>Can I call Seedance 2.5 through a dedicated API?</summary><p>The currently inspected API area does not verify a model-specific Seedance 2.5 endpoint, so this page sends creators to Wizstar’s working creation interfaces.</p></details><details><summary>How long can one generation run?</summary><p>Reference and Text modes currently offer 4, 10, 15, 20, 25, and 30-second duration choices.</p></details><details><summary>What does Keyframe mode require?</summary><p>A first frame is required. An end frame is optional, and the uploaded frame dimensions determine the result rather than a separate ratio setting.</p></details><details><summary>Where else can I select Seedance 2.5 in Wizstar?</summary><p>The model is also available in E-commerce Agent and Creative Agent workflows for product-led and broader creative briefs.</p></details><details><summary>Which mode should I choose for my brief?</summary><p>Choose Reference when the result should follow source material, Keyframe when the beginning or ending is defined, and Text when the scene starts from a written direction.</p></details></div>
      </section>

      <section className="final-cta" onPointerMove={spawnCtaFrame}><div className="final-cta-content page-width" data-reveal><h2>Bring Your Next Video Brief to Wizstar</h2><p>Begin with a reference pack, a pair of keyframes, or a scene written from scratch.</p><a href={referenceUrl}>Open Seedance 2.5 <Arrow /></a></div></section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="brand" href="https://wizstar.com/" aria-label="Wizstar home"><img src="/assets/wizstar-logo.png" alt="Wizstar" /></a>
            <p>The AI creation platform that turns ideas into polished visuals in minutes.</p>
            <div className="socials" aria-label="Wizstar social channels">
              <a href="https://x.com/WizstarAI" aria-label="X"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" /></svg></a>
              <a href="https://www.youtube.com/@Wizstar_official" aria-label="YouTube"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21.58 7.19a2.73 2.73 0 0 0-1.92-1.93C17.97 4.8 12 4.8 12 4.8s-5.97 0-7.66.46a2.73 2.73 0 0 0-1.92 1.93A28.43 28.43 0 0 0 2 12a28.43 28.43 0 0 0 .42 4.81 2.73 2.73 0 0 0 1.92 1.93c1.69.46 7.66.46 7.66.46s5.97 0 7.66-.46a2.73 2.73 0 0 0 1.92-1.93A28.43 28.43 0 0 0 22 12a28.43 28.43 0 0 0-.42-4.81ZM10 15.2V8.8l5.2 3.2L10 15.2Z" /></svg></a>
              <a href="https://www.tiktok.com/@wizstar_ai" aria-label="TikTok"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16.72 3c.34 2.02 1.51 3.22 3.47 3.35v3.02a7.3 7.3 0 0 1-3.42-1.02v6.39c0 3.24-1.97 5.26-5.14 5.26A4.85 4.85 0 0 1 6.7 15.2a4.87 4.87 0 0 1 5.66-4.77v3.09a2.06 2.06 0 0 0-2.67 1.97 2.02 2.02 0 0 0 2.07 1.98c1.17 0 1.94-.7 1.94-2.18V3h3.02Z" /></svg></a>
              <a href="https://www.instagram.com/wizstarai/" aria-label="Instagram"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.95 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg></a>
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerColumns.map((column) => <div key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>)}
          </nav>
        </div>
      </footer>
    </main>
  );
}
