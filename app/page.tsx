import { FinalCta, HeroWorkspace, RevealObserver } from "./landing-interactions";

const referenceUrl = "https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5";
const keyframeUrl = "https://wizstar.com/tools/ai_video_generator?tab=keyframe2video&model=seedance2.5";
const textUrl = "https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5";
const canonicalUrl = "https://wizstar.com/ai-model/seedance-2-5";

const Arrow = () => <span aria-hidden="true">→</span>;

const workShowcases = [
  { eyebrow: "Reference to Video", title: "Fashion Editorial", description: "Carry a distinctive subject, styling language, and photographic mood into a directed moving sequence.", tags: ["Identity", "Style"], tone: "cyan", image: "/assets/demo/fashion-editorial.jpg", alt: "Blue-lit editorial fashion portrait used as a temporary visual direction reference", credit: "Demo photo: Sherman Trotz / Pexels" },
  { eyebrow: "E-commerce Agent", title: "Luxury Product Film", description: "Turn product imagery and selling points into a polished launch concept with tactile detail and motion.", tags: ["Product", "Campaign"], tone: "violet", image: "/assets/demo/perfume-product.jpg", alt: "Luxury perfume product photo used as a temporary visual direction reference", credit: "Demo photo: Carol EspiAldon / Pexels" },
  { eyebrow: "Keyframe to Video", title: "Culinary Story", description: "Build atmosphere and human action around a real service moment, from preparation to final presentation.", tags: ["Food", "Lifestyle"], tone: "blue", image: "/assets/demo/chef-culinary.jpg", alt: "Chef plating a dish used as a temporary visual direction reference", credit: "Demo photo: Anthony Osuna / Pexels" },
  { eyebrow: "Text to Video", title: "Destination Film", description: "Direct scale, camera movement, and pacing for travel stories that feel expansive and cinematic.", tags: ["Travel", "Landscape"], tone: "magenta", image: "/assets/demo/travel-landscape.jpg", alt: "Aerial coastal landscape used as a temporary visual direction reference", credit: "Demo photo: Ali Akdemir / Pexels" },
  { eyebrow: "Social Creative", title: "Movement Campaign", description: "Shape expressive human motion into energetic vertical work made for short-form placements.", tags: ["Dance", "9:16"], tone: "aqua", image: "/assets/demo/contemporary-dance.jpg", alt: "Contemporary dancer in motion used as a temporary visual direction reference", credit: "Demo photo: Israyosoy S. / Pexels" },
  { eyebrow: "Longer Generation", title: "Architecture Journey", description: "Use a longer timeline to reveal space, material, symmetry, and movement through a designed environment.", tags: ["Architecture", "30 sec"], tone: "indigo", image: "/assets/demo/modern-architecture.jpg", alt: "Modern architectural interior used as a temporary visual direction reference", credit: "Demo photo: Markus Winkler / Pexels" },
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
    answer: "It is Wizstar’s web-based workspace for creating Seedance 2.5 videos. You can start with a text description, animate from a required first frame toward an optional end frame, or direct a larger reference pack. The page connects each workflow to the corresponding Seedance 2.5 mode inside Wizstar’s AI Video Generator.",
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
    question: "How does Seedance 2.5 Keyframe to Video work?",
    answer: "Keyframe to Video uses a first frame as the required visual starting point. You may also add an end frame when the final composition needs to be defined. The prompt then explains the action, camera behavior, transition, and pacing between those moments. Unlike Reference and Text modes, the frame dimensions guide the output shape rather than a separate ratio selector.",
  },
  {
    question: "Does Seedance 2.5 on Wizstar generate audio?",
    answer: "Audio can be included as source material in the Reference to Video workflow. This page does not promise native audio generation because that output capability has not been verified in the current Wizstar interface. If sound is essential to a project, review the active generator controls and test the intended workflow before committing to final delivery requirements.",
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
  description: "Create Seedance 2.5 videos from text, keyframes, or up to 50 image, video, and audio references in Wizstar.",
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
          <h1>Seedance 2.5 AI Video Generator</h1>
          <p>Create videos from text, a first frame with an optional end frame, or up to 50 image, video, and audio references inside Wizstar.</p>
        </div>
        <HeroWorkspace />
      </section>

      <section className="community page-width" id="showcase">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">Work Showcase</span>
          <h2>Seedance 2.5 Video Examples for Real Creative Work</h2>
          <p>Preview the range of work this page will demonstrate with approved Seedance 2.5 outputs—from product campaigns and fashion to food, travel, movement, and space.</p>
          <a href={referenceUrl}>Start creating on Wizstar <Arrow /></a>
        </div>
        <p className="demo-disclaimer" data-reveal>Visual direction preview for product review. Replace with approved Seedance 2.5 outputs before launch.</p>
        <div className="creation-marquee" aria-label="Seedance 2.5 work showcase" data-reveal>
          <div className="creation-track">{[...workShowcases, ...workShowcases].map((item, index) => <article className={`showcase-card tone-${item.tone}`} key={`top-${index}`}><div className="showcase-visual" title={item.credit}><img src={item.image} alt={item.alt} /><span>{item.eyebrow}</span><b>DEMO VISUAL</b><em aria-hidden="true">▶</em><small>SCENE {String((index % workShowcases.length) + 1).padStart(2,"0")}</small></div><div className="showcase-copy"><h3>{item.title}</h3><p>{item.description}</p><div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
          <div className="creation-track reverse-track">{[...workShowcases.slice().reverse(), ...workShowcases.slice().reverse()].map((item, index) => <article className={`showcase-card tone-${item.tone}`} key={`bottom-${index}`}><div className="showcase-visual" title={item.credit}><img src={item.image} alt={item.alt} /><span>{item.eyebrow}</span><b>DEMO VISUAL</b><em aria-hidden="true">▶</em><small>SCENE {String((index % workShowcases.length) + 1).padStart(2,"0")}</small></div><div className="showcase-copy"><h3>{item.title}</h3><p>{item.description}</p><div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        </div>
      </section>

      <section className="features page-width" id="features">
        <div className="section-heading centered feature-heading" data-reveal><span className="section-kicker">Seedance 2.5 Core Features</span><h2>What You Can Create with Seedance 2.5</h2><p>Choose a starting point, direct the source material, and prepare the result for the channel where it will be used.</p></div>
        <div className="feature-summary" aria-label="Seedance 2.5 capability overview" data-reveal>
          <article><strong>30s</strong><span>Room for a complete narrative arc</span><small>4, 10, 15, 20, 25, or 30 seconds</small></article>
          <article><strong>50</strong><span>Multimodal references in one brief</span><small>Images, video, and audio</small></article>
          <article><strong>3</strong><span>Ways to begin the scene</span><small>Reference, Keyframe, or Text</small></article>
          <article><strong>1–4</strong><span>Outputs from one direction</span><small>Available in Reference and Text modes</small></article>
        </div>

        <article className="feature-row" data-reveal>
          <div className="feature-media duration-media"><img src="/assets/demo/travel-landscape.jpg" alt="Travel landscape demo visual for a longer narrative" /><span>00:30</span><div className="scrubber"><i /></div><small>From opening frame to a complete journey</small></div>
          <div className="feature-copy"><span className="feature-number">01</span><h3>Create Videos Up to 30 Seconds</h3><p>Reference and Text modes offer 4, 10, 15, 20, 25, or 30 seconds, giving a brief room to move from setup through action to a clear finish.</p><a href={textUrl}>Open Text to Video <Arrow /></a></div>
        </article>
        <article className="feature-row reverse" data-reveal>
          <div className="feature-media reference-media"><img src="/assets/demo/fashion-editorial.jpg" alt="Editorial portrait demo visual for multimodal reference control" /><div className="reference-stack"><div className="reference-card">Image</div><div className="reference-card">Video</div><div className="reference-card">Audio</div></div><small>One brief, a richer source pack</small></div>
          <div className="feature-copy"><span className="feature-number">02</span><h3>Image to Video with Multiple References</h3><p>Use Seedance 2.5 Reference to Video with as many as 50 image, video, and audio references, then tell the model what each source should contribute to the result.</p><a href={referenceUrl}>Open Reference to Video <Arrow /></a></div>
        </article>
        <article className="feature-row" data-reveal>
          <div className="feature-media modes-media"><img src="/assets/wizstar-seedance-generator.png" alt="Seedance 2.5 modes inside the Wizstar AI Video Generator" /><div><b>Reference</b><b>Keyframe</b><b>Text</b></div><small>Three modes in one video workspace</small></div>
          <div className="feature-copy"><span className="feature-number">03</span><h3>Keyframe to Video with First and Last Frames</h3><p>Build from a source-rich reference pack, animate from a required first frame toward an optional last frame, or begin with a written scene in Text to Video.</p><a href={keyframeUrl}>Open Keyframe to Video <Arrow /></a></div>
        </article>
        <article className="feature-row reverse" data-reveal>
          <div className="feature-media output-media"><img src="/assets/demo/contemporary-dance.jpg" alt="Contemporary movement demo visual for vertical and widescreen delivery" /><div><b>4–30 sec</b><b>480P / 720P</b><b>9:16 / 16:9</b><b>1–4 outputs</b></div><small>Available controls in Reference and Text modes</small></div>
          <div className="feature-copy"><span className="feature-number">04</span><h3>Prepare Each Video for Its Destination</h3><p>In Reference and Text modes, choose the available duration, resolution, aspect ratio, and output count for the placement you are creating.</p><a href={referenceUrl}>Set up an output <Arrow /></a></div>
        </article>
        <article className="feature-row" data-reveal>
          <div className="feature-media agent-media"><img src="/assets/wizstar-home-agents.png" alt="Wizstar E-commerce and Creative Agent interface" /><div><b>E-commerce Agent</b><span>Product URL · images · selling points</span></div><div><b>Creative Agent</b><span>Text · images · video</span></div><small>Seedance 2.5 is selectable in both Agent workflows</small></div>
          <div className="feature-copy"><span className="feature-number">05</span><h3>Use Seedance 2.5 in Wizstar Agents</h3><p>Select Seedance 2.5 inside Wizstar’s E-commerce Agent for product-led briefs or Creative Agent for broader creative production.</p><a href="https://wizstar.com/home">Explore Wizstar Agents <Arrow /></a></div>
        </article>
      </section>

      <section className="how page-width" id="how-it-works">
        <div className="section-heading centered" data-reveal><span className="section-kicker">From input to output</span><h2>Create with Seedance 2.5 in Three Steps</h2><p>Choose a starting point, give every input a clear job, and tune the delivery for where the video will live.</p></div>
        <div className="steps" data-reveal>
          <article><div className="step-image product-shot"><img src="/assets/wizstar-seedance-generator.png" alt="Seedance 2.5 model selected in Wizstar AI Video Generator" /></div><span>Move 01</span><h3>Pick the Right Starting Point</h3><p>Choose Reference, Keyframe, or Text based on the material already available for the brief.</p></article>
          <article><div className="step-image step-reference"><img src="/assets/demo/chef-culinary.jpg" alt="Chef scene used to demonstrate directing multiple inputs" /><div><span>@Image 1</span><span>@Video 1</span><span>@Audio 1</span></div></div><span>Move 02</span><h3>Give Every Input a Job</h3><p>Upload what the mode needs, then direct the subject, movement, camera, and pacing in the prompt.</p></article>
          <article><div className="step-image step-settings"><img src="/assets/demo/perfume-product.jpg" alt="Luxury product scene used to demonstrate output settings" /><div><b>10 sec</b><b>720P</b><b>9:16</b><b>1 Output</b></div></div><span>Move 03</span><h3>Set the Delivery</h3><p>Confirm the available duration, resolution, ratio, and output count before sending the brief to Seedance 2.5.</p></article>
        </div>
      </section>

      <section className="use-cases page-width" id="workflows">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Choose the workflow</span><h2>Seedance 2.5 Workflows for Different Creative Briefs</h2><p>Work directly in AI Video Generator or bring Seedance 2.5 into a wider Wizstar production flow.</p></div>
        <div className="use-grid" data-reveal>
          <article><div className="workflow-media"><img src="/assets/demo/fashion-editorial.jpg" alt="Fashion editorial reference workflow demo" /></div><span>Reference mode</span><h3>Build Image to Video from Multiple References</h3><p>Combine up to 50 image, video, and audio sources in one directed brief.</p><a href={referenceUrl}>Enter Reference to Video <Arrow /></a></article>
          <article><div className="workflow-media"><img src="/assets/demo/modern-architecture.jpg" alt="Architecture keyframe workflow demo" /></div><span>Keyframe mode</span><h3>Set the First and Last Frame</h3><p>Anchor Keyframe to Video with a required first frame and an optional last frame.</p><a href={keyframeUrl}>Enter Keyframe to Video <Arrow /></a></article>
          <article><div className="workflow-media"><img src="/assets/demo/travel-landscape.jpg" alt="Travel text to video workflow demo" /></div><span>Text mode</span><h3>Create with Seedance 2.5 Text to Video</h3><p>Write the subject, action, camera, and pacing, then choose the available output controls.</p><a href={textUrl}>Enter Text to Video <Arrow /></a></article>
          <article><div className="workflow-media"><img src="/assets/demo/perfume-product.jpg" alt="Product campaign Agent workflow demo" /></div><span>Wizstar Agents</span><h3>Turn Inputs into Campaign Work</h3><p>Use Seedance 2.5 with product inputs in E-commerce Agent or broader material in Creative Agent.</p><a href="https://wizstar.com/home">See the Agent workflows <Arrow /></a></article>
        </div>
      </section>

      <section className="tips page-width">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Write like a director</span><h2>How to Direct Better Seedance 2.5 Videos</h2></div>
        <div className="tip-grid"><article><div className="tip-media"><img src="/assets/demo/contemporary-dance.jpg" alt="Movement sequence demo" /></div><span>01</span><h3>Plan a sequence, not a still</h3><p>Write the setup, action, transition, and ending as separate beats so the full duration has a clear arc.</p></article><article><div className="tip-media"><img src="/assets/demo/chef-culinary.jpg" alt="Directed culinary scene demo" /></div><span>02</span><h3>Tell each reference what to control</h3><p>Mention uploaded assets directly and connect each one to a subject, look, motion cue, or sound direction.</p></article><article><div className="tip-media"><img src="/assets/demo/fashion-editorial.jpg" alt="Reference mode editorial demo" /></div><span>03</span><h3>Choose the mode before the brief</h3><p>Use references for a source-rich brief, keyframes for defined endpoints, and text when the scene begins in words.</p></article><article><div className="tip-media"><img src="/assets/demo/travel-landscape.jpg" alt="Destination format demo" /></div><span>04</span><h3>Design for the destination</h3><p>Decide whether the result needs 9:16 or 16:9, then select the available duration and output settings around that placement.</p></article></div>
      </section>

      <section className="insights page-width" id="insights">
        <div className="section-heading" data-reveal><span className="section-kicker">Wizstar field notes</span><h2>Seedance 2.5 Guides and Creative Resources</h2><p>Practical guides for choosing a mode, directing a longer sequence, and connecting Seedance 2.5 to real creative work.</p><a href="https://wizstar.com/blog">Visit the Wizstar blog <Arrow /></a></div>
        <div className="article-grid" data-reveal>
          <article><div className="article-cover"><img src="/assets/demo/modern-architecture.jpg" alt="Modern architecture demo cover" /><span>DIRECTING GUIDE</span></div><small>Guide in progress</small><h3>How to Structure a 30-Second AI Video Brief</h3><p>A beat-by-beat framework for turning one idea into a complete moving sequence.</p></article>
          <article><div className="article-cover"><img src="/assets/demo/fashion-editorial.jpg" alt="Editorial fashion demo cover" /><span>MODE GUIDE</span></div><small>Guide in progress</small><h3>Reference, Keyframe, or Text: Where Should You Start?</h3><p>A practical way to match the material in hand with the right creation mode.</p></article>
          <article><div className="article-cover"><img src="/assets/demo/perfume-product.jpg" alt="Luxury product demo cover" /><span>WORKFLOW GUIDE</span></div><small>Guide in progress</small><h3>From Product Inputs to a Video Concept in Wizstar</h3><p>How product URLs, images, selling points, and Seedance 2.5 meet inside Agent workflows.</p></article>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="page-width"><div className="section-heading centered" data-reveal><span className="section-kicker">Creator voices</span><h2>What Wizstar Creators Say</h2><p>Verified feedback from Wizstar creators will appear here with names and sources attached—never invented, never anonymous.</p></div></div>
        <div className="quote-track" aria-label="Testimonial placeholders" data-reveal>
          <article><span>“</span><p>Verified feedback about reference-led creation is reserved for this card.</p><small>Creator attribution pending</small></article>
          <article><span>“</span><p>Verified feedback about longer video direction is reserved for this card.</p><small>Creator attribution pending</small></article>
          <article><span>“</span><p>Verified feedback about keyframe and text workflows is reserved for this card.</p><small>Creator attribution pending</small></article>
          <article><span>“</span><p>Verified feedback about Wizstar Agent production is reserved for this card.</p><small>Creator attribution pending</small></article>
        </div>
      </section>

      <section className="faq page-width" id="faq">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Seedance 2.5 on Wizstar</span><h2>Seedance 2.5 Questions and Answers</h2></div>
        <div className="faq-list">
          {faqItems.map((item) => <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}
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
