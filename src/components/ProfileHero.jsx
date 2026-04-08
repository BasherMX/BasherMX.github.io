import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { useParallax } from "../hooks/useParallax";

const ProfileHero = ({ onSecretTap, secretActive }) => {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(false);
  const sectionStyle = useParallax(sectionRef, 60);
  const cardStyle = useParallax(cardRef, 32);

  const stats = useMemo(
    () => [
      { label: t("hero.stats.experience"), value: 8 },
      { label: t("hero.stats.clients"), value: 32 },
      { label: t("hero.stats.projects"), value: 120 },
      { label: t("hero.stats.awards"), value: 6 },
    ],
    [t]
  );

  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    if (prefersReducedMotion) {
      setCounts(stats.map((stat) => stat.value));
      return;
    }

    let start = null;
    let raf = null;
    const duration = 1400;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCounts(stats.map((stat) => Math.floor(stat.value * progress)));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion, stats]);

  const handlePointerMove = useCallback((event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handlePulse = useCallback(() => {
    setPulse(true);
    if (onSecretTap) onSecretTap();
  }, [onSecretTap]);

  useEffect(() => {
    if (!pulse) return;
    const timer = setTimeout(() => setPulse(false), 1400);
    return () => clearTimeout(timer);
  }, [pulse]);

  return (
    <motion.section
      ref={sectionRef}
      id="perfil"
      className="px-6 pt-10 pb-16 sm:px-10 lg:px-16"
      style={sectionStyle}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.4fr] lg:items-center">
          <motion.div
            ref={cardRef}
            className="glass relative overflow-hidden rounded-[32px] p-6"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onDoubleClick={handlePulse}
            animate={{ rotateX: tilt.y, rotateY: tilt.x }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            style={{ transformStyle: "preserve-3d", ...cardStyle }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-space-800 via-space-900 to-space-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),rgba(5,4,10,0.1))]" />
              <div className="absolute inset-6 rounded-[24px] border border-white/10 bg-white/5" />
              <div
                className={`absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70 ${
                  pulse ? "glow-ring" : ""
                }`}
              >
                Active
              </div>
              <div className="absolute bottom-6 left-6 right-6 glass-light rounded-2xl p-4">
                <p className="text-sm text-white/70">
                  {t("hero.cardCaption")}
                </p>
              </div>
              <motion.div
                className="absolute -right-6 top-12 h-20 w-20 rounded-full border border-accent-400/40 bg-accent-500/20 blur-2xl"
                animate={
                  prefersReducedMotion ? undefined : { y: [0, -12, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }
              />
              <button
                type="button"
                onClick={handlePulse}
                className="absolute bottom-8 right-8 h-10 w-10 rounded-full border border-accent-400/50 bg-white/5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-400 smooth"
                aria-label="Hidden signal"
              >
                Tap
              </button>
            </div>
          </motion.div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.4em] text-white/50">
                {t("hero.greeting")}
              </span>
              <h1 className="font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                {t("hero.title")}
              </h1>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                {t("hero.bio")}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {t("hero.skills").map((item) => (
                <div
                  key={item}
                  className="glass-light smooth rounded-2xl px-4 py-3 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#proyectos"
                className="glass smooth rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                {t("hero.viewProjects")}
              </a>
              <a
                href="#contacto"
                className="smooth rounded-full border border-accent-400/60 bg-accent-500/10 px-6 py-3 text-sm font-semibold text-white"
              >
                {t("hero.directContact")}
              </a>
            </div>
            <div
              className={`glass-light smooth rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/60 ${
                secretActive ? "glow-ring text-accent-400" : ""
              }`}
            >
              {secretActive ? t("hero.nebulaMode") : t("hero.openCollab")}
            </div>
          </div>
        </div>
        <div className="glass smooth grid gap-4 rounded-3xl border border-white/10 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-heading text-2xl text-white">
                {counts[index]}+
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileHero;
