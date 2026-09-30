import React, { useEffect, useState, useRef } from 'react';

interface ImpactCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({
  end,
  duration = 1800,
  suffix = '+',
  prefix = '',
  label,
  sublabel
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const startVal = 0;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutProgress * (end - startVal) + startVal);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FAF8F5]/80 border border-[#D8CEBE]/70 shadow-xs">
      <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A382B] tracking-tight mb-2">
        <span>{prefix}</span>
        <span>{count}</span>
        <span className="text-[#C65332]">{suffix}</span>
      </div>
      <p className="text-base sm:text-lg font-serif font-semibold text-[#1E2421] mb-1">
        {label}
      </p>
      {sublabel && (
        <p className="text-xs text-[#75837B] max-w-[200px] leading-relaxed">
          {sublabel}
        </p>
      )}
    </div>
  );
};
