import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seedance 2.5 AI Video Generator | Wizstar",
  description: "Create 4–30 second AI videos with multimodal references, keyframes, or text using Seedance 2.5 on Wizstar.",
};

const createUrl = "https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5";
const keyframeUrl = "https://wizstar.com/tools/ai_video_generator?tab=keyframe2video&model=seedance2.5";
const textUrl = "https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5";

const workflows = [
  { number: "01", title: "Reference to Video", copy: "Direct identity, motion, style, and sound with image, video, and audio references.", href: createUrl, tag: "Up to 50 references" },
  { number: "02", title: "Keyframe to Video", copy: "Set the first frame, add an optional end frame, and let Seedance 2.5 build the motion between them.", href: keyframeUrl, tag: "First + end frame" },
  { number: "03", title: "Text to Video", copy: "Describe the scene, camera, pace, and action in a prompt and generate from text alone.", href: textUrl, tag: "Up to 2,000 characters" },
  { number: "04", title: "E-commerce Agent", copy: "Turn a product URL, product images, and selling points into a complete commerce video workflow.", href: "https://wizstar.com/home", tag: "Agent workflow" },
  { number: "05", title: "Creative Agent", copy: "Start with text, images, or video and guide the output by creative style and content type.", href: "https://wizstar.com/home", tag: "Agent workflow" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="https://wizstar.com/home" aria-label="Wizstar home"><span className="brand-mark" aria-hidden="true">W</span><span>Wizstar</span></a>
        <nav className="main-nav" aria-label="Primary navigation"><a href="#features">Features</a><a href="#workflows">Workflows</a><a href="#how-it-works">How it works</a><a href="#faq">FAQ</a></nav>
        <div className="header-actions"><a className="text-link" href="https://wizstar.com/official/pricing">Pricing</a><a className="primary-button small" href={createUrl}>Try for free</a></div>
      </header>

      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span>New</span> Seedance 2.5 on Wizstar</p>
          <h1>Build the whole scene,<br />not just the shot.</h1>
          <p className="hero-description">Create coherent AI videos up to 30 seconds with text, keyframes, and as many as 50 image, video, or audio references.</p>
          <div className="hero-actions"><a className="primary-button" href={createUrl}>Generate with Seedance 2.5</a><a className="secondary-button" href="#creations">Watch creations</a></div>
          <div className="hero-facts" aria-label="Seedance 2.5 key facts"><div><strong>30s</strong><span>long-form generation</span></div><div><strong>50</strong><span>multimodal references</span></div><div><strong>720P</strong><span>on Wizstar</span></div></div>
        </div>

        <div className="generator-card" aria-label="Seedance 2.5 generator preview">
          <div className="generator-topline"><div><span className="status-dot" />Seedance 2.5</div><span className="premium-pill">Premium</span></div>
          <div className="mode-tabs" role="tablist" aria-label="Video generation modes"><button className="active" type="button">Reference</button><button type="button">Keyframe</button><button type="button">Text</button></div>
          <div className="upload-panel"><span className="upload-plus">+</span><div><strong>Add multimodal references</strong><small>Images, video, or audio · up to 50 files</small></div></div>
          <div className="prompt-field"><span>Describe the scene, camera, movement, pacing, and sound…</span><small>0 / 2000</small></div>
          <div className="settings-row"><span>10 sec</span><span>720P</span><span>9:16</span><span>1 video</span></div>
          <a className="generate-button" href={createUrl}>Generate video <span>100 credits</span></a>
        </div>
      </section>

      <section className="creations page-shell" id="creations">
        <div className="section-heading"><div><p className="section-kicker">Created with Seedance 2.5</p><h2>Stories that hold together</h2></div><p>Wizstar examples will live here. Each case will pair the final video with its references, prompt, and settings.</p></div>
        <div className="creation-grid"><article className="creation-card cinematic"><span>Multimodal narrative</span><strong>One character. Four visual worlds.</strong></article><article className="creation-card editorial"><span>Long-form storytelling</span><strong>A complete 30-second scene.</strong></article><article className="creation-card commerce"><span>Product direction</span><strong>From reference to campaign-ready motion.</strong></article></div>
      </section>

      <section className="feature-preview page-shell" id="features">
        <p className="section-kicker">Key capabilities</p><h2>Direct every layer of the video.</h2>
        <div className="feature-strip"><div><span>01</span><strong>30-second narrative</strong><p>Build a complete sequence with a beginning, progression, and finish in one generation.</p></div><div><span>02</span><strong>Full-modal reference</strong><p>Guide identity, motion, style, and sound with image, video, and audio inputs.</p></div><div><span>03</span><strong>Three ways to create</strong><p>Start from references, direct motion between keyframes, or create from text alone.</p></div></div>
      </section>

      <section className="capability-story page-shell">
        <article className="story-row"><div className="story-visual visual-one"><span className="media-placeholder">Case video · 16:9</span><div className="timeline"><i /><i /><i /><i /></div></div><div className="story-copy"><p className="section-kicker">Long-form continuity</p><h2>Keep the story moving for up to 30 seconds.</h2><p>Build a longer narrative arc without stitching together a pile of disconnected shots. Use the extra duration for entrances, transitions, reveals, and a clear finish.</p><ul><li>4, 10, 15, 20, 25, or 30 seconds</li><li>Designed for coherent sequence building</li><li>720P output available on Wizstar</li></ul></div></article>
        <article className="story-row reverse"><div className="story-visual visual-two"><span className="media-placeholder">Reference breakdown</span><div className="reference-stack"><b>IMG</b><b>VID</b><b>AUD</b></div></div><div className="story-copy"><p className="section-kicker">Multimodal direction</p><h2>Reference more than appearance.</h2><p>Combine visual, motion, and audio material in one brief. Mention uploaded assets directly in the prompt to specify what each reference should control.</p><ul><li>Image, video, and audio inputs</li><li>Up to 50 multimodal assets</li><li>Prompt-level reference assignment</li></ul></div></article>
        <article className="story-row"><div className="story-visual visual-three"><span className="media-placeholder">Before / motion / after</span><div className="frame-pair"><b>First frame</b><span>→</span><b>End frame</b></div></div><div className="story-copy"><p className="section-kicker">Flexible starting points</p><h2>Start with the material you already have.</h2><p>Use a rich reference pack, define a first and end frame, or begin with text. The model stays inside the same Wizstar video workspace.</p><ul><li>Reference to Video</li><li>Keyframe to Video</li><li>Text to Video</li></ul></div></article>
      </section>

      <section className="workflows page-shell" id="workflows">
        <div className="section-heading"><div><p className="section-kicker">Five ways into Seedance 2.5</p><h2>Choose a workflow, not a feature list.</h2></div><p>Three direct creation modes give you precise control. Two Wizstar Agents carry the model into complete commercial and creative production workflows.</p></div>
        <div className="workflow-list">{workflows.map((item) => <a className="workflow-row" key={item.number} href={item.href}><span>{item.number}</span><div><strong>{item.title}</strong><p>{item.copy}</p></div><em>{item.tag}</em><b aria-hidden="true">↗</b></a>)}</div>
      </section>

      <section className="how page-shell" id="how-it-works">
        <div className="center-heading"><p className="section-kicker">How it works</p><h2>From idea to video in three moves.</h2></div>
        <div className="step-grid"><article><span>1</span><strong>Pick your starting point</strong><p>Choose Reference, Keyframe, or Text mode based on the material you have.</p></article><article><span>2</span><strong>Direct the result</strong><p>Add references or frames, write the prompt, then choose duration, resolution, ratio, and output count where available.</p></article><article><span>3</span><strong>Generate on Wizstar</strong><p>Review the settings and continue in the real Wizstar creation workspace.</p></article></div>
      </section>

      <section className="use-cases page-shell"><div className="center-heading"><p className="section-kicker">Made for real creative work</p><h2>One model, many production briefs.</h2></div><div className="case-grid"><article><span>01</span><h3>Character-led stories</h3><p>Carry a recognizable subject through changing actions, shots, and environments.</p></article><article><span>02</span><h3>Product campaigns</h3><p>Use product references and selling points to guide commercial motion.</p></article><article><span>03</span><h3>Concept films</h3><p>Develop atmosphere, camera language, and pacing from a detailed creative brief.</p></article><article><span>04</span><h3>Social narratives</h3><p>Use longer duration to tell a complete vertical story with a beginning and payoff.</p></article></div></section>

      <section className="faq page-shell" id="faq"><div><p className="section-kicker">FAQ</p><h2>What to know before you create.</h2></div><div className="faq-list"><details open><summary>Which Seedance 2.5 modes are available on Wizstar?</summary><p>Reference to Video, Keyframe to Video, and Text to Video are available in AI Video Generator. Seedance 2.5 can also be selected from Wizstar’s E-commerce and Creative Agent workflows.</p></details><details><summary>What can I upload in Reference to Video?</summary><p>The current Wizstar interface supports image, video, and audio references, with up to 50 multimodal assets.</p></details><details><summary>What output settings are available?</summary><p>Reference and Text modes offer 4–30 second durations, 480P or 720P, 9:16 or 16:9, and 1–4 outputs. Keyframe mode uses the uploaded frame dimensions rather than a separate ratio control.</p></details><details><summary>Is the Seedance 2.5 API available?</summary><p>Wizstar’s API area currently presents function-level APIs, but the available interface does not verify a dedicated Seedance 2.5 API. This page links to the working creation tools instead.</p></details></div></section>

      <section className="final-cta page-shell"><p className="section-kicker">Seedance 2.5 on Wizstar</p><h2>Give every scene more to work with.</h2><p>Bring your references, keyframes, or idea. Build the video in the workflow that fits.</p><a className="primary-button" href={createUrl}>Start creating</a></section>

      <footer className="site-footer page-shell"><a className="brand" href="https://wizstar.com/home"><span className="brand-mark" aria-hidden="true">W</span><span>Wizstar</span></a><p>Seedance 2.5 landing-page framework · facts verified against the Wizstar product interface.</p><a href="https://wizstar.com/official/pricing">Pricing</a></footer>
    </main>
  );
}
