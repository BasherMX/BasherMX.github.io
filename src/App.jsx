import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Starfield from "./components/Starfield";
import TechCarousel from "./components/TechCarousel";
import ProjectGrid from "./components/ProjectGrid";
import ProfileHero from "./components/ProfileHero";
import ParallaxSection from "./components/ParallaxSection";
import { useI18n } from "./i18n";

const SectionHeading = ({ eyebrow, title, subtitle, align = "left" }) => (
  <div
    className={`flex flex-col gap-3 ${
      align === "center" ? "items-center text-center" : "items-start"
    }`}
  >
    <span className="text-xs uppercase tracking-[0.35em] text-accent-400">
      {eyebrow}
    </span>
    <div className="flex flex-col gap-2">
      <h2 className="font-heading text-2xl text-white sm:text-3xl">{title}</h2>
      <p className="text-sm text-white/70 sm:text-base">{subtitle}</p>
    </div>
  </div>
);

function App() {
  const { t, lang, toggle } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [easterMode, setEasterMode] = useState(false);
  const [signalUnlocked, setSignalUnlocked] = useState(false);
  const [signalClicks, setSignalClicks] = useState(0);
  const keyBuffer = useRef("");

  const navItems = useMemo(
    () => [
      { label: t("nav.profile"), href: "#perfil" },
      { label: t("nav.projects"), href: "#proyectos" },
      { label: t("nav.tech"), href: "#tecnologias" },
      { label: t("nav.contact"), href: "#contacto" },
    ],
    [t]
  );

  const projectYears = ["2024", "2023", "2023", "2022", "2022", "2021"];
  const projectTags = [
    ["UX Research", "UI Kit", "React", "Conversion"],
    ["Data Viz", "Design System", "Motion", "B2B"],
    ["Mobile", "UX Flow", "Prototype", "iOS"],
    ["Research", "UI", "Performance", "Marketing"],
    ["Brand", "Guidelines", "Tokens", "Story"],
    ["SaaS", "UX", "UI", "A11y"],
  ];

  const projects = useMemo(() => {
    const items = t("projects.items");
    return items.map((item, index) => ({
      ...item,
      year: projectYears[index],
      tags: projectTags[index],
    }));
  }, [t]);

  const techStack = useMemo(
    () => [
      { name: "React", short: "RC", role: "UI" },
      { name: "Vite", short: "VT", role: "Build" },
      { name: "Tailwind CSS", short: "TW", role: "Style" },
      { name: "Framer Motion", short: "FM", role: "Motion" },
      { name: "TypeScript", short: "TS", role: "Types" },
      { name: "Node.js", short: "ND", role: "API" },
      { name: "Figma", short: "FG", role: "Design" },
      { name: "Next.js", short: "NX", role: "Web" },
      { name: "PostCSS", short: "PC", role: "Tools" },
      { name: "Supabase", short: "SB", role: "Data" },
    ],
    []
  );

  const contactLinks = useMemo(
    () => [
      {
        label: t("contact.email"),
        value: "bashermx.dev@gmail.com",
        href: "mailto:bashermx.dev@gmail.com",
      },
      {
        label: "X",
        value: "@bashermx",
        href: "https://x.com/bashermx",
      },
      {
        label: t("contact.whatsApp"),
        value: t("contact.directChat"),
        href:
          "https://wa.me/4492777186?text=Hola%20me%20gustaria%20hablar%20de%20un%20proyecto",
      },
    ],
    [t]
  );

  const handleSignalClick = useCallback(() => {
    setSignalClicks((count) => {
      const next = count + 1;
      if (next >= 3) {
        setSignalUnlocked(true);
        return 0;
      }
      return next;
    });
  }, []);

  const handleSecretToggle = useCallback(() => {
    setEasterMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key.length !== 1) return;
      keyBuffer.current = (keyBuffer.current + key).slice(-5);
      if (keyBuffer.current === "orbit") {
        setEasterMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!signalUnlocked) return;
    const timer = setTimeout(() => setSignalUnlocked(false), 5000);
    return () => clearTimeout(timer);
  }, [signalUnlocked]);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  return (
    <div
      className={`min-h-screen text-white ${
        easterMode ? "nebula-on" : "space-bg"
      } font-body`}
    >
      <Starfield active={easterMode} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-6 pt-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="glass-light flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-accent-400">
                BM
              </div>
              <div className="hidden text-xs uppercase tracking-[0.4em] text-white/50 sm:block">
                Basher MX
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="smooth text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggle}
                className="glass-light smooth rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80"
                aria-label="Toggle language"
              >
                {lang === "en" ? "ES" : "EN"}
              </button>
              <button
                type="button"
                onClick={handleSignalClick}
                className={`relative h-3 w-3 rounded-full bg-accent-400/60 shadow-glow smooth ${
                  signalClicks ? "scale-110" : ""
                }`}
                aria-label="Signal beacon"
              >
                <span
                  className={`absolute inset-0 rounded-full ${
                    signalUnlocked ? "animate-ping bg-accent-400/70" : ""
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="glass-light smooth rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? t("nav.close") : t("nav.menu")}
              </button>
            </div>
          </div>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-light mt-4 flex flex-col gap-3 rounded-2xl p-4 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.3em] text-white/70"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          )}
          {signalUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-4 max-w-6xl"
            >
              <div className="glass-light rounded-2xl px-4 py-3 text-xs uppercase tracking-[0.3em] text-accent-400">
                {t("secret.hint")}
              </div>
            </motion.div>
          )}
        </header>
        <main className="flex flex-1 flex-col gap-16">
          <ProfileHero
            onSecretTap={handleSecretToggle}
            secretActive={easterMode}
          />
          <ParallaxSection id="proyectos" className="px-6 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
              <SectionHeading
                eyebrow={t("projects.eyebrow")}
                title={t("projects.title")}
                subtitle={t("projects.subtitle")}
              />
              <ProjectGrid items={projects} />
            </div>
          </ParallaxSection>
          <ParallaxSection id="tecnologias" className="px-6 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
              <SectionHeading
                eyebrow={t("tech.eyebrow")}
                title={t("tech.title")}
                subtitle={t("tech.subtitle")}
              />
              <TechCarousel items={techStack} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t("tech.cards").map((card) => (
                  <div
                    key={card.title}
                    className="glass-light smooth rounded-2xl p-5"
                  >
                    <h3 className="font-heading text-lg text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ParallaxSection>
          <ParallaxSection id="contacto" className="px-6 pb-20 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
              <SectionHeading
                eyebrow={t("contact.eyebrow")}
                title={t("contact.title")}
                subtitle={t("contact.subtitle")}
                align="center"
              />
              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div className="glass smooth rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-2xl text-white">
                      {t("contact.heading")}
                    </h3>
                    <p className="text-sm text-white/70 sm:text-base">
                      {t("contact.body")}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="mailto:bashermx.dev@gmail.com"
                        className="glass-light smooth rounded-full px-5 py-3 text-xs uppercase tracking-[0.3em] text-white"
                      >
                        {t("contact.sendEmail")}
                      </a>
                      <a
                        href="https://wa.me/4492777186?text=Hola%20me%20gustaria%20hablar%20de%20un%20proyecto"
                        className="smooth rounded-full border border-accent-400/60 bg-accent-500/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white"
                      >
                        {t("contact.openWhatsApp")}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {contactLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-light smooth flex items-center justify-between rounded-2xl px-5 py-4"
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                          {link.label}
                        </span>
                        <span className="text-sm text-white">{link.value}</span>
                      </div>
                      <span className="text-xs uppercase tracking-[0.3em] text-accent-400">
                        {t("contact.open")}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ParallaxSection>
        </main>
        <footer className="px-6 pb-10 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.3em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>Basher MX Portfolio</span>
            <div className="flex flex-wrap gap-4">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
