import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

const Starfield = ({ active }) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const drift = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }).map((_, index) => ({
        id: index,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 4,
        scale: Math.random() * 1.4 + 0.6,
        blur: Math.random() * 2,
      })),
    []
  );

  const streaks = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, index) => ({
        id: index,
        top: Math.random() * 70 + 10,
        left: Math.random() * 60 + 10,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 6,
      })),
    []
  );

  const containerStyle = prefersReducedMotion ? {} : { y: drift };

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={containerStyle}
    >
      <div className="absolute inset-0 opacity-70">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity + (active ? 0.2 : 0),
              filter: `blur(${star.blur}px)`,
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: [star.opacity, 1, star.opacity],
                    scale: [1, star.scale, 1],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: star.duration,
                    delay: star.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </div>
      {streaks.map((streak) => (
        <motion.span
          key={streak.id}
          className="absolute h-px w-32 rotate-[25deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
          style={{ top: `${streak.top}%`, left: `${streak.left}%` }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0, 1, 0],
                  x: [0, 120],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: streak.duration,
                  delay: streak.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }
          }
        />
      ))}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          active ? "opacity-60" : "opacity-0"
        }`}
      >
        <div className="absolute -top-32 left-1/3 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
    </motion.div>
  );
};

export default Starfield;
