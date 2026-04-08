import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const buildShootingStars = (count = 2) =>
  Array.from({ length: count }).map((_, index) => ({
    id: `${Date.now()}-${index}`,
    top: Math.random() * 70 + 6,
    left: Math.random() * 60 + 6,
    length: Math.random() * 120 + 80,
    travel: Math.random() * 180 + 120,
    delay: Math.random() * 1.5,
    duration: Math.random() * 1.6 + 1.1,
    angle: Math.random() * 18 + 20,
  }));

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
        driftX: Math.random() * 8 - 4,
        driftY: Math.random() * 8 - 4,
      })),
    [],
  );
  const [shootingStars, setShootingStars] = useState(() =>
    buildShootingStars(2),
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    let timeoutId;

    const schedule = () => {
      const delay = Math.random() * 6000 + 4000;
      timeoutId = setTimeout(() => {
        setShootingStars(buildShootingStars(2));
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

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
                    x: [0, star.driftX, 0],
                    y: [0, star.driftY, 0],
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
      {shootingStars.map((streak) => (
        <motion.span
          key={streak.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
          style={{
            top: `${streak.top}%`,
            left: `${streak.left}%`,
            width: `${streak.length}px`,
            rotate: streak.angle,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0, 1, 0],
                  x: [0, streak.travel],
                  y: [0, streak.travel * 0.4],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: streak.duration,
                  delay: streak.delay,
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
