import { useReducedMotion, useScroll, useTransform } from "framer-motion";

export const useParallax = (targetRef, distance = 50, opacityMin = 0.6) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [opacityMin, 1, 0.9],
  );

  if (prefersReducedMotion) {
    return {};
  }

  return { y, opacity };
};
