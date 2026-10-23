import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDownRight, MessageCircle } from 'lucide-react';
import { HERO, HERO_IMAGES, COMPANY, STATS, PROJECTS, srcset } from '../data/content';
import { Button } from './ui';
import Logo from './Logo';

const ease = [0.22, 1, 0.36, 1];
const rise = (d = 0) => ({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease } });

function useSlides(n, ms = 5500) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms]);
  return [i, setI];
}

const Title = ({ className = 'hero-title' }) => (
  <motion.h1 className={className} {...rise(0.15)}>
    Transforming Spaces Into <em>Extraordinary</em> Experiences
  </motion.h1>
);

const Ctas = ({ d = 0.45 }) => (
  <motion.div className="hero-ctas" {...rise(d)}>
    <Button href="#contact" icon={ArrowRight}>Book a free consultation</Button>
    <Button href="#projects" variant="ghost">View our work</Button>
  </motion.div>
);

function Slides({ images = HERO_IMAGES, index }) {
  return (
    <div className="hero-slides" aria-hidden="true">
      <AnimatePresence>
        <motion.img
          key={index}
          {...srcset(images[index])}
          alt=""
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: 'linear' } }}
        />
      </AnimatePresence>
    </div>
  );
}

/* 1 — Noir & Gold: cinematic full-bleed slider */
function Cinema() {
  const [i, setI] = useSlides(HERO_IMAGES.length);
  return (
    <section className="hero hero--cinema" id="top">
      <Slides index={i} />
      <div className="hero-shade" />
      <div className="container hero-center">
        <motion.p className="hero-eyebrow" {...rise(0)}><span />{HERO.eyebrow}<span /></motion.p>
        <Title />
        <motion.p className="hero-lead" {...rise(0.3)}>{HERO.lead}</motion.p>
        <Ctas />
      </div>
      <div className="hero-dots container">
        {HERO_IMAGES.map((_, k) => (
          <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`}>
            <span>{String(k + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
      <a href="#about" className="hero-scroll">Scroll</a>
    </section>
  );
}

/* 2 — Blueprint: drafting-table split */
function Blueprint() {
  const [i] = useSlides(4, 4500);
  const imgs = [PROJECTS[2].images[0], PROJECTS[0].images[0], PROJECTS[3].images[0], PROJECTS[1].images[0]];
  return (
    <section className="hero hero--blueprint" id="top">
      <div className="bp-grid" />
      <div className="container bp-wrap">
        <div className="bp-copy">
          <motion.p className="mono-tag" {...rise(0)}>[ 01 ] EST. 1996 — BENGALURU, IN</motion.p>
          <Title />
          <motion.p className="hero-lead" {...rise(0.3)}>{HERO.lead}</motion.p>
          <Ctas />
          <motion.dl className="bp-specs" {...rise(0.6)}>
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label}><dt>{s.label}</dt><dd>{s.value}{s.suffix}</dd></div>
            ))}
          </motion.dl>
        </div>
        <motion.div className="bp-figure" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease }}>
          <div className="bp-frame">
            <Slides images={imgs} index={i} />
            <i className="c tl" /><i className="c tr" /><i className="c bl" /><i className="c br" />
          </div>
          <div className="bp-dim bp-dim-x"><span>DESIGN → BUILD → HANDOVER</span></div>
          <div className="bp-dim bp-dim-y"><span>SINCE 1996</span></div>
          <p className="bp-caption mono-tag">FIG. {String(i + 1).padStart(2, '0')} — SELECTED WORK</p>
        </motion.div>
      </div>
    </section>
  );
}

/* 3 — Terracotta: arched windows */
function Arch() {
  return (
    <section className="hero hero--arch" id="top">
      <div className="container arch-wrap">
        <div className="arch-copy">
          <motion.p className="hero-eyebrow" {...rise(0)}>{COMPANY.tagline}</motion.p>
          <Title />
          <motion.p className="hero-lead" {...rise(0.3)}>{HERO.lead}</motion.p>
          <Ctas />
        </div>
        <div className="arch-art">
          <motion.div className="arch arch-a" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }}>
            <img {...srcset(PROJECTS[0].images[1], '(max-width: 900px) 60vw, 30vw')} alt="Arched timber dining nook, The Pizza Bakery HSR" />
          </motion.div>
          <motion.div className="arch arch-b" initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease }}>
            <img {...srcset(PROJECTS[1].images[0], '(max-width: 900px) 45vw, 22vw')} alt="Mural arches at The Pizza Bakery Koramangala" />
          </motion.div>
          <div className="arch-badge">
            <svg viewBox="0 0 200 200"><defs><path id="circ" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" /></defs>
              <text><textPath href="#circ">CRAFTED IN BENGALURU · SINCE 1996 · </textPath></text></svg>
            <span>30+<small>years</small></span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4 — Concrete: massive type, hazard ticker */
function Brutal() {
  return (
    <section className="hero hero--brutal" id="top">
      <div className="container">
        <motion.p className="brutal-meta" {...rise(0)}><span>EST. 1996</span><span>INTERIORS / CONSTRUCTION / CONSULTING</span><span>BENGALURU</span></motion.p>
        <h1 className="brutal-title">
          <motion.span {...rise(0.1)}>Trust that</motion.span>
          <motion.span {...rise(0.2)} className="outline">builds.</motion.span>
          <motion.span {...rise(0.3)}>Design that</motion.span>
          <motion.span {...rise(0.4)} className="accent">inspires.</motion.span>
        </h1>
        <div className="brutal-row">
          <motion.p className="hero-lead" {...rise(0.5)}>{HERO.lead}</motion.p>
          <Ctas d={0.6} />
        </div>
      </div>
      <motion.div className="brutal-strip" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.4, delay: 0.3, ease }}>
        {[PROJECTS[2].images[0], PROJECTS[0].images[5], PROJECTS[1].images[0], PROJECTS[3].images[1]].map((im, k) => (
          <img key={k} src={im.sm} alt="" />
        ))}
      </motion.div>
      <div className="hazard"><div className="hazard-track">
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k}>500+ PROJECTS ✦ 30+ YEARS ✦ TURNKEY EXECUTION ✦ IN-HOUSE FACTORY ✦ SHOWROOMS ✦ OFFICES ✦ RESTAURANTS ✦ HOMES ✦&nbsp;</span>
        ))}
      </div></div>
    </section>
  );
}

/* 5 — Scandi: calm centred type + staggered mosaic */
function Mosaic() {
  const imgs = [PROJECTS[3].images[1], PROJECTS[0].images[0], PROJECTS[2].images[2]];
  return (
    <section className="hero hero--mosaic" id="top">
      <div className="container mosaic-copy">
        <motion.p className="hero-eyebrow" {...rise(0)}>{HERO.eyebrow}</motion.p>
        <Title />
        <motion.p className="hero-lead" {...rise(0.3)}>{HERO.lead}</motion.p>
        <Ctas />
      </div>
      <div className="mosaic-row container">
        {imgs.map((im, k) => (
          <motion.figure key={k} className={`m m${k}`} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 + k * 0.15, ease }}>
            <img {...srcset(im, '(max-width: 700px) 50vw, 33vw')} alt="" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* 6 — Emerald Heritage: framed full-bleed with seal */
function Heritage({ logo }) {
  const [i] = useSlides(HERO_IMAGES.length, 6000);
  return (
    <section className="hero hero--heritage" id="top">
      <Slides index={i} />
      <div className="hero-shade" />
      <div className="heritage-frame" />
      <div className="container heritage-copy">
        <motion.p className="hero-eyebrow" {...rise(0)}>Est. 1996 · Bengaluru</motion.p>
        <Title />
        <motion.p className="hero-lead" {...rise(0.3)}>{HERO.lead}</motion.p>
        <Ctas />
      </div>
      <motion.div className="heritage-seal" initial={{ opacity: 0, rotate: -40 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 1.6, ease }}>
        <Logo id={logo} icon />
      </motion.div>
    </section>
  );
}

/* 7 — Editorial: magazine cover */
function Magazine() {
  return (
    <section className="hero hero--magazine" id="top">
      <div className="container">
        <motion.div className="mag-strip" {...rise(0)}>
          <span>Vol. 30</span><span>Interiors · Construction · Consulting</span><span>Bengaluru, 1996 — {new Date().getFullYear()}</span>
        </motion.div>
        <motion.h1 className="mag-masthead" initial={{ opacity: 0, letterSpacing: '0.2em' }} animate={{ opacity: 1, letterSpacing: '-0.04em' }} transition={{ duration: 1.4, ease }}>
          Esteem<span className="dot">.</span>
        </motion.h1>
        <div className="mag-grid">
          <motion.figure className="mag-main" {...rise(0.3)}>
            <img {...srcset(PROJECTS[1].images[0], '(max-width: 860px) 100vw, 60vw')} alt="The Pizza Bakery, Koramangala" />
            <figcaption><b>Cover story</b> — The Pizza Bakery, Koramangala</figcaption>
          </motion.figure>
          <div className="mag-side">
            <motion.p className="mag-kicker" {...rise(0.35)}>The issue</motion.p>
            <motion.h2 className="mag-title" {...rise(0.4)}>Transforming spaces into <em>extraordinary</em> experiences.</motion.h2>
            <motion.p className="hero-lead" {...rise(0.5)}>{HERO.lead}</motion.p>
            <Ctas d={0.6} />
            <motion.figure className="mag-small" {...rise(0.7)}>
              <img src={PROJECTS[2].images[0].sm} alt="Blue Hyundai, Rajajinagar" />
              <figcaption>p. 14 — Blue Hyundai, Rajajinagar</figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 8 — Midnight Copper: glass UI over slider */
function Glass() {
  const [i, setI] = useSlides(HERO_IMAGES.length, 5000);
  return (
    <section className="hero hero--glass" id="top">
      <Slides index={i} />
      <div className="hero-shade" />
      <div className="glow g1" /><div className="glow g2" />
      <div className="container glass-wrap">
        <motion.div className="glass-card" initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.1, ease }}>
          <p className="hero-eyebrow"><span className="pulse" /> Now booking design consultations</p>
          <h1 className="hero-title">Transforming Spaces Into <em>Extraordinary</em> Experiences</h1>
          <p className="hero-lead">{HERO.lead}</p>
          <div className="hero-ctas">
            <Button href="#contact" icon={ArrowRight}>Start your project</Button>
            <Button href={`https://wa.me/${COMPANY.whatsapp}`} variant="ghost" icon={MessageCircle} target="_blank" rel="noreferrer">WhatsApp</Button>
          </div>
        </motion.div>
        <div className="glass-chips">
          {STATS.slice(0, 3).map((s, k) => (
            <motion.div key={s.label} className="chip" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.5 + k * 0.15, ease }}>
              <b>{s.value}{s.suffix}</b><span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="glass-progress container">
        {HERO_IMAGES.map((_, k) => <button key={k} onClick={() => setI(k)} className={k === i ? 'on' : ''} aria-label={`Slide ${k + 1}`}><i /></button>)}
        <ArrowDownRight className="glass-arrow" />
      </div>
    </section>
  );
}

const VARIANTS = { cinema: Cinema, blueprint: Blueprint, arch: Arch, brutal: Brutal, mosaic: Mosaic, heritage: Heritage, magazine: Magazine, glass: Glass };

export default function Hero({ theme, logo }) {
  const V = VARIANTS[theme.hero] ?? Cinema;
  return <V logo={logo} />;
}
