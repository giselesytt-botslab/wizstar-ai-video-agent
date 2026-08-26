"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type PointerEvent } from "react";

const modeDetails = {
  Reference: {
    title: "Add multiple references",
    hint: "Image · Video · Audio · up to 50 references",
    settings: ["10s", "720P", "9:16", "1 Output"],
    url: "https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5",
    cta: "Open Reference to Video",
  },
  Keyframe: {
    title: "Define the first and final moment",
    hint: "First frame required · End frame optional",
    settings: ["15s", "720P", "Frame ratio", "1 Output"],
    url: "https://wizstar.com/tools/ai_video_generator?tab=keyframe2video&model=seedance2.5",
    cta: "Open Keyframe to Video",
  },
  Text: {
    title: "Direct the scene in words",
    hint: "Subject · camera · motion · pacing",
    settings: ["15s", "720P", "9:16", "1 Output"],
    url: "https://wizstar.com/tools/ai_video_generator?tab=text2video&model=seedance2.5",
    cta: "Open Text to Video",
  },
} as const;

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
  const [mode, setMode] = useState<keyof typeof modeDetails>("Reference");
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [firstFrame, setFirstFrame] = useState<File | null>(null);
  const [endFrame, setEndFrame] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const currentMode = modeDetails[mode];

  const changeMode = (nextMode: keyof typeof modeDetails) => {
    setMode(nextMode);
    setPrompt("");
  };

  const chooseReferences = (event: ChangeEvent<HTMLInputElement>) => {
    setReferenceFiles(Array.from(event.target.files ?? []).slice(0, 50));
  };

  const continueToWizstar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(currentMode.url);
  };

  const moveHeroLight = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className="hero-workspace page-width" onPointerMove={moveHeroLight} data-reveal>
      <form className="creator" aria-label="Seedance 2.5 AI video generator setup" onSubmit={continueToWizstar}>
        <div className="mode-tabs" aria-label="Seedance 2.5 generation modes">
          {(Object.keys(modeDetails) as Array<keyof typeof modeDetails>).map((item) => (
            <button
              className={mode === item ? "active" : ""}
              type="button"
              key={item}
              aria-pressed={mode === item}
              onClick={() => changeMode(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="model-select">
          <img className="model-mark" src="/assets/seedance-model-mark.svg" alt="" />
          <div><small>Model</small><strong>Seedance 2.5</strong></div>
          <span className="select-chevron" aria-hidden="true" />
        </div>
        {mode === "Reference" && (
          <label className={`upload-box interactive-upload ${referenceFiles.length ? "has-files" : ""}`} key={mode}>
            <input type="file" accept="image/*,video/*,audio/*" multiple onChange={chooseReferences} />
            <b>{referenceFiles.length ? `${referenceFiles.length}/50` : "＋"}</b>
            <span>{referenceFiles.length ? "Multiple references selected" : currentMode.title}</span>
            <small>{referenceFiles.length ? referenceFiles.slice(0, 2).map((file) => file.name).join(" · ") : currentMode.hint}</small>
          </label>
        )}
        {mode === "Keyframe" && (
          <div className="upload-box keyframe-upload" key={mode}>
            <label>
              <input type="file" accept="image/*" onChange={(event) => setFirstFrame(event.target.files?.[0] ?? null)} />
              <b>{firstFrame ? "✓" : "＋"}</b><span>First Frame</span><small>{firstFrame?.name ?? "Required"}</small>
            </label>
            <label>
              <input type="file" accept="image/*" onChange={(event) => setEndFrame(event.target.files?.[0] ?? null)} />
              <b>{endFrame ? "✓" : "＋"}</b><span>Last Frame</span><small>{endFrame?.name ?? "Optional"}</small>
            </label>
          </div>
        )}
        {mode === "Text" && (
          <div className="upload-box text-start" key={mode}>
            <b>✦</b><span>{currentMode.title}</span><small>{currentMode.hint}</small>
          </div>
        )}
        <div className="prompt-box">
          <textarea aria-label="Video prompt" maxLength={2000} value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Direct the subject, camera, action, and pacing..." />
          <small>{prompt.length} / 2000</small>
        </div>
        <div className="settings">{currentMode.settings.map((setting) => <span key={setting}>{setting}</span>)}</div>
        <button className="generate" type="submit">{currentMode.cta}</button>
        <small className="handoff-note">Set up the brief here, then continue in Wizstar to generate.</small>
      </form>

      <div className="hero-media" aria-label="Temporary visual direction for a future Seedance 2.5 featured video">
        <img src="/assets/demo/contemporary-dance.jpg" alt="Contemporary dance campaign visual used as a temporary direction reference" />
        <div className="media-label"><span>Movement Without Limits</span><small>Demo visual direction · approved Seedance case pending</small></div>
        <button type="button" aria-label="Preview treatment demonstration">▶</button>
        <div className="media-meta"><span>30 sec</span><span>720P</span><span>16:9</span></div>
      </div>
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
    <section className="final-cta" onPointerMove={spawnCtaFrame}>
      <div className="final-cta-content page-width" data-reveal>
        <h2>Create Your Next Video with Seedance 2.5</h2>
        <p>Begin with a reference pack, a first frame and optional end frame, or a scene written from scratch.</p>
        <a href="https://wizstar.com/tools/ai_video_generator?tab=reference2video&model=seedance2.5">Open Seedance 2.5 <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
