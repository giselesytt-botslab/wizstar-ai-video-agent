"use client";

type PromotionLoopProps = {
  text: string;
  className?: string;
};

/** A lightweight TextLoop-style ribbon for the hero promotion message. */
export function PromotionLoop({ text, className = "" }: PromotionLoopProps) {
  return (
    <div className={`promotion-loop ${className}`.trim()} aria-label={text}>
      <div className="promotion-loop-track" aria-hidden="true">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
