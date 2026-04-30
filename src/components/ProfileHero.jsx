import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { useParallax } from "../hooks/useParallax";
import Reveal from "./Reveal";

const ProfileHero = ({ onSecretTap, secretActive }) => {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const statsRef = useRef(null);
  const rotateXTo = useRef(null);
  const rotateYTo = useRef(null);
  const shineXTo = useRef(null);
  const shineYTo = useRef(null);
  const [pulse, setPulse] = useState(false);
  const sectionStyle = useParallax(sectionRef, 60);
  const cardStyle = useParallax(cardRef, 32);
  const statsStyle = useParallax(statsRef, 26, 0.7);
  const highlights = t("hero.highlights");
  const profileImage = "/assets/profile/brayan-ulises.jpg";
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1.08, 0.96]);

  const stats = useMemo(
    () => [
      { label: t("hero.stats.experience"), value: 3 },
      { label: t("hero.stats.clients"), value: 3 },
      { label: t("hero.stats.projects"), value: 6 },
      { label: t("hero.stats.awards"), value: 2 },
    ],
    [t],
  );

  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return undefined;

    const cardNode = cardRef.current;
    const shineNode = shineRef.current;

    gsap.set(cardNode, {
      transformPerspective: 950,
      transformStyle: "preserve-3d",
      willChange: "transform",
    });

    if (shineNode) {
      gsap.set(shineNode, { xPercent: -50, yPercent: -50, x: "50%", y: "50%" });
      shineXTo.current = gsap.quickTo(shineNode, "x", {
        duration: 0.28,
        ease: "power3.out",
      });
      shineYTo.current = gsap.quickTo(shineNode, "y", {
        duration: 0.28,
        ease: "power3.out",
      });
    }

    rotateXTo.current = gsap.quickTo(cardNode, "rotateX", {
      duration: 0.32,
      ease: "power3.out",
    });
    rotateYTo.current = gsap.quickTo(cardNode, "rotateY", {
      duration: 0.32,
      ease: "power3.out",
    });

    return () => {
      rotateXTo.current = null;
      rotateYTo.current = null;
      shineXTo.current = null;
      shineYTo.current = null;
      gsap.killTweensOf(cardNode);
      if (shineNode) gsap.killTweensOf(shineNode);
      gsap.set(cardNode, { clearProps: "willChange" });
    };
  }, [prefersReducedMotion]);

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
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    rotateXTo.current?.(y);
    rotateYTo.current?.(x);

    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    shineXTo.current?.(localX);
    shineYTo.current?.(localY);
  }, []);

  const handlePointerLeave = useCallback(() => {
    rotateXTo.current?.(0);
    rotateYTo.current?.(0);

    const node = cardRef.current;
    if (!node) return;
    shineXTo.current?.(node.clientWidth * 0.5);
    shineYTo.current?.(node.clientHeight * 0.5);
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
          <Reveal>
            <motion.div
              ref={cardRef}
              className="glass relative overflow-hidden rounded-[32px] p-6"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onDoubleClick={handlePulse}
              style={{ transformStyle: "preserve-3d", ...cardStyle }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-space-800 via-space-900 to-space-950">
                <div
                  ref={shineRef}
                  className="pointer-events-none absolute h-32 w-32 rounded-full bg-white/20 blur-2xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  role="img"
                  aria-label={t("hero.photoAlt")}
                  style={{ backgroundImage: `url(${profileImage})` }}
                />
                <motion.div
                  className="absolute -right-12 top-8 h-36 w-36 rounded-full border border-white/10 bg-white/5"
                  style={
                    prefersReducedMotion
                      ? {}
                      : { rotate: ringRotate, scale: ringScale }
                  }
                />
                <div
                  className={`absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70 ${
                    pulse ? "glow-ring" : ""
                  }`}
                  style={{ transform: "translateZ(28px)" }}
                >
                  Active
                </div>
                <div
                  className="absolute bottom-6 left-6 right-6 glass-light rounded-2xl p-4"
                  style={{ transform: "translateZ(38px)" }}
                >
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
              </div>
            </motion.div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal>
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
            </Reveal>
            <Reveal delay={0.05}>
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
            </Reveal>
            <Reveal delay={0.1}>
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
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="glass-light smooth rounded-2xl px-4 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div
                className={`glass-light smooth rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/60 ${
                  secretActive ? "glow-ring text-accent-400" : ""
                }`}
              >
                {secretActive ? t("hero.nebulaMode") : t("hero.openCollab")}
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1}>
          <motion.div
            ref={statsRef}
            className="glass smooth grid gap-4 rounded-3xl border border-white/10 p-6 sm:grid-cols-2 lg:grid-cols-4"
            style={statsStyle}
          >
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
          </motion.div>
        </Reveal>
      </div>
    </motion.section>
  );
};

export default ProfileHero;
