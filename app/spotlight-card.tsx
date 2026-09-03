"use client";
import { useRef } from "react";
type SpotlightCardProps = { children: React.ReactNode; className?: string; spotlightColor?: string };
export function SpotlightCard({ children, className = "", spotlightColor = "rgba(100, 190, 255, 0.16)" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => { const card = cardRef.current; if (!card) return; const rect = card.getBoundingClientRect(); card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`); card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`); card.style.setProperty("--spotlight-color", spotlightColor); };
  return <div ref={cardRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>{children}</div>;
}
