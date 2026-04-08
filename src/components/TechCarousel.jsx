import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParallax } from "../hooks/useParallax";

const TechCarousel = ({ items }) => {
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const repeated = useMemo(() => [...items, ...items], [items]);
  const wrapStyle = useParallax(wrapRef, 28);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const width = trackRef.current.scrollWidth / 2;
      setTrackWidth(width);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  const duration = trackWidth ? trackWidth / 45 : 24;

  return (
    <motion.div
      ref={wrapRef}
      className="glass-light overflow-hidden rounded-3xl px-4 py-6 sm:px-6"
      style={wrapStyle}
    >
      <motion.div
        ref={trackRef}
        className="flex gap-4"
        animate={prefersReducedMotion ? undefined : { x: -trackWidth }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration, ease: "linear", repeat: Infinity }
        }
      >
        {repeated.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="glass smooth flex min-w-[160px] items-center gap-3 rounded-2xl px-4 py-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-400/40 bg-white/5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              {item.short}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                {item.name}
              </span>
              <span className="text-xs text-white/60">{item.role}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TechCarousel;
