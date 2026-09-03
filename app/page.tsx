import { DurationCountdown, FinalCta, HeroWorkspace, RevealObserver, ShowcaseRail, SoundVideo } from "./landing-interactions";
import { PromotionLoop } from "./promotion-loop";
import { ScrollStack, ScrollStackItem } from "./scroll-stack";
import { SiteHeader } from "./site-header";
import { GooeyNav } from "./gooey-nav";

const homeUrl = "https://wizstar.com/home";
const canonicalUrl = "https://wizstar.com/official/ai-video-agent";

const Arrow = () => <span aria-hidden="true">→</span>;

const workShowcases = [
  { eyebrow: "Cinematic action planning", title: "Turn a complex battle script into a cinematic sequence", description: "From one story direction, the AI video agent coordinates rapid camera moves, ship choreography, impact effects, and continuous action across every shot.", tags: ["Shot planning", "Action continuity"], tone: "aqua", media: "video", src: "/assets/showcase-cinematic-action.mp4", alt: "A cinematic space battle planned as a connected sequence of fast action shots", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Multi-shot story direction", title: "Guide one character through a connected visual journey", description: "Start with a simple goal and let the AI video agent plan every jump, reaction, camera move, and object interaction. From the clock to the floating toys, each shot connects into one playful adventure.", tags: ["Action continuity", "Spatial story planning"], tone: "blue", media: "video", src: "/assets/showcase-spatial-adventure.mp4", alt: "A cat guided through a connected sequence of jumps across floating objects", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Narrative scene direction", title: "Build suspense across a complete multi-character scene", description: "Turn a story beat into a directed sequence with character blocking, reactions, camera reveals, sound cues, and a controlled final reveal. The AI video agent keeps the cast, spatial scale, and tension coherent as the hidden threat emerges.", tags: ["Script to video", "Cinematic storytelling"], tone: "indigo", media: "video", src: "/assets/showcase-narrative-reveal.mp4", alt: "Four explorers and a hidden creature revealed across a cinematic multi-shot scene", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Character continuity", title: "Keep the same character through every world", description: "Carry one dancer, costume, and visual identity from a modern stage to cliffs, a medieval court, and a battlefield. The AI video agent plans seamless scene changes around continuous movement, so the story feels like one performance.", tags: ["Character consistency", "Multi-scene continuity"], tone: "violet", media: "video", src: "/assets/showcase-character-consistency.mp4", alt: "One ballet dancer kept consistent across modern, coastal, medieval, and battlefield scenes", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Process-led content", title: "Show a multi-step process with clear action", description: "From a recipe to a tutorial, the agent connects hand-object actions, transitions, and close-ups into an easy-to-follow edit.", tags: ["Process video", "Action continuity"], tone: "magenta", media: "video", src: "/assets/showcase-food-making.mp4", alt: "A food-making process shown as a connected instructional video", credit: "Wizstar AI Video Agent showcase" },
  { eyebrow: "Social commerce", title: "Adapt one product idea for the channel", description: "Generate a vertical product story with a strong opening, concise copy, and a rhythm designed for social feeds and paid ads.", tags: ["Social ads", "Vertical video"], tone: "cyan", media: "video", src: "/assets/user-videos/lipstick-commerce.mp4", alt: "A vertical lipstick product video for social commerce", credit: "Wizstar AI Video Agent showcase" },
] as const;

const footerColumns = [
  { title: "Product", links: [["AI Video Agent", homeUrl], ["AI Video Generator", homeUrl], ["AI Product Video", homeUrl], ["AI Image Generator", homeUrl], ["AI Video Translation", homeUrl], ["E-commerce Agent", homeUrl], ["Video workflows", homeUrl], ["Novel to Script", homeUrl], ["Script Translation", homeUrl]] },
  { title: "Solution", links: [["Sales", homeUrl], ["Marketing", homeUrl], ["Social Ads", homeUrl], ["Learning & Development", homeUrl], ["Localization", homeUrl], ["E-Commerce", homeUrl], ["Real Estate", homeUrl], ["Financial Services", homeUrl]] },
  { title: "Company", links: [["For Enterprise", homeUrl], ["Contact Sales", homeUrl], ["API", homeUrl], ["Pricing", homeUrl], ["Terms", homeUrl], ["Privacy", homeUrl]] },
  { title: "Resources", links: [["Blog", homeUrl], ["Content Partner Program", homeUrl]] },
] as const;

const faqItems = [
  { question: "What is an AI video agent?", answer: "An AI video agent is a workflow assistant that can interpret a brief, plan scenes, create or gather visual assets, assemble an edit, and refine the result from feedback. Instead of asking for one isolated clip, you give the agent a goal and it coordinates the steps required for a finished video." },
  { question: "How does an AI agent for video creation work?", answer: "Wizstar starts with the outcome you want: a campaign, product story, tutorial, or social post. The AI video creation agent turns that direction into a storyboard and shot list, then uses your prompt, references, and brand notes to produce connected scenes. You can review the draft and continue the conversation to refine it." },
  { question: "What can an AI video production agent handle?", answer: "An AI video production agent can help with concept development, scripts, storyboards, scene generation, voice and sound direction, aspect-ratio variants, and a first edit. The workflow is designed for end-to-end AI video generation, while you remain in control of the brief, approvals, and final message." },
  { question: "Is this an agentic AI video generator or a standard video tool?", answer: "It combines both. The underlying video models generate the media, while the agentic AI video generator coordinates context across the job. It can remember the purpose of each reference, keep a visual rule consistent, and propose the next production step instead of returning a disconnected clip." },
  { question: "Can I use a script to video AI agent workflow?", answer: "Yes. Paste a script, outline, or rough voiceover and the script to video AI agent can break it into scenes, suggest visual beats, and prepare a sequence for review. You can also start from a short prompt and let the agent develop the script before it creates the video." },
  { question: "Does AI video workflow automation support marketing and ads?", answer: "Yes. AI video workflow automation is useful for recurring marketing, paid ads, product launches, and social media variants. The agent can adapt the same core idea for a marketing brief, an ad hook, a product video, or an ecommerce page while preserving the important product and brand details." },
  { question: "What is the difference between an AI video agent vs AI video generator?", answer: "An AI video generator usually focuses on producing a clip from a prompt or image. An AI video agent adds planning and coordination: it can turn a larger goal into scenes, select an appropriate workflow, track references, and iterate on the result. Use a generator for a single shot and an agent when the work spans several connected decisions." },
  { question: "Is AI video agent free to use?", answer: "Access and credit requirements depend on your Wizstar account and the current plan. Open Wizstar to see the live availability, credit balance, and generation estimate before submitting a job; longer sequences and multiple outputs can use more credits." },
  { question: "What is the best AI video agent for a creative workflow?", answer: "The best AI video agent depends on how much of the workflow you want to coordinate. Wizstar is built for briefs that combine planning, references, scenes, voice, editing, and channel-ready versions in one place. Start with a real brief and judge the quality of the plan, the first cut, and how quickly you can revise it." },
  { question: "Can an AI video editing agent refine an existing draft?", answer: "Yes. Bring an existing draft or source material into the workspace and describe the changes you need. The agent can help restructure the sequence, tighten pacing, create alternate formats, and prepare a cleaner edit while keeping the original creative intent visible." },
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
        <a className="promotion-cta" href={homeUrl}>View plans <Arrow /></a>
      </div>
      <SiteHeader />

      <section className="hero">
        <div className="hero-stage">
          <div className="hero-heading page-width" data-reveal>
            <h1><span>AI VIDEO </span><strong>AGENT</strong></h1>
            <p>Wizstar's Creative Agent turns ideas, scripts, products, and references into connected video stories by planning, producing, and refining the work in one workflow.</p>
          </div>
          <HeroWorkspace />
        </div>
      </section>

      <div className="hero-workflow-nav page-width">
        <GooeyNav />
      </div>

      <section className="community page-width" id="showcase">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">AI Video Agent Workflows</span>
          <h2>From a creative direction to a finished video</h2>
          <p>Explore the jobs an AI video agent can coordinate, from story planning and text to video through product campaigns, social ads, and multi-shot continuity.</p>
          <a href={homeUrl}>Start a video workflow <Arrow /></a>
        </div>
        <ShowcaseRail items={workShowcases} />
      </section>

      <section className="features page-width" id="features">
        <div className="section-heading centered feature-heading capability-heading" data-reveal><h2>Key Features of the Wizstar AI Video Agent</h2><p>Plan, generate, and refine complete videos in one AI-powered workflow, from the first brief and script to connected scenes, voice, editing, and channel-ready delivery.</p></div>

        <article className="capability-overview" data-reveal>
          <figure className="capability-overview-media"><img src="/assets/wizstar-home-agents.png" alt="Wizstar AI video agent workspace for creating videos from briefs, products, scripts, and references" /></figure>
          <div className="capability-overview-copy"><span>Text to Video</span><h3>Turn Text into Video</h3><p>Describe your idea, story, product, or campaign in plain language. Wizstar's AI video agent can develop the direction, structure the script, plan connected scenes, and coordinate generation, voice, and editing to turn your text into a complete video draft.</p><a href={homeUrl}>Create a Video from Text <Arrow /></a></div>
        </article>

        <article className="capability-overview capability-overview-reverse" data-reveal>
          <div className="capability-overview-copy"><span>Image to Video</span><h3>Turn Images into Video</h3><p>Upload a product photo, character image, or visual reference and describe how it should move. Wizstar's AI video agent can interpret the subject, plan the action and camera direction, and carry visual details into a polished video sequence.</p><a href={homeUrl}>Create a Video from Images <Arrow /></a></div>
          <figure className="capability-overview-media image-to-video-demo" aria-label="Three source images transformed into a generated video">
            <div className="image-to-video-inputs">
              <span>Input images</span>
              <div>
                <img src="/assets/image-to-video-input-01.png" alt="Female android character reference for image to video" />
                <img src="/assets/image-to-video-input-02.png" alt="Armored robot character reference for image to video" />
                <img src="/assets/image-to-video-input-03.png" alt="Ruined futuristic battlefield reference for image to video" />
              </div>
            </div>
            <div className="image-to-video-flow" aria-hidden="true"><i /><b>→</b><i /></div>
            <div className="image-to-video-output">
              <span>Output video</span>
              <SoundVideo src="/assets/image-to-video-output.mp4" alt="Generated image to video sequence using the supplied character and environment references" />
            </div>
          </figure>
        </article>

        <ScrollStack
          useWindowScroll
          mode="stack"
          itemDistance={118}
          stackPosition="8%"
          scaleEndPosition="3%"
          itemStackDistance={34}
          baseScale={0.78}
          itemScale={0.025}
        >
        <ScrollStackItem><article className="feature-row" id="end-to-end-video" data-reveal>
          <div className="feature-media duration-media"><div className="duration-video"><SoundVideo src="/assets/seedance-showcase-01.mp4" alt="A complete cinematic video sequence produced from one creative direction" /></div><DurationCountdown /></div>
          <div className="feature-copy"><span className="feature-number">01</span><h2>End-to-end AI video generator for complete stories</h2><p>Start with a goal or brief instead of disconnected prompts. Wizstar's Creative Agent can develop the concept, write or structure the script, map the storyboard, coordinate scenes, guide voice and sound, assemble a first cut, and carry revisions through to a finished video.</p><a href={homeUrl}>Open the video agent <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row reverse" id="reference-to-video" data-reveal>
          <div className="feature-media reference-media reference-case-study">
            <div className="reference-inputs" aria-label="Visual references used for this generation">
              <div className="reference-case-heading"><span>INPUT</span></div>
              <figure><img src="/assets/reference-prisoner-character.png" alt="Character reference used to keep a subject consistent" /></figure>
              <figure><img src="/assets/reference-noble-character.png" alt="Wardrobe and character reference used in the brief" /></figure>
              <figure><img src="/assets/reference-dungeon-environment.png" alt="Environment reference used to define the world" /></figure>
            </div>
            <div className="reference-flow" aria-hidden="true"><i /><span>COMBINE</span><i /></div>
            <div className="reference-output">
              <div className="reference-case-heading"><span>OUTPUT</span></div>
              <SoundVideo src="/assets/reference-dungeon-result.mp4" alt="A generated scene combining character and environment references" />
            </div>
          </div>
          <div className="feature-copy"><span className="feature-number">02</span><h2>AI agent for video creation with references</h2><p>Give each image, video, or audio file a clear job. The AI video creation agent carries those details from the brief into the script, storyboard, generated scenes, voice direction, and edit so the result reflects the subject, style, movement, and sound you intended.</p><a href={homeUrl}>Add references to a brief <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row" id="keyframe-to-video" data-reveal>
          <div className="feature-media keyframe-case-study">
            <div className="keyframe-endpoints" aria-label="Story beats used to direct this video">
              <figure><span>FIRST BEAT</span><img src="/assets/keyframe-first-frame.png" alt="Opening story beat for a generated sequence" /><figcaption /></figure>
              <div className="keyframe-bridge" aria-hidden="true"><i /><span>DIRECT THE STORY</span><b>→</b><i /></div>
              <figure><span>FINAL BEAT</span><img src="/assets/keyframe-last-frame.png" alt="Closing story beat for a generated sequence" /><figcaption /></figure>
            </div>
            <div className="keyframe-output"><div><span>GENERATED SEQUENCE</span></div><SoundVideo src="/assets/keyframe-football-result.mp4" alt="A generated sequence connecting the opening and closing story beats" /></div>
          </div>
          <div className="feature-copy"><span className="feature-number">03</span><h2>Script to video AI agent for structured production</h2><p>Paste a script, outline, or voiceover and let the agent turn the words into visual beats. It can suggest shots, transitions, camera movement, pacing, and supporting assets, then keep the sequence ready for review as the story changes.</p><a href={homeUrl}>Build from a script <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row reverse" id="text-to-video" data-reveal>
          <div className="feature-media output-media landscape-media"><figure className="feature-video-frame"><SoundVideo src="/assets/user-videos/surreal-world.mp4" alt="A surreal video created from a plain-language creative brief" /></figure></div>
          <div className="feature-copy"><span className="feature-number">04</span><h2>Agentic AI video generator for ideas that need exploration</h2><p>Describe the world, audience, feeling, or message in plain language. The agent can develop a direction, make a visual draft, and refine the script, scenes, sound, and edit through a focused conversation instead of forcing you to learn a complex timeline first.</p><a href={homeUrl}>Start with an idea <Arrow /></a></div>
        </article></ScrollStackItem>
        <ScrollStackItem><article className="feature-row" id="workflow-automation" data-reveal>
          <div className="feature-media agent-media"><figure className="feature-video-frame agent-video-frame"><SoundVideo src="/assets/user-videos/lipstick-commerce.mp4" alt="A vertical product video prepared for a social commerce workflow" /></figure></div>
          <div className="feature-copy"><span className="feature-number">05</span><h3>AI video workflow automation for marketing and ecommerce</h3><p>Turn a product brief into a repeatable workflow. The agent can shape hooks, product shots, copy, voice direction, aspect-ratio variants, and a concise edit for marketing, ads, social media, product videos, or ecommerce pages.</p><a href={homeUrl}>Run a marketing workflow <Arrow /></a></div>
        </article></ScrollStackItem>
        </ScrollStack>
      </section>

      <section className="how page-width" id="how-it-works">
        <div className="section-heading centered" data-reveal><span className="section-kicker">From input to output</span><h2>How an AI video agent works</h2><p>Give the agent enough context to make useful decisions, review the first pass, and refine the result until it is ready for its destination.</p></div>
        <div className="steps" data-reveal>
          <article><div className="step-image product-shot"><img src="/assets/seedance-step-01-real-ui.png" alt="Wizstar video workspace with source material and output settings" /></div><span>Move 01</span><h3>Bring the brief and source material</h3><p>Describe the goal, audience, message, references, and destination. The agent uses that context to choose a useful starting plan.</p></article>
          <article><div className="step-image product-shot"><img src="/assets/seedance-step-02-real-prompt.png" alt="A detailed video brief directing subject, camera, lighting, pacing, and sound" /></div><span>Move 02</span><h3>Direct the decisions that matter</h3><p>Clarify the subject, action, camera, voice, pacing, and brand rules. The agent fills in production detail while keeping your intent in view.</p></article>
          <article><div className="step-image product-shot"><img src="/assets/seedance-step-03-real-output.png" alt="A large generated video result ready for review and refinement" /></div><span>Move 03</span><h3>Review, refine, and deliver</h3><p>Review the first cut, ask for targeted changes, and prepare the version that fits your channel, campaign, or product page.</p></article>
        </div>
      </section>

      <section className="related-tools page-width" id="related-tools">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Connected production paths</span><h2>Start with the workflow your video needs</h2><p>Use the same Wizstar workspace for a text-led idea, a structured script, or a product brief that needs versions for several channels.</p></div>
        <div className="related-grid" data-reveal>
          <article><span>Explore</span><h3>Text to video workflow</h3><p>Describe the world, mood, and message, then let the agent develop a visual direction and first draft.</p><a href={homeUrl}>Start with text <Arrow /></a></article>
          <article><span>Structure</span><h3>Script to video workflow</h3><p>Bring a script or voiceover and move through scene planning, shot direction, pacing, and review.</p><a href={homeUrl}>Bring a script <Arrow /></a></article>
          <article><span>Adapt</span><h3>Product and social video workflow</h3><p>Turn one product story into clear edits for ads, social media, ecommerce pages, and product launches.</p><a href={homeUrl}>Adapt a product story <Arrow /></a></article>
        </div>
      </section>

      <section className="tips page-width" id="direct-better">
        <div className="section-heading centered" data-reveal><span className="section-kicker">Direct better videos</span><h2>Get better results from your AI video agent</h2></div>
        <div className="tip-grid"><article><div className="tip-media"><img src="/assets/tip-plan-sequence.png" alt="Four-beat cinematic sequence progressing from setup to ending" /></div><span>01</span><h3>State the outcome first</h3><p>Tell the agent who the video is for, where it will appear, and what viewers should understand or feel at the end.</p></article><article><div className="tip-media"><img src="/assets/tip-reference-control.png" alt="Character, vehicle, and environment references combining into one directed scene" /></div><span>02</span><h3>Give every reference a job</h3><p>Say which source controls identity, styling, movement, environment, voice, or sound so the agent can use it intentionally.</p></article><article><div className="tip-media"><img src="/assets/tip-choose-mode.png" alt="Three different starting briefs for reference-led, frame-led, and text-led video creation" /></div><span>03</span><h3>Choose the right starting point</h3><p>Use existing references for a controlled result, a script for structured production, or a plain-language idea when you want the agent to explore.</p></article><article><div className="tip-media"><img src="/assets/tip-design-destination.png" alt="The same video idea prepared for widescreen and vertical delivery" /></div><span>04</span><h3>Name the destination</h3><p>Call out social media, ads, ecommerce, product pages, or widescreen review so the agent can plan the right pace, framing, and length.</p></article></div>
      </section>

      <section className="testimonials" id="production-priorities">
        <div className="page-width"><div className="section-heading centered" data-reveal><span className="section-kicker">Production priorities</span><h2>What the agent keeps connected</h2><p>A useful AI video production agent carries the creative decisions forward instead of treating every step as a separate prompt.</p></div></div>
        <div className="quote-track" aria-label="AI video production priorities" data-reveal>
          <article><span>01</span><p>The campaign goal, audience, message, and channel stay visible while the concept becomes a script and storyboard.</p><small>Brief to plan</small></article>
          <article><span>02</span><p>Characters, products, references, visual rules, and scene intent remain available as shots are developed.</p><small>Plan to scenes</small></article>
          <article><span>03</span><p>Voice direction, pacing, transitions, and scene order come together in a first cut that can be reviewed.</p><small>Scenes to edit</small></article>
          <article><span>04</span><p>Feedback becomes targeted revisions and channel-ready versions without losing the original creative direction.</p><small>Review to delivery</small></article>
          <article aria-hidden="true"><span>01</span><p>The campaign goal, audience, message, and channel stay visible while the concept becomes a script and storyboard.</p><small>Brief to plan</small></article>
          <article aria-hidden="true"><span>02</span><p>Characters, products, references, visual rules, and scene intent remain available as shots are developed.</p><small>Plan to scenes</small></article>
          <article aria-hidden="true"><span>03</span><p>Voice direction, pacing, transitions, and scene order come together in a first cut that can be reviewed.</p><small>Scenes to edit</small></article>
          <article aria-hidden="true"><span>04</span><p>Feedback becomes targeted revisions and channel-ready versions without losing the original creative direction.</p><small>Review to delivery</small></article>
        </div>
      </section>

      <section className="faq page-width" id="faq">
        <div className="section-heading centered" data-reveal><span className="section-kicker">AI Video Agent FAQ</span><h2>AI Video Agent Questions and Answers</h2></div>
        <div className="faq-list">{faqItems.map((item) => <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div>
      </section>

      <FinalCta />

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="brand" href={homeUrl} aria-label="Wizstar home"><img src="/assets/wizstar-logo.png" alt="Wizstar" /></a>
            <p>The AI creation platform that turns ideas into polished visuals in minutes.</p>
            <div className="socials" aria-label="Wizstar social channels">
               <a href={homeUrl} aria-label="X"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" /></svg></a>
               <a href={homeUrl} aria-label="YouTube"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21.58 7.19a2.73 2.73 0 0 0-1.92-1.93C17.97 4.8 12 4.8 12 4.8s-5.97 0-7.66.46a2.73 2.73 0 0 0-1.92 1.93A28.43 28.43 0 0 0 2 12a28.43 28.43 0 0 0 .42 4.81 2.73 2.73 0 0 0 1.92 1.93c1.69.46 7.66.46 7.66.46s5.97 0 7.66-.46a2.73 2.73 0 0 0 1.92-1.93A28.43 28.43 0 0 0 22 12a28.43 28.43 0 0 0-.42-4.81ZM10 15.2V8.8l5.2 3.2L10 15.2Z" /></svg></a>
               <a href={homeUrl} aria-label="TikTok"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16.72 3c.34 2.02 1.51 3.22 3.47 3.35v3.02a7.3 7.3 0 0 1-3.42-1.02v6.39c0 3.24-1.97 5.26-5.14 5.26A4.85 4.85 0 0 1 6.7 15.2a4.87 4.87 0 0 1 5.66-4.77v3.09a2.06 2.06 0 0 0-2.67 1.97 2.02 2.02 0 0 0 2.07 1.98c1.17 0 1.94-.7 1.94-2.18V3h3.02Z" /></svg></a>
               <a href={homeUrl} aria-label="Instagram"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.95 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg></a>
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">{footerColumns.map((column) => <div key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>)}</nav>
        </div>
      </footer>
    </main>
  );
}
