import { motion } from "framer-motion";
import { useRef } from "react";
import { useParallax } from "../hooks/useParallax";

const ParallaxSection = ({ children, className, id, distance = 56 }) => {
  const sectionRef = useRef(null);
  const style = useParallax(sectionRef, distance);

  return (
    <motion.section ref={sectionRef} id={id} className={className} style={style}>
      {children}
    </motion.section>
  );
};

export default ParallaxSection;
