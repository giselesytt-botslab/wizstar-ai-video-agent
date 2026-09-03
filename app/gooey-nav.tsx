"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type GooeyNavItem = { label: string; href: string };

const items: GooeyNavItem[] = [
  { label: "Video Creation", href: "https://wizstar.com/home" },
  { label: "Marketing & Ads", href: "https://wizstar.com/home" },
  { label: "Script to Video", href: "https://wizstar.com/home" },
  { label: "Product & Ecommerce", href: "https://wizstar.com/home" },
];

type GooeyNavProps = {
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  initialActiveIndex?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: number[];
};

export function GooeyNav({
  particleCount = 18,
  particleDistances = [82, 16],
  particleR = 100,
  initialActiveIndex = 0,
  animationTime = 600,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const makeParticles = (element: HTMLSpanElement) => {
    element.style.setProperty("--time", "1500ms");
    for (let i = 0; i < particleCount; i += 1) {
      const start = getXY(particleDistances[0], particleCount - i, particleCount);
      const end = getXY(particleDistances[1] + noise(7), particleCount - i, particleCount);
      const time = animationTime * 2 + noise(timeVariance * 2);
      const rotation = noise(particleR / 10);
      window.setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.className = "particle";
        particle.style.setProperty("--start-x", `${start[0]}px`);
        particle.style.setProperty("--start-y", `${start[1]}px`);
        particle.style.setProperty("--end-x", `${end[0]}px`);
        particle.style.setProperty("--end-y", `${end[1]}px`);
        particle.style.setProperty("--time", `${time}ms`);
        particle.style.setProperty("--scale", `${0.72 + noise(.16)}`);
        particle.style.setProperty(
          "--rotate",
          `${(rotation > 0 ? rotation + particleR / 20 : rotation - particleR / 20) * 10}deg`,
        );
        point.style.setProperty("--point-color", `var(--color-${colors[i % colors.length]})`);
        point.className = "point";
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add("active"));
        window.setTimeout(() => particle.remove(), time);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    const container = containerRef.current;
    const filter = filterRef.current;
    const text = textRef.current;
    if (!container || !filter || !text) return;
    const containerRect = container.getBoundingClientRect();
    const position = element.getBoundingClientRect();
    const style = { left: `${position.left - containerRect.left}px`, top: `${position.top - containerRect.top}px`, width: `${position.width}px`, height: `${position.height}px` };
    Object.assign(filter.style, style);
    Object.assign(text.style, style);
    text.textContent = element.textContent;
  };

  const activate = (item: HTMLElement, index: number) => {
    setActiveIndex(index);
    updateEffectPosition(item);
    textRef.current?.classList.remove("active");
    void textRef.current?.offsetWidth;
    textRef.current?.classList.add("active");
    filterRef.current?.classList.remove("active");
    void filterRef.current?.offsetWidth;
    filterRef.current?.classList.add("active");
    if (filterRef.current) {
      filterRef.current.querySelectorAll(".particle").forEach((particle) => particle.remove());
      makeParticles(filterRef.current);
    }
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    const item = event.currentTarget.parentElement;
    if (item) activate(item, index);
  };

  useEffect(() => {
    const active = navRef.current?.querySelectorAll("li")[activeIndex];
    if (!active) return;
    updateEffectPosition(active);
    textRef.current?.classList.add("active");
    filterRef.current?.classList.add("active");
    const observer = new ResizeObserver(() => updateEffectPosition(active));
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef} aria-label="Choose an AI video workflow">
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.label} className={activeIndex === index ? "active" : ""} onMouseEnter={(event) => activate(event.currentTarget, index)}>
              <a href={item.href} onClick={(event) => handleClick(event, index)}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} aria-hidden="true" />
      <span className="effect text" ref={textRef} aria-hidden="true" />
    </div>
  );
}
