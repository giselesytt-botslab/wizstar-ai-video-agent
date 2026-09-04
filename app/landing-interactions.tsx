"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent as ReactMouseEvent, type MutableRefObject, type PointerEvent } from "react";

export type ShowcaseItem = {
  eyebrow: string;
  title: string;
  description: string;
  tags: readonly string[];
  tone: string;
  src: string;
  alt: string;
  credit?: string;
};

type RailSyncState = {
  activeIndex: number | null;
  lastScroll: [number, number];
  rows: [HTMLDivElement | null, HTMLDivElement | null];
};

const CTA_TRAIL_ASSETS = [
  "/assets/cta-trail/trail-12.png",
  "/assets/cta-trail/trail-03.png",
  "/assets/cta-trail/trail-17.png",
  "/assets/cta-trail/trail-08.png",
  "/assets/cta-trail/trail-01.png",
  "/assets/cta-trail/trail-15.png",
  "/assets/cta-trail/trail-06.png",
  "/assets/cta-trail/trail-19.png",
  "/assets/cta-trail/trail-10.png",
  "/assets/cta-trail/trail-04.png",
  "/assets/cta-trail/trail-14.png",
  "/assets/cta-trail/trail-07.png",
  "/assets/cta-trail/trail-18.png",
  "/assets/cta-trail/trail-02.png",
  "/assets/cta-trail/trail-11.png",
  "/assets/cta-trail/trail-05.png",
  "/assets/cta-trail/trail-16.png",
  "/assets/cta-trail/trail-09.png",
  "/assets/cta-trail/trail-13.png",
] as const;

type VideoModel = {
  name: "Seedance 2.0" | "Kling 3.0 Omni" | "Seedance 2.5";
  description: string;
  isNew?: boolean;
  isLocked?: boolean;
};

type Resolution = "720P" | "1080P" | "4K";

const VIDEO_MODELS: readonly VideoModel[] = [
  {
    name: "Seedance 2.0",
    description: "Superior audiovisual stability, seamless storytelling",
  },
  {
    name: "Kling 3.0 Omni",
    description: "Brings images to life with realistic physics",
  },
  {
    name: "Seedance 2.5",
    description: "30s single-shot video with multi-references",
    isNew: true,
    isLocked: true,
  },
] as const;

const PROMPT_GUIDES = [
  "Describe your video goal, audience, story, or product...",
  "Turn a product brief into a complete campaign video...",
  "Paste a script and direct the scenes, voice, and pacing...",
] as const;

function ModelIcon({ name }: { name: VideoModel["name"] }) {
  const src = name.startsWith("Seedance")
    ? "/assets/seedance-model-mark.svg"
    : "/assets/model-logo-kling.png";

  return <img className="model-logo" src={src} alt="" aria-hidden="true" />;
}

function TypingGuide() {
  const [guideIndex, setGuideIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const guide = PROMPT_GUIDES[guideIndex];

  useEffect(() => {
    let delay = deleting ? 22 : 38;
    if (!deleting && text === guide) delay = 1900;
    if (deleting && text === "") delay = 260;

    const timer = window.setTimeout(() => {
      if (!deleting && text === guide) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setGuideIndex((index) => (index + 1) % PROMPT_GUIDES.length);
        return;
      }
      setText(deleting ? guide.slice(0, text.length - 1) : guide.slice(0, text.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, guide, text]);

  return <span className="typing-guide" aria-hidden="true">{text}<i /></span>;
}

function getRailLoopWidth(track: HTMLDivElement | null, itemCount: number) {
  if (!track || itemCount === 0) return 0;
  const first = track.children[0] as HTMLElement | undefined;
  const nextSetFirst = track.children[itemCount] as HTMLElement | undefined;
  if (first && nextSetFirst) {
    const width = nextSetFirst.offsetLeft - first.offsetLeft;
    if (width > 0) return width;
  }
  return track.scrollWidth / 3;
}

function normalizeRailScroll(viewport: HTMLDivElement, track: HTMLDivElement, itemCount: number) {
  const loopWidth = getRailLoopWidth(track, itemCount);
  if (!loopWidth) return 0;
  const before = viewport.scrollLeft;
  const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const edge = 1;
  let normalized = before;
  // Keep a copy on either side of the viewport so both directions stay endless.
  if (before <= edge) normalized = before + loopWidth;
  else if (before >= maxScroll - edge) normalized = before - loopWidth;
  if (Math.abs(normalized - before) > 0.01) viewport.scrollLeft = normalized;
  return normalized - before;
}

export function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: 0.14, rootMargin: "0px 0px -5%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}

export function HeroWorkspace() {
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [openMenu, setOpenMenu] = useState<"model" | "aspect" | "resolution" | null>(null);
  const [model, setModel] = useState<(typeof VIDEO_MODELS)[number]["name"]>("Seedance 2.5");
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9">("16:9");
  const [resolution, setResolution] = useState<Resolution>("720P");
  const controlsRef = useRef<HTMLDivElement>(null);
  const selectedModel = VIDEO_MODELS.find((item) => item.name === model) ?? VIDEO_MODELS[2];
  const availableResolutions: readonly Resolution[] = model === "Seedance 2.5" ? ["720P"] : ["720P", "1080P", "4K"];
  const chooseReferences = (event: ChangeEvent<HTMLInputElement>) => setReferenceFiles(Array.from(event.target.files ?? []).slice(0, 50));
  const continueToWizstar = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); window.location.assign("https://wizstar.com/home"); };

  useEffect(() => {
    const closeMenus = (event: globalThis.PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", closeMenus);
    return () => document.removeEventListener("pointerdown", closeMenus);
  }, []);

  return <div className="hero-workspace hero-workspace-solo page-width">
    <form className="creator" aria-label="Wizstar AI video agent setup" onSubmit={continueToWizstar}>
      {prompt ? null : <TypingGuide />}
      <textarea aria-label="Video prompt" value={prompt} maxLength={2000} onChange={(event) => setPrompt(event.target.value)} />
      <div className="creator-toolbar" ref={controlsRef}>
        <label className="upload-control" title="Add image, video, or audio references"><input type="file" accept="image/*,video/*,audio/*" multiple onChange={chooseReferences} /><span aria-hidden="true">+</span><small>{referenceFiles.length ? `${referenceFiles.length} refs` : "Add reference"}</small></label>
        <div className="model-picker">
          <button type="button" onClick={() => setOpenMenu((value) => value === "model" ? null : "model")} aria-expanded={openMenu === "model"} aria-haspopup="listbox">
            <ModelIcon name={model} />
            <span>{model}</span>
            {selectedModel.isNew ? <span className="model-new">New</span> : null}
            <span className="select-chevron" />
          </button>
          {openMenu === "model" ? <div className="model-menu" role="listbox" aria-label="Video model">
            {VIDEO_MODELS.map((item) => <button className={item.name === model ? "is-selected" : ""} key={item.name} type="button" role="option" aria-selected={item.name === model} onClick={() => { setModel(item.name); if (item.name === "Seedance 2.5") setResolution("720P"); setOpenMenu(null); }}>
              <span className="model-option-title"><span><ModelIcon name={item.name} />{item.name}</span>{item.isNew ? <span className="model-new">New</span> : null}</span>
              <small>{item.description}</small>
            </button>)}
          </div> : null}
        </div>
        <div className="output-picker">
          <button className="creator-settings creator-aspect-settings" type="button" onClick={() => setOpenMenu((value) => value === "aspect" ? null : "aspect")} aria-label="Aspect ratio" aria-expanded={openMenu === "aspect"} aria-haspopup="dialog">
            <span className={`output-icon output-icon-${aspectRatio.replace(":", "-")}`} aria-hidden="true" />
            <span>{aspectRatio}</span><span className="select-chevron" />
          </button>
          <button className="creator-settings creator-resolution-settings" type="button" onClick={() => setOpenMenu((value) => value === "resolution" ? null : "resolution")} aria-label="Resolution" aria-expanded={openMenu === "resolution"} aria-haspopup="dialog">
            <span>{resolution}</span><span className="select-chevron" />
          </button>
          {openMenu === "aspect" ? <div className="output-menu" role="dialog" aria-label="Aspect ratio settings">
            <span className="output-label">Aspect ratio</span>
            <div className="ratio-options">
              {(["9:16", "16:9"] as const).map((ratio) => <button className={ratio === aspectRatio ? "is-selected" : ""} key={ratio} type="button" aria-pressed={ratio === aspectRatio} onClick={() => setAspectRatio(ratio)}><i className={`ratio-shape ratio-${ratio.replace(":", "-")}`} aria-hidden="true" />{ratio}</button>)}
            </div>
          </div> : null}
          {openMenu === "resolution" ? <div className="output-menu resolution-menu" role="dialog" aria-label="Resolution settings">
            <span className="output-label">Resolution</span>
            <div className={`resolution-options resolution-count-${availableResolutions.length}`}>
              {availableResolutions.map((option) => <button className={option === resolution ? "is-selected" : ""} key={option} type="button" aria-pressed={option === resolution} onClick={() => { setResolution(option); setOpenMenu(null); }}>{option}</button>)}
            </div>
          </div> : null}
        </div>
        <button className="generate" type="submit">Create Video</button>
      </div>
    </form>
  </div>;
}

export function ShowcaseVideo({ src, alt }: { src: string; alt: string }) {
  return <SoundVideo src={src} alt={alt} />;
}

export function SoundVideo({ src, alt, controls = false, autoPlay = true, audioGain = 1 }: { src: string; alt: string; controls?: boolean; autoPlay?: boolean; audioGain?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [muted, setMuted] = useState(true);
  const pointerToggleRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;
    const start = () => { if (video.paused) void video.play().catch(() => undefined); };
    start();
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    return () => {
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
    };
  }, [autoPlay, src]);

  useEffect(() => () => {
    const audioContext = audioContextRef.current;
    if (audioContext && audioContext.state !== "closed") void audioContext.close();
  }, []);

  const setAmplifiedVolume = (video: HTMLVideoElement, nextMuted: boolean) => {
    let audioContext = audioContextRef.current;
    let gainNode = gainNodeRef.current;

    if (!audioContext || !gainNode) {
      audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(video);
      gainNode = audioContext.createGain();
      source.connect(gainNode).connect(audioContext.destination);
      audioContextRef.current = audioContext;
      gainNodeRef.current = gainNode;
    }

    gainNode.gain.setValueAtTime(nextMuted ? 0 : audioGain, audioContext.currentTime);
    if (audioContext.state === "suspended") void audioContext.resume();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    video.defaultMuted = nextMuted;
    video.volume = 1;
    if (audioGain !== 1) setAmplifiedVolume(video, nextMuted);
    setMuted(nextMuted);
    void video.play().catch(() => undefined);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    pointerToggleRef.current = true;
    toggleSound();
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    window.setTimeout(() => { pointerToggleRef.current = false; }, 0);
  };

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (pointerToggleRef.current) return;
    toggleSound();
  };

  return <div className="sound-video">
    <video ref={videoRef} src={src} aria-label={alt} muted={muted} loop playsInline autoPlay={autoPlay} controls={controls} preload="metadata" />
    <button className={`sound-toggle${muted ? " is-muted" : ""}`} type="button" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onClick={handleClick} aria-pressed={!muted} aria-label={muted ? "Play video sound" : "Mute video sound"} title={muted ? "Play sound" : "Mute sound"}>
      {muted ? (
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 9.5v5h3.2l4.3 3.4V6.1L7.2 9.5H4Z" /><path d="m17 9 4 6m0-6-4 6" /></svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 9.5v5h3.2l4.3 3.4V6.1L7.2 9.5H4Z" /><path d="M15.2 9.2a4.2 4.2 0 0 1 0 5.6M17.8 6.7a7.8 7.8 0 0 1 0 10.6" /></svg>
      )}
    </button>
  </div>;
}

export function DurationCountdown() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((current) => current >= 30 ? 0 : current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="duration-countdown" aria-label={`${seconds} seconds elapsed`}>
    00:{String(seconds).padStart(2, "0")}
  </span>;
}

function ShowcaseRailRow({ items, index, syncRef, reverse = false }: { items: readonly ShowcaseItem[]; index: 0 | 1; syncRef: MutableRefObject<RailSyncState>; reverse?: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, x: 0, scroll: 0 });
  const pauseUntilRef = useRef(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || items.length === 0) return;
    syncRef.current.rows[index] = viewport;

    let frame = 0;
    let last = performance.now();
    const loopWidth = getRailLoopWidth(track, items.length);
    if (loopWidth > 0) viewport.scrollLeft = loopWidth;
    syncRef.current.lastScroll[index] = viewport.scrollLeft;
    const tick = (now: number) => {
      const loopWidth = getRailLoopWidth(track, items.length);
      const shouldMove = !dragRef.current.active && !hoverRef.current && now >= pauseUntilRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (shouldMove && loopWidth > 0) {
        const delta = (now - last) * 0.055;
        viewport.scrollLeft += reverse ? -delta : delta;
      }
      const wrappedBy = normalizeRailScroll(viewport, track, items.length);
      if (wrappedBy && dragRef.current.active) dragRef.current.scroll += wrappedBy;
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, items.length, reverse, syncRef]);

  const releaseSync = () => {
    window.setTimeout(() => {
      if (syncRef.current.activeIndex === index) syncRef.current.activeIndex = null;
    }, 700);
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    syncRef.current.activeIndex = index;
    syncRef.current.lastScroll[index] = viewport.scrollLeft;
    if (event.pointerType === "touch") return;
    dragRef.current = { active: true, x: event.clientX, scroll: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollLeft = dragRef.current.scroll - (event.clientX - dragRef.current.x);
  };

  const endDrag = () => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      viewportRef.current?.classList.remove("is-dragging");
    }
    if (syncRef.current.activeIndex !== index) return;
    pauseUntilRef.current = performance.now() + 1800;
    releaseSync();
  };

  const syncRows = () => {
    const viewport = viewportRef.current;
    if (!viewport || syncRef.current.activeIndex !== index) return;
    const track = trackRef.current;
    if (!track) return;
    const wrappedBy = normalizeRailScroll(viewport, track, items.length);
    if (wrappedBy && dragRef.current.active) dragRef.current.scroll += wrappedBy;
    const current = viewport.scrollLeft;
    const loopWidth = getRailLoopWidth(track, items.length);
    let delta = current - syncRef.current.lastScroll[index];
    if (loopWidth > 0) {
      if (delta > loopWidth / 2) delta -= loopWidth;
      if (delta < -loopWidth / 2) delta += loopWidth;
    }
    syncRef.current.lastScroll[index] = current;
    if (Math.abs(delta) < 0.01) return;
    const other = syncRef.current.rows[index === 0 ? 1 : 0];
    if (other) other.scrollLeft -= delta;
  };

  // Duplicate only this row's set so the two rails never show the same video at once.
  const visibleItems = items.length === 0 ? [] : [...items];
  const loopItems = [...visibleItems, ...visibleItems, ...visibleItems];
  return (
    <div
      ref={viewportRef}
      className={`creation-row${reverse ? " creation-row-reverse" : ""}`}
      aria-label={reverse ? "AI Video Agent work showcase second row" : "AI Video Agent work showcase first row"}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onScroll={syncRows}
      onWheel={() => {
        syncRef.current.activeIndex = index;
        pauseUntilRef.current = performance.now() + 1200;
        window.requestAnimationFrame(() => {
          const viewport = viewportRef.current;
          const track = trackRef.current;
          if (!viewport || !track) return;
          normalizeRailScroll(viewport, track, items.length);
          syncRef.current.lastScroll[index] = viewport.scrollLeft;
        });
        releaseSync();
      }}
    >
      <div className="creation-track" ref={trackRef}>
        {loopItems.map((item, index) => (
          <article
            className={`showcase-card tone-${item.tone}`}
            key={`${item.src}-${index}`}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") hoverRef.current = true;
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "touch") {
                hoverRef.current = false;
                pauseUntilRef.current = performance.now() + 250;
              }
            }}
            onFocus={() => { hoverRef.current = true; }}
            onBlur={() => { hoverRef.current = false; }}
          >
            <div className="showcase-visual">
              <ShowcaseVideo src={item.src} alt={item.alt} />
              <span>{item.eyebrow}</span>
            </div>
            <div className="showcase-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ShowcaseRail({ items }: { items: readonly ShowcaseItem[] }) {
  const syncRef = useRef<RailSyncState>({ activeIndex: null, lastScroll: [0, 0], rows: [null, null] });
  const firstRowItems = items.slice(0, 4);
  return (
    <div className="creation-marquee" aria-label="AI video agent work showcase" data-reveal>
      <ShowcaseRailRow items={firstRowItems} index={0} syncRef={syncRef} />
    </div>
  );
}

export function FinalCta() {
  const trailLastFrame = useRef(0);
  const trailIndex = useRef(0);

  const spawnCtaFrame = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    if (now - trailLastFrame.current < 95) return;
    trailLastFrame.current = now;

    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const frame = document.createElement("span");
    const index = trailIndex.current++;
    frame.className = "cta-trail-frame";
    frame.setAttribute("aria-hidden", "true");
    frame.style.left = `${event.clientX - bounds.left}px`;
    frame.style.top = `${event.clientY - bounds.top}px`;
    frame.style.backgroundImage = `url(${CTA_TRAIL_ASSETS[index % CTA_TRAIL_ASSETS.length]})`;
    frame.style.setProperty("--trail-rotate", `${[-7, 5, -3, 8][index % 4]}deg`);
    target.appendChild(frame);
    window.setTimeout(() => frame.remove(), 1050);
  };

  return (
    <section className="final-cta" onPointerMove={spawnCtaFrame}>
      <div className="final-cta-content page-width" data-reveal>
        <h2>Turn one direction into a finished video</h2>
        <p>Bring a brief, script, product, or reference to Wizstar and let the AI video agent carry the work from plan to publish-ready result.</p>
        <a href="https://wizstar.com/home">Open AI Video Agent <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
