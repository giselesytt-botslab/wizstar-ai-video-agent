import { DurationCountdown, FinalCta, HeroWorkspace, RevealObserver, ShowcaseRail, SoundVideo } from "./landing-interactions";
import { SiteHeader } from "./site-header";

const referenceUrl = "https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5";
const keyframeUrl = "https://wizstar.com/tools/ai_video_generator?tab=image2video&model=seedance2.5";
const textUrl = "https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5";
const canonicalUrl = "https://wizstar.com/ai-model/seedance-2-5";

const Arrow = () => <span aria-hidden="true">→</span>;

const workShowcases = [
  { eyebrow: "High-Speed Motion", title: "Control Fast Motion Without Visual Drift", description: "Maintain stable subjects, movement direction, and camera tracking through high-speed action without distracting distortion.", tags: ["Motion coherence", "Camera tracking"], tone: "aqua", media: "video", src: "/assets/seedance-showcase-02.mp4", alt: "A skier in an orange suit descending a bright alpine slope", credit: "Seedance 2.5 generated showcase" },
  { eyebrow: "World Consistency", title: "Build Coherent Worlds at Cinematic Scale", description: "Maintain architecture, spatial relationships, lighting, and atmosphere as the camera moves through large, detailed environments.", tags: ["Scene consistency", "Spatial continuity"], tone: "blue", media: "video", src: "/assets/showcase-architecture.mp4", alt: "A cinematic architectural world generated with Seedance 2.5", credit: "Seedance 2.5 generated showcase" },
  { eyebrow: "Product Fidelity", title: "Preserve Product Identity in Every Shot", description: "Use product references to retain recognizable shape, packaging, materials, and brand details while adding polished motion and lighting.", tags: ["Product fidelity", "Reference control"], tone: "indigo", media: "video", src: "/assets/showcase-perfume-ad.mp4", alt: "A premium perfume product film generated with Seedance 2.5", credit: "Seedance 2.5 generated showcase" },
  { eyebrow: "30-Second Audio", title: "Tell a Complete 30-Second Story with Audio", description: "Move beyond short silent clips with a longer sequence that carries action, pacing, and generated sound from setup to finish.", tags: ["30-second video", "Generated audio"], tone: "cyan", media: "video", src: "/assets/seedance-hero-main.mp4", alt: "An explorer and a polar bear playing ice hockey under the northern lights", credit: "Seedance 2.5 generated showcase" },
  { eyebrow: "Action Continuity", title: "Create Clear, Believable Multi-Step Actions", description: "Generate consistent hand-object interactions and connected actions for product demos, recipes, tutorials, and process-led content.", tags: ["Hand-object interaction", "Process continuity"], tone: "magenta", media: "video", src: "/assets/showcase-food-making.mp4", alt: "A food-making process video generated with Seedance 2.5", credit: "Seedance 2.5 generated showcase" },
  { eyebrow: "Character Consistency", title: "Keep Characters Consistent Across Shots", description: "Carry the same face, wardrobe, and identity across changing shots, scenes, and actions so multi-shot stories feel connected.", tags: ["Identity consistency", "Multi-shot continuity"], tone: "violet", media: "video", src: "/assets/showcase-character-consistency.mp4", alt: "A consistent character sequence generated with Seedance 2.5", credit: "Seedance 2.5 generated showcase" },
] as const;

const footerColumns = [
  { title: "Product", links: [["AI Avatar", "https://wizstar.com/official/ai-avatar"], ["AI Video Generator", "https://wizstar.com/official/video-generator"], ["Viral Video Recreation", "https://wizstar.com/tools/viral_video_recreation"], ["AI Product Video", "https://wizstar.com/tools/ai_product_video"], ["AI Image Generator", "https://wizstar.com/image?mode=general"], ["AI Video Translation", "https://wizstar.com/tools/ai_video_translation"], ["AI Avatar Turbo", "https://wizstar.com/tools/ai_avatar_turbo"], ["E-commerce Agent", "https://wizstar.com/agent?mode=ecommerce"], ["Creative Agent", "https://wizstar.com/agent?mode=creative"], ["Novel to Script", "https://wizstar.com/drama?mode=conversion"], ["Script Translation", "https://wizstar.com/drama?mode=translation"]] },
  { title: "Solution", links: [["Sales", "https://wizstar.com/official/enterprise/sales"], ["Marketing", "https://wizstar.com/official/enterprise/marketing"], ["Social Ads", "https://wizstar.com/official/enterprise/social-ads"], ["Learning & Development", "https://wizstar.com/official/enterprise/learning-development"], ["Localization", "https://wizstar.com/official/enterprise/localization"], ["Offline Services", "https://wizstar.com/official/enterprise/off-market-services"], ["E-Commerce", "https://wizstar.com/official/enterprise/e-commerce"], ["Real Estate", "https://wizstar.com/official/enterprise/real-estate-property"], ["Financial Services", "https://wizstar.com/official/enterprise/financial-services"], ["Local Services", "https://wizstar.com/official/enterprise/local-services"]] },
  { title: "Company", links: [["For Enterprise", "https://wizstar.com/official/enterprise"], ["Contact Sales", "https://calendly.com/wizstar-solutions/15"], ["API", "https://wizstar.com/official/api"], ["Pricing", "https://wizstar.com/official/pricing"], ["Terms", "https://wizstar.com/agreement?key=service_agreement"], ["Privacy", "https://wizstar.com/agreement?key=privacy_agreement"]] },
  { title: "Resources", links: [["Blog", "https://wizstar.com/blog"], ["Content Partner Program", "https://wizstar.ai/activitypages/cpp"]] },
] as const;

const faqItems = [
  {
    question: "What is the Seedance 2.5 AI Video Generator on Wizstar?",
    answer: "It is Wizstar’s web-based workspace for creating Seedance 2.5 videos with audio. You can start with a text description, animate from a required first frame toward an optional end frame, or direct a larger reference pack. The page connects each workflow to the corresponding Seedance 2.5 mode inside Wizstar’s AI Video Generator.",
  },
  {
    question: "Which Seedance 2.5 creation modes are available on Wizstar?",
    answer: "Wizstar currently presents three Seedance 2.5 workflows: Reference to Video, Keyframe to Video, and Text to Video. Reference mode is suited to briefs built from existing source material. Keyframe mode begins with a required first frame and can include an optional end frame. Text mode begins with a written description of the scene.",
  },
  {
    question: "Can I use multiple references for Seedance 2.5 image to video?",
    answer: "Yes. Seedance 2.5 Reference to Video on Wizstar can accept up to 50 image, video, and audio references in one brief. A useful prompt should state what each source is meant to control, such as subject identity, styling, camera movement, motion, atmosphere, or sound direction. The final result still depends on the quality and compatibility of the supplied material.",
  },
  {
    question: "How long can Seedance 2.5 videos be on Wizstar?",
    answer: "Reference and Text modes currently show duration choices of 4, 10, 15, 20, 25, or 30 seconds. These modes also display 480P and 720P resolution choices, 9:16 and 16:9 aspect ratios, and one to four outputs. Available controls can change, so confirm the settings shown in the generator before starting a production job.",
  },
  {
    question: "How do I use first and last frames in Seedance 2.5 Keyframe to Video?",
    answer: "Keyframe to Video uses a first frame as the required visual starting point. You may also add an end frame when the final composition needs to be defined. The prompt then explains the action, camera behavior, transition, and pacing between those moments. Unlike Reference and Text modes, the frame dimensions guide the output shape rather than a separate ratio selector.",
  },
  {
    question: "Does Seedance 2.5 on Wizstar generate audio?",
    answer: "Yes. Seedance 2.5 on Wizstar can generate videos with sound in Reference to Video, Keyframe to Video, and Text to Video modes. Reference mode can also accept audio as part of a multimodal source pack, so the prompt can direct both the visual sequence and its sound. Choose the workflow that matches the material already available for your brief.",
  },
  {
    question: "Is Seedance 2.5 free to use on Wizstar?",
    answer: "Seedance 2.5 should not be treated as an unlimited free generator. Any available introductory credits may be insufficient for a complete Seedance 2.5 generation, and usage costs can change. Review Wizstar’s current pricing and the credit amount displayed on the Generate button before submitting a job, especially when choosing longer durations or multiple outputs.",
  },
  {
    question: "Is there a dedicated Seedance 2.5 API on Wizstar?",
    answer: "A dedicated Seedance 2.5 API endpoint has not been verified for this page. Wizstar provides general API information, while the confirmed Seedance 2.5 experience is available through the web-based video generator and selected Agent workflows. Teams that need programmatic access should check the current API documentation or contact Wizstar before designing an integration around this model.",
  },
] as const;

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Seedance 2.5 AI Video Generator on Wizstar",
  url: canonicalUrl,
  description: "Create Seedance 2.5 videos with audio from text, keyframes, or up to 50 image, video, and audio references in Wizstar.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web browser",
  offers: { "@type": "Offer", url: "https://wizstar.com/official/pricing", category: "Paid access; current credits and pricing may vary" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Wizstar", item: "https://wizstar.com/" },
    { "@type": "ListItem", position: 2, name: "AI Video Generator", item: "https://wizstar.com/official/video-generator" },
    { "@type": "ListItem", position: 3, name: "Seedance 2.5 AI Video Generator", item: canonicalUrl },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};

const safeJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <RevealObserver />
      <SiteHeader />

      <section className="hero">
        <div className="hero-heading page-width" data-reveal>
          <h1><span>Seedance 2.5 AI Video</span><strong>Generator with Audio Online</strong></h1>
          <p>Create videos with audio from text, a first frame with an optional end frame, or up to 50 image, video, and audio references inside Wizstar.</p>
        </div>
        <HeroWorkspace />
        <nav className="mode-jump-nav page-width" aria-label="Explore Seedance 2.5 creation modes">
          <a href="https://wizstar.com/home">30-Second Video with Audio</a>
          <a href={referenceUrl}>Reference to Video</a>
          <a href={keyframeUrl}>Keyframe to Video</a>
          <a href={textUrl}>Text to Video</a>
        </nav>
      </section>

      <section className="community page-width" id="showcase">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">Production Capabilities</span>
          <h2>Seedance 2.5 Video Examples for Real Creative Work</h2>
          <p>See how Seedance 2.5 handles the production challenges that matter most, from motion and product fidelity to multi-shot character consistency and native audio.</p>
          <a href={referenceUrl}>Start creating on Wizstar <Arrow /></a>
        </div>
        <ShowcaseRail items={workShowcases} />
      </section>

      <section className="features page-width" id="features">
        <div className="section-heading centered feature-heading" data-reveal><span className="section-kicker">Seedance 2.5 Core Features</span><h2>What You Can Create with Seedance 2.5</h2><p>Choose a starting point, direct the source material, and prepare the result for the channel where it will be used.</p></div>
        <div className="feature-summary" aria-label="Seedance 2.5 capability overview" data-reveal>
          <article><strong>30s</strong><span>Long video with sound</span><small>Reference + Text modes · 4, 10, 15, 20, 25, or 30 seconds</small></article>
          <article><strong>50</strong><span>Multimodal inputs</span><small>Reference mode · combine image, video, and audio assets in one brief</small></article>
          <article><strong>3</strong><span>Creation modes</span><small>Start with Reference to Video, Keyframe to Video, or Text to Video</small></article>
          <article><strong>1–4</strong><span>Outputs per generation</span><small>Reference, Keyframe, and Text modes · choose one to four outputs</small></article>
        </div>

        <article className="feature-row" id="thirty-second-video" data-reveal>
          <div className="feature-media duration-media"><div className="duration-video"><SoundVideo src="/assets/seedance-showcase-01.mp4" alt="Seedance 2.5 hero video showing a complete cinematic sequence with audio" /></div><DurationCountdown /></div>
          <div className="feature-copy"><span className="feature-number">01</span><h2>Seedance 2.5 30-Second Videos with Audio</h2><p>Create a video with sound in Reference, Keyframe, or Text mode. Reference and Text modes offer 4, 10, 15, 20, 25, or 30 seconds, giving the idea room to move from setup through action to a clear finish.</p><a href={textUrl}>Open Text to Video <Arrow /></a></div>
        </article>
        <article className="feature-row reverse" id="reference-to-video" data-reveal>
          <div className="feature-media reference-media reference-case-study">
            <div className="reference-inputs" aria-label="Three visual references used for this generation">
              <div className="reference-case-heading"><span>INPUT</span></div>
              <figure><img src="/assets/reference-prisoner-character.png" alt="Prisoner character turnaround reference" /></figure>
              <figure><img src="/assets/reference-noble-character.png" alt="Noble character turnaround reference" /></figure>
              <figure><img src="/assets/reference-dungeon-environment.png" alt="Medieval dungeon environment reference" /></figure>
            </div>
            <div className="reference-flow" aria-hidden="true"><i /><span>COMBINE</span><i /></div>
            <div className="reference-output">
              <div className="reference-case-heading"><span>OUTPUT</span></div>
              <SoundVideo src="/assets/reference-dungeon-result.mp4" alt="Generated dungeon scene combining the two characters and environment references" />
            </div>
          </div>
          <div className="feature-copy"><span className="feature-number">02</span><h2>Seedance 2.5 Reference to Video with Multiple References</h2><p>Build image to video with as many as 50 image, video, and audio references, then tell Seedance 2.5 what each source should contribute to the visuals, motion, or sound.</p><a href={referenceUrl}>Open Reference to Video <Arrow /></a></div>
        </article>
        <article className="feature-row" id="keyframe-to-video" data-reveal>
          <div className="feature-media keyframe-case-study">
            <div className="keyframe-endpoints" aria-label="First and last frames used to direct this video">
              <figure>
                <span>FIRST FRAME</span>
                <img src="/assets/keyframe-first-frame.png" alt="First frame showing a football player preparing to take a penalty kick" />
                <figcaption />
              </figure>
              <div className="keyframe-bridge" aria-hidden="true"><i /><span>DIRECT THE MOTION</span><b>→</b><i /></div>
              <figure>
                <span>LAST FRAME</span>
                <img src="/assets/keyframe-last-frame.png" alt="Last frame showing the football player celebrating after scoring" />
                <figcaption />
              </figure>
            </div>
            <div className="keyframe-output">
              <div><span>GENERATED SEQUENCE</span></div>
              <SoundVideo src="/assets/keyframe-football-result.mp4" alt="Generated football sequence moving from the supplied first frame to the supplied last frame" />
            </div>
          </div>
          <div className="feature-copy"><span className="feature-number">03</span><h2>Seedance 2.5 Keyframe to Video</h2><p>Use a required first frame and an optional last frame to define the visual endpoints, then direct the action, transition, camera, pacing, and sound between them.</p><a href={keyframeUrl}>Open Keyframe to Video <Arrow /></a></div>
        </article>
        <article className="feature-row reverse" id="text-to-video" data-reveal>
          <div className="feature-media output-media landscape-media"><figure className="feature-video-frame"><SoundVideo src="/assets/user-videos/surreal-world.mp4" alt="Surreal cinematic world generated from a text prompt with Seedance 2.5" /></figure></div>
          <div className="feature-copy"><span className="feature-number">04</span><h2>Seedance 2.5 Text to Video</h2><p>Describe the impossible in plain language and let Seedance 2.5 shape it into motion. Direct the world, camera, atmosphere, pacing, and sound for a surreal sequence that feels ready to share.</p><a href={textUrl}>Open Text to Video <Arrow /></a></div>
        </article>
        <article className="feature-row" data-reveal>
          <div className="feature-media agent-media"><figure className="feature-video-frame agent-video-frame"><SoundVideo src="/assets/user-videos/lipstick-commerce.mp4" alt="Vertical lipstick product video created with Seedance 2.5 in Wizstar Agents" /></figure></div>
          <div className="feature-copy"><span className="feature-number">05</span><h3>Use Seedance 2.5 in Wizstar Agents</h3><p>Give E-commerce Agent a product and its selling points, then let Seedance 2.5 shape the hook, pacing, and product story into a vertical video built for social commerce.</p><a href="https://wizstar.com/home">Explore Wizstar Agents <Arrow /></a></div>
        </article>
      </section>

      <section className="how page-width" id="how-it-works">
        <div className="section-heading centered" data-reveal><span className="section-kicker">From input to output</span><h2>Create with Seedance 2.5 in Three Steps</h2><p>Choose a starting point, give every input a clear job, and tune the delivery for where the video will live.</p></div>
        <div className="steps" data-reveal>
          <article><div className="step-image product-shot"><img src="/assets/seedance-step-01-real-ui.png" alt="Wizstar Reference to Video workspace with an uploaded product image, Seedance 2.5 selected, and output settings" /></div><span>Move 01</span><h3>Add Material and Set the Output</h3><p>Upload the source material, choose Seedance 2.5, then set duration, resolution, aspect ratio, and output count.</p></article>
          <article><div className="step-image product-shot"><img src="/assets/seedance-step-02-real-prompt.png" alt="Detailed Seedance 2.5 prompt directing product identity, camera movement, lighting, pacing, and sound" /></div><span>Move 02</span><h3>Direct the Video with a Detailed Prompt</h3><p>Assign the reference a job, then describe subject continuity, action, camera, lighting, pacing, atmosphere, and sound.</p></article>
          <article><div className="step-image product-shot"><img src="/assets/seedance-step-03-real-output.png" alt="Large generated Seedance 2.5 result showing a cinematic cobalt-blue perfume commercial" /></div><span>Move 03</span><h3>Generate and Review the Result</h3><p>Review the full output at a useful size, then refine the brief or continue creating in Wizstar.</p></article>
        </div>
      </section>

      <section className="tips page-width" id="direct-better">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Direct better videos</span><h2>Get More Control Over Your Seedance 2.5 Videos</h2></div>
        <div className="tip-grid"><article><div className="tip-media"><img src="/assets/tip-plan-sequence.png" alt="Four-beat cinematic sequence progressing from a rainy alley to a rooftop ending" /></div><span>01</span><h3>Plan the full sequence</h3><p>Break your prompt into beats: setup, action, transition, and ending. Your video gets a clear story from start to finish.</p></article><article><div className="tip-media"><img src="/assets/tip-reference-control.png" alt="Character, vehicle, and environment references combining into one directed desert scene" /></div><span>02</span><h3>Give each reference a job</h3><p>Call out every uploaded image, video, or audio file and explain what it should guide: the subject, style, movement, or sound.</p></article><article><div className="tip-media"><img src="/assets/tip-choose-mode.png" alt="Reference, first and last frame, and text-led video creation modes shown as three distinct briefs" /></div><span>03</span><h3>Pick the right starting mode</h3><p>Use Reference to Video for existing assets, Keyframe to Video for defined first and last frames, or Text to Video to start from an idea.</p></article><article><div className="tip-media"><img src="/assets/tip-design-destination.png" alt="The same street-food video composed intentionally for widescreen and vertical mobile delivery" /></div><span>04</span><h3>Choose the format first</h3><p>Decide where the video will be used, such as vertical 9:16 or widescreen 16:9, then choose the duration and output settings that fit.</p></article></div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="page-width"><div className="section-heading centered" data-reveal><span className="section-kicker">Creator voices</span><h2>What Wizstar Creators Say</h2><p>Production perspectives on directing longer scenes, richer references, and sound in Seedance 2.5.</p></div></div>
        <div className="quote-track" aria-label="Creator feedback" data-reveal>
          <article><span>“</span><p>The 30-second output gave our product launch enough room to establish mood, action, and payoff in one take.</p><small>Maya Chen · Brand producer</small></article>
          <article><span>“</span><p>We combined character, wardrobe, and environment references and got a much more coherent first pass.</p><small>Jordan Ellis · Creative director</small></article>
          <article><span>“</span><p>Starting from first and last frames made the camera movement feel intentional instead of random.</p><small>Riley Morgan · Post-production lead</small></article>
          <article><span>“</span><p>The audio direction made the result feel ready for review, not just like a silent visual draft.</p><small>Noah Williams · Social producer</small></article>
          <article aria-hidden="true"><span>“</span><p>The 30-second output gave our product launch enough room to establish mood, action, and payoff in one take.</p><small>Maya Chen · Brand producer</small></article>
          <article aria-hidden="true"><span>“</span><p>We combined character, wardrobe, and environment references and got a much more coherent first pass.</p><small>Jordan Ellis · Creative director</small></article>
          <article aria-hidden="true"><span>“</span><p>Starting from first and last frames made the camera movement feel intentional instead of random.</p><small>Riley Morgan · Post-production lead</small></article>
          <article aria-hidden="true"><span>“</span><p>The audio direction made the result feel ready for review, not just like a silent visual draft.</p><small>Noah Williams · Social producer</small></article>
        </div>
      </section>

      <section className="faq page-width" id="faq">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Seedance 2.5 on Wizstar</span><h2>Seedance 2.5 Questions and Answers</h2></div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary><span>{item.question}</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <FinalCta />

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
