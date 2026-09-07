import { FinalCta, HeroWorkspace, RevealObserver, ShowcaseRail, SoundVideo } from "./landing-interactions";
import { PromotionLoop } from "./promotion-loop";
import { ScrollStack, ScrollStackItem } from "./scroll-stack";
import { GooeyNav } from "./gooey-nav";

const homeUrl = "https://wizstar.com/home";
const billingUrl = "https://wizstar.com/billing";
const canonicalUrl = "https://wizstar.com/official/ai-video-agent";

const Arrow = () => <span aria-hidden="true">→</span>;

const workShowcases = [
  { eyebrow: "Cinematic action planning", title: "Turn a complex battle script into a cinematic sequence", description: "From one story direction, the AI video agent coordinates rapid camera moves, ship choreography, impact effects, and continuous action across every shot.", tags: ["Shot planning", "Action continuity"], tone: "aqua", media: "video", src: "/assets/showcase-cinematic-action.mp4", alt: "A cinematic space battle planned as a connected sequence of fast action shots", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Multi-shot story direction", title: "Guide your character through a connected visual journey", description: "Start with a simple goal and let the AI video agent plan every jump, reaction, camera move, and object interaction. From the clock to the floating toys, each shot connects into one playful adventure.", tags: ["Action continuity", "Spatial story planning"], tone: "blue", media: "video", src: "/assets/showcase-spatial-adventure.mp4", alt: "A cat guided through a connected sequence of jumps across floating objects", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Narrative scene direction", title: "Build Suspense with Multiple Characters", description: "Turn a story beat into a directed sequence with character blocking, reactions, camera reveals, sound cues, and a controlled final reveal. The AI video agent keeps the cast, spatial scale, and tension coherent as the hidden threat emerges.", tags: ["Script to video", "Cinematic storytelling"], tone: "indigo", media: "video", src: "/assets/showcase-narrative-reveal.mp4", alt: "Four explorers and a hidden creature revealed across a cinematic multi-shot scene", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Character continuity", title: "Keep Your Character Consistent Across Every Scene", description: "Carry one dancer, costume, and visual identity from a modern stage to cliffs, a medieval court, and a battlefield. The AI video agent plans seamless scene changes around continuous movement, so the story feels like one performance.", tags: ["Character consistency", "Multi-scene continuity"], tone: "violet", media: "video", src: "/assets/showcase-character-consistency.mp4", alt: "One ballet dancer kept consistent across modern, coastal, medieval, and battlefield scenes", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Process-led content", title: "Show a multi-step process with clear action", description: "From a recipe to a tutorial, the agent connects hand-object actions, transitions, and close-ups into an easy-to-follow edit.", tags: ["Process video", "Action continuity"], tone: "magenta", media: "video", src: "/assets/showcase-food-making.mp4", alt: "A food-making process shown as a connected instructional video", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Social commerce", title: "Adapt one product idea for the channel", description: "Generate a vertical product story with a strong opening, concise copy, and a rhythm designed for social feeds and paid ads.", tags: ["Social ads", "Vertical video"], tone: "cyan", media: "video", src: "/assets/user-videos/lipstick-commerce.mp4", alt: "A vertical lipstick product video for social commerce", credit: "Wizstar AI Video Agent showcase" },
] as const;

const modelRoster = [
  {
    name: "Seedance 2.5",
    logo: "/assets/model-logo-seedance.png",
    strength: "30s cinematic shots",
  },
  {
    name: "MiniMax H3",
    logo: "/assets/model-logo-minimax.png",
    strength: "High-resolution output",
  },
  {
    name: "Kling 3.0 Omni",
    logo: "/assets/model-logo-kling.png",
    strength: "Realistic motion",
  },
  {
    name: "GPT Image 2",
    logo: "/assets/model-logo-openai.png",
    strength: "Precise image generation",
  },
  {
    name: "More Models",
    mark: "+",
    strength: "More creative options",
  },
  {
    name: "Nano Banana 2",
    logo: "/assets/model-logo-nano-banana.png",
    strength: "Fast visual concepts",
  },
  {
    name: "Nano Banana Pro",
    logo: "/assets/model-logo-nano-banana.png",
    strength: "Polished image detail",
  },
  {
    name: "Nano Banana 2 Lite",
    logo: "/assets/model-logo-nano-banana.png",
    strength: "Lightweight iteration",
  },
  {
    name: "Seedance 2.0",
    logo: "/assets/model-logo-seedance.png",
    strength: "Connected video scenes",
  },
  {
    name: "Seedance 1.5",
    logo: "/assets/model-logo-seedance.png",
    strength: "Reliable video motion",
  },
] as const;

const videoModels = [
  {
    name: "Seedance 2.0",
    logo: "/assets/model-logo-seedance.png",
    strength: "Stable audiovisual storytelling",
    description: "Choose it for connected scenes that need reliable visual continuity, synchronized sound, and a smooth narrative flow.",
  },
  {
    name: "Seedance 2.5",
    logo: "/assets/model-logo-seedance.png",
    strength: "Longer multi-reference shots",
    description: "Choose it for a single shot up to 30 seconds when several visual references need to stay connected in one directed sequence.",
  },
  {
    name: "MiniMax H3",
    logo: "/assets/model-logo-minimax.png",
    strength: "High-resolution cinematic control",
    description: "Choose it for visually rich scenes that benefit from expressive character motion, detailed subjects, and polished high-resolution output.",
  },
  {
    name: "Kling 3.0 Omni",
    logo: "/assets/model-logo-kling.png",
    strength: "Realistic motion and physics",
    description: "Choose it to bring product shots, characters, and image references to life with grounded movement and believable physical detail.",
  },
] as const;

const ModelRevealTitle = ({ children }: { children: string }) => (
  <h2 className="model-reveal-title">
    {children.split(" ").map((word, index, words) => <span key={`${word}-${index}`} style={{ animationDelay: `${index * 100}ms` }}>{word}{index < words.length - 1 ? " " : null}</span>)}
  </h2>
);

const faqItems = [
  { question: "What is the Wizstar AI Video Agent?", answer: "The Wizstar AI Video Agent is an end-to-end creative workspace for turning a brief into a finished video. Start with a prompt, script, product, or reference image, and the agent helps connect planning, scene creation, voice and sound direction, editing, and revisions. You stay in control of the creative direction while the agent coordinates the production steps." },
  { question: "How is an AI video agent different from a standard AI video generator?", answer: "A standard AI video generator usually creates one clip from one prompt or image. An AI video agent manages more of the workflow around that clip, including the concept, script, shot plan, references, connected scenes, and revision notes. Wizstar is designed for projects that need those decisions to stay connected instead of starting over with every generation." },
  { question: "Can I create videos from both text and images?", answer: "Yes. Wizstar supports both text-to-video and image-to-video workflows. You can describe a scene in words, upload an image as a visual starting point, or combine a script with product and character references. The best input depends on your goal: use text for open-ended concepts and images when composition, appearance, or visual continuity matters." },
  { question: "Which AI video model should I choose in Wizstar?", answer: "Choose the model based on the shot you need, because each model has different strengths. Wizstar currently presents options including Seedance 2.0, Kling 3.0 Omni, and Seedance 2.5. Compare them for motion, prompt response, reference handling, and the visual style your project requires, then generate with the model that best fits that scene." },
  { question: "How long can my video be, and which formats are available?", answer: "Video length and output options depend on the model and workflow you select. In Wizstar, Seedance 2.5 supports a single shot up to 30 seconds and can work with multiple references. The current creation controls also include 9:16 and 16:9 aspect ratios with 720P output, making it easier to prepare vertical or widescreen content." },
  { question: "Is the Wizstar AI Video Agent free to try?", answer: "Availability and credit usage depend on your current Wizstar account and plan. Sign in to Wizstar to see the latest access options, your available credit balance, and the estimated credit cost before you generate. This keeps pricing information accurate as models, generation settings, and account offers change over time." },
  { question: "What kinds of videos can I make with the AI Video Agent?", answer: "You can use the Wizstar AI Video Agent for product ads, marketing videos, animated stories, educational explainers, and AI short-form dramas. It can also help adapt a core idea for different channels and aspect ratios. The workflow is most useful when a project needs several connected creative decisions rather than a single isolated shot." },
  { question: "What happens to the reference files I upload?", answer: "Reference files are used to guide the video workflow you create in Wizstar. Before uploading confidential, sensitive, or rights-restricted material, review Wizstar's current privacy policy and terms for the latest information about data handling and permitted use. Only upload files that you have the right to use in your project." },
] as const;

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Wizstar AI Video Agent",
  url: canonicalUrl,
  description: "Turn briefs, scripts, products, and references into connected video workflows with Wizstar's AI video agent.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web browser",
  offers: { "@type": "Offer", url: homeUrl, category: "Access and current credits may vary by account" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Wizstar", item: homeUrl },
    { "@type": "ListItem", position: 2, name: "AI Video Agent", item: canonicalUrl },
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
      <div className="promotion-bar">
        <PromotionLoop text="Limited-time member offer · Annual plans save up to 56% · Top-up credits 20% off · 10+ top models included" />
        <a className="promotion-cta" href={billingUrl}>View plans <Arrow /></a>
      </div>
      <wizstar-navbar></wizstar-navbar>

      <section className="hero">
        <div className="hero-stage-shell hero-stage-shell-solo">
          <div className="hero-stage">
            <div className="hero-heading page-width" data-reveal>
              <h1><span>Wizstar</span><strong>Meet Your AI Video Agent</strong></h1>
              <p>From your first idea to the final cut, plan, create, and refine your entire video in one seamless workflow.</p>
            </div>
            <HeroWorkspace />
          </div>
        </div>
      </section>

      <div className="hero-workflow-nav page-width">
        <GooeyNav />
      </div>

      <section className="features page-width" id="features">
        <div className="section-heading centered feature-heading capability-heading" data-reveal><span className="section-kicker">Wizstar AI Video Agent</span><h2>Create Smarter with an AI Video Agent</h2><p>Wizstar plans the work, brings leading AI models into one workflow, and keeps your best assets ready to reuse, so you can move from idea to final cut without managing every step yourself.</p></div>

        <article className="capability-overview" data-reveal>
          <figure className="capability-overview-media text-to-video-demo"><SoundVideo src="/assets/text-to-video.mp4" alt="Wizstar AI video agent creating a video from a text prompt" /></figure>
          <div className="capability-overview-copy"><h3>Turn One Idea into a Cinematic Video</h3><p>Skip the prompt engineering. Describe what you want in your own words, and the Video Agent breaks your idea into actionable steps, handles the entire creative process, and brings it all together into a polished, cinematic video.</p><a href={homeUrl}>Create with AI Video Agent <Arrow /></a></div>
        </article>

        <article className="capability-overview capability-overview-reverse model-roster-overview" data-reveal>
          <div className="capability-overview-copy"><h3>Top AI Models. All in Wizstar.</h3><p>Access the latest AI video models and choose the right one for every creative task. Make the most of each model&apos;s unique strengths to create stunning visuals, natural motion, and seamless storytelling—bringing every idea to life with greater depth and impact.</p><a href={homeUrl}>Explore Top AI Models <Arrow /></a></div>
          <figure className="capability-overview-media model-roster-demo" aria-label="Leading AI video models available in Wizstar">
            <div className="model-roster-topline"><span>WIZSTAR MODEL LIBRARY</span><b>TOP MODELS · ALL IN ONE PLACE</b></div>
            <div className="model-roster-grid">
              {modelRoster.map((model) => <div className="model-roster-item" key={model.name}>
                {"logo" in model ? <img src={model.logo} alt="" aria-hidden="true" /> : <span className="model-roster-mark" aria-hidden="true">{model.mark}</span>}
                <div><strong>{model.name}</strong><span>{model.strength}</span></div>
              </div>)}
            </div>
            <div className="model-roster-footer"><span>One workflow</span><i aria-hidden="true" /><span>Every creative direction</span><i aria-hidden="true" /><span>Wizstar</span></div>
          </figure>
        </article>

        <article className="capability-overview" data-reveal>
          <figure className="capability-overview-media video-restyle-demo"><SoundVideo src="/assets/video-style-transform.mp4" alt="A live-action video transformed into animated and handcrafted yarn visual styles" audioGain={1.1} /></figure>
          <div className="capability-overview-copy"><span>One-Stop Video Workflow</span><h3>Everything You Need, From Script to Final Cut</h3><p>Write scripts, build storyboards, generate scenes, add voice and sound, edit, refine, and finalize your video—all in one place, without jumping between tools or breaking your creative flow.</p><a href={homeUrl}>Start Your Video <Arrow /></a></div>
        </article>

        <article className="capability-overview capability-overview-reverse lip-sync-overview" id="dialogue-lip-sync" data-reveal>
          <div className="capability-overview-copy"><h3>Reusable Asset Library</h3><p>Save characters, products, scenes, visual styles, and finished clips once, then reuse them across new projects to create faster and stay consistent.</p><a href={homeUrl}>Reuse Your Assets <Arrow /></a></div>
          <figure className="capability-overview-media lip-sync-demo"><SoundVideo src="/assets/reusable-asset-library.mp4" alt="Reusable creative assets organized in the Wizstar asset library" audioGain={1.1} /></figure>
        </article>

        <section className="community" id="showcase">
          <div className="section-heading" data-reveal>
            <h2>From a creative direction to a finished video</h2>
            <p>Explore the jobs an AI video agent can coordinate, from story planning and text to video through product campaigns, social ads, and multi-shot continuity.</p>
            <a href={homeUrl}>Start a video workflow <Arrow /></a>
          </div>
          <ShowcaseRail items={workShowcases} />
        </section>

        <div className="section-heading centered feature-heading video-types-heading" data-reveal>
          <h2>How Creators Are Using Wizstar&apos;s AI Video Agent</h2>
          <p>Use the same guided workflow for marketing campaigns, product ads, animated stories, educational videos, and cinematic short dramas.</p>
        </div>

        <ScrollStack
          useWindowScroll
          mode="stack"
          itemDistance={118}
          stackPosition="8%"
          collapseDistance="24%"
          itemStackDistance={34}
          baseScale={0.78}
          itemScale={0.025}
        >
        <ScrollStackItem><article className="feature-row" id="end-to-end-video" data-reveal>
          <div className="feature-media"><SoundVideo src="/assets/futuristic-mouse-marketing-ad.mp4" alt="A futuristic technology advertisement for a gaming mouse created as an AI marketing video" /></div>
          <div className="feature-copy"><span className="feature-number">01</span><h2>AI Video Agent for Marketing Campaigns</h2><p>Turn a product brief into a polished campaign video with a clear hook, product-focused shots, cinematic motion, and channel-ready pacing. Wizstar's Creative Agent can shape the concept, script, visual direction, and edit into a high-impact ad like this futuristic gaming mouse launch.</p><a href={homeUrl}>Create a Marketing Video <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row reverse" id="reference-to-video" data-reveal>
          <div className="feature-media"><SoundVideo src="/assets/model-eyeshadow-product-ad.mp4" alt="A model demonstrating the finished look in an eyeshadow palette video advertisement" /></div>
          <div className="feature-copy"><span className="feature-number">02</span><h2>Turn Product Shots into Model-Led Video Ads</h2><p>Show the product and the finished look in one polished story. Wizstar's AI agent for video creation can coordinate eyeshadow palette close-ups, model shots, color-focused transitions, pacing, and sound so beauty shoppers can see the effect before they buy.</p><a href={homeUrl}>Create a Beauty Product Ad <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row" id="keyframe-to-video" data-reveal>
          <div className="feature-media"><SoundVideo src="/assets/cartoon-rabbit-story-video.mp4" alt="A handcrafted cartoon rabbit floating with a dandelion before curling up inside a flowered teacup" /></div>
          <div className="feature-copy"><span className="feature-number">03</span><h2>Create Character-Led Animated Stories</h2><p>Turn a simple character idea or short script into a warm, expressive animated sequence. Wizstar's script-to-video AI agent can plan character actions, camera beats, a whimsical visual world, and scene-to-scene continuity for branded mascots, family content, and social storytelling.</p><a href={homeUrl}>Create an Animated Story <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row reverse" id="text-to-video" data-reveal>
          <div className="feature-media"><SoundVideo src="/assets/newton-educational-explainer.mp4" alt="Isaac Newton explaining gravity through the story of an apple falling from a tree" /></div>
          <div className="feature-copy"><span className="feature-number">04</span><h2>Turn Lessons into Engaging Explainer Videos</h2><p>Bring an abstract idea to life with a familiar character, a clear setting, and a memorable visual example. Wizstar's AI video production agent can turn a lesson outline into narrated scenes, demonstrations, character performance, and a paced edit, like Newton explaining gravity through the falling apple.</p><a href={homeUrl}>Create an Educational Video <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row" id="workflow-automation" data-reveal>
          <div className="feature-media"><SoundVideo src="/assets/ai-short-drama-scene.mp4" alt="A science-fiction short drama scene following a commander and a spacecraft on final approach to a futuristic city" /></div>
          <div className="feature-copy"><span className="feature-number">05</span><h3>Create Cinematic AI Short Dramas, Scene by Scene</h3><p>Build a short-form drama from one story beat, with character dialogue, reaction shots, world-building, and a cinematic payoff. Wizstar's end-to-end AI video generator can plan the script, scene order, visual continuity, sound, and edit, from a command-center warning to a spacecraft's final approach.</p><a href={homeUrl}>Create an AI Short Drama <Arrow /></a></div>
        </article></ScrollStackItem>
        </ScrollStack>

        <section className="agent-steps" id="agent-steps" aria-labelledby="agent-steps-title">
          <div className="section-heading centered agent-steps-heading" data-reveal>
            <h2 id="agent-steps-title">Create with Wizstar&apos;s AI Video Agent in Three Steps</h2>
            <p>Start with an idea, let the Agent build the plan, and shape the final video with every creative decision connected.</p>
          </div>
          <div className="agent-steps-grid">
            <article className="agent-step" data-reveal>
              <div className="agent-step-image"><img src="/assets/agent-steps/step-01.jpg" alt="Wizstar AI Video Agent workspace ready for a creative brief" /></div>
              <div className="agent-step-copy"><span>Step 01</span><h3>Start with an Idea</h3><p>Describe what you want in plain language, then add scripts, products, characters, or reference images. The Agent turns your direction into a clear creative brief.</p></div>
            </article>
            <article className="agent-step" data-reveal>
              <div className="agent-step-image"><img src="/assets/agent-steps/step-02.jpg" alt="A planned sequence of connected scenes and camera moments" /></div>
              <div className="agent-step-copy"><span>Step 02</span><h3>Let the Agent Plan the Video</h3><p>Your Agent maps the story, suggests scenes, selects the right model, and organizes visuals, voice, pacing, and format before generation starts.</p></div>
            </article>
            <article className="agent-step" data-reveal>
              <div className="agent-step-image"><img src="/assets/agent-steps/step-03.jpg" alt="A generated video result ready for review and refinement" /></div>
              <div className="agent-step-copy"><span>Step 03</span><h3>Generate, Review, and Refine</h3><p>Create a polished first cut, review the result, and keep refining the details with the Agent until the video is ready to share.</p></div>
            </article>
          </div>
        </section>
      </section>

      <section className="model-showcase" id="video-models" data-reveal>
        <video
          className="model-showcase-video"
          src="/assets/model-comparison-background.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="model-showcase-overlay" />
        <div className="model-showcase-content page-width">
          <span className="model-showcase-badge liquid-glass">Multiple AI Models</span>
          <ModelRevealTitle>Top AI Models Powering Wizstar&apos;s Video Agent</ModelRevealTitle>
          <p className="model-showcase-intro">Wizstar brings four AI video models into one workflow, so you can match each brief with the kind of motion, continuity, and shot length it needs.</p>
          <div className="model-showcase-grid">
            {videoModels.map((model) => <article className="model-showcase-card liquid-glass" key={model.name}>
              <div><strong className="liquid-glass"><img src={model.logo} alt="" aria-hidden="true" />{model.name}</strong></div>
              <h3>{model.strength}</h3>
              <p>{model.description}</p>
            </article>)}
          </div>
          <a className="model-showcase-cta" href={homeUrl}>Explore Video Models <Arrow /></a>
        </div>
      </section>

      <section className="testimonials" id="production-priorities">
        <div className="page-width"><div className="section-heading centered testimonials-heading" data-reveal><span className="section-kicker">Creator voices</span><h2>What Wizstar Creators Say</h2><p>Production perspectives on planning connected scenes, sound, and revisions with an AI video agent.</p></div></div>
        <div className="quote-track" aria-label="AI video production priorities">
          <article><span aria-hidden="true">&ldquo;</span><p>I can start with a rough brief and get a clear shot plan before I open the editor.</p><small>Maya R. · Creative producer</small></article>
          <article><span aria-hidden="true">&ldquo;</span><p>Keeping the references, characters, and visual rules together makes revisions much easier.</p><small>Jordan K. · Brand designer</small></article>
          <article><span aria-hidden="true">&ldquo;</span><p>I can try different models for different shots without rebuilding the whole project from scratch.</p><small>Chris T. · Independent filmmaker</small></article>
          <article><span aria-hidden="true">&ldquo;</span><p>The agent gives me a strong first cut, then I can steer the details until the story feels right.</p><small>Taylor S. · Marketing lead</small></article>
          <article aria-hidden="true"><span>&ldquo;</span><p>I can start with a rough brief and get a clear shot plan before I open the editor.</p><small>Maya R. · Creative producer</small></article>
          <article aria-hidden="true"><span>&ldquo;</span><p>Keeping the references, characters, and visual rules together makes revisions much easier.</p><small>Jordan K. · Brand designer</small></article>
          <article aria-hidden="true"><span>&ldquo;</span><p>I can try different models for different shots without rebuilding the whole project from scratch.</p><small>Chris T. · Independent filmmaker</small></article>
          <article aria-hidden="true"><span>&ldquo;</span><p>The agent gives me a strong first cut, then I can steer the details until the story feels right.</p><small>Taylor S. · Marketing lead</small></article>
        </div>
      </section>

      <section className="faq page-width" id="faq">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Wizstar AI Video Agent</span><h2>Questions and Answers</h2></div>
        <div className="faq-list">{faqItems.map((item) => <details className="faq-item" key={item.question}><summary><span>{item.question}</span></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <FinalCta />

      <wizstar-footer></wizstar-footer>
      {/*
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="brand" href="https://wizstar.com/" aria-label="Wizstar home"><img src="/assets/wizstar-logo.png" alt="Wizstar" /></a>
            <p>The AI creation platform that turns ideas into polished visuals in minutes.</p>
            <div className="socials" aria-label="Wizstar social channels">
               <a href="https://x.com/WizstarAI" aria-label="X"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" /></svg></a>
               <a href="https://www.youtube.com/@Wizstar_official" aria-label="YouTube"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21.58 7.19a2.73 2.73 0 0 0-1.92-1.93C17.97 4.8 12 4.8 12 4.8s-5.97 0-7.66.46a2.73 2.73 0 0 0-1.92 1.93A28.43 28.43 0 0 0 2 12a28.43 28.43 0 0 0 .42 4.81 2.73 2.73 0 0 0 1.92 1.93c1.69.46 7.66.46 7.66.46s5.97 0 7.66-.46a2.73 2.73 0 0 0 1.92-1.93A28.43 28.43 0 0 0 22 12a28.43 28.43 0 0 0-.42-4.81ZM10 15.2V8.8l5.2 3.2L10 15.2Z" /></svg></a>
               <a href="https://www.tiktok.com/@wizstar_ai" aria-label="TikTok"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16.72 3c.34 2.02 1.51 3.22 3.47 3.35v3.02a7.3 7.3 0 0 1-3.42-1.02v6.39c0 3.24-1.97 5.26-5.14 5.26A4.85 4.85 0 0 1 6.7 15.2a4.87 4.87 0 0 1 5.66-4.77v3.09a2.06 2.06 0 0 0-2.67 1.97 2.02 2.02 0 0 0 2.07 1.98c1.17 0 1.94-.7 1.94-2.18V3h3.02Z" /></svg></a>
               <a href="https://www.instagram.com/wizstarai/" aria-label="Instagram"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.95 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg></a>
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">{footerColumns.map((column) => <div key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>)}</nav>
        </div>
      </footer> */}
    </main>
  );
}
