import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useParallax } from "../hooks/useParallax";

const ProjectGrid = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const display = useMemo(() => items, [items]);
  const gridRef = useRef(null);
  const gridStyle = useParallax(gridRef, 24);

  return (
    <motion.div
      ref={gridRef}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      style={gridStyle}
    >
      {display.map((project, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.article
            key={project.title}
            onHoverStart={() => setActiveIndex(index)}
            className={`glass smooth flex h-full flex-col gap-4 rounded-3xl border p-6 ${
              isActive ? "border-accent-400/60" : "border-white/10"
            }`}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
              <span>{project.type}</span>
              <span className="text-accent-400">{project.year}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-lg text-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/70">{project.description}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
};

export default ProjectGrid;
