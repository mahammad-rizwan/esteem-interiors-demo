import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenTool, Home, Building2, KeyRound, HardHat, Compass, ArrowUpRight, Check, X, ChevronLeft, ChevronRight,
  Plus, Phone, Mail, MapPin, MessageCircle, Send,
} from 'lucide-react';
import { Instagram, Youtube, Facebook } from './BrandIcons';
import {
  srcset, ABOUT, STATS, SERVICES, SPECIALTIES, PROJECTS, PROCESS, CLIENTS, FAQS, COMPANY, PROJECT_TYPES, NAV,
} from '../data/content';
import { Reveal, SectionHead, CountUp, Button } from './ui';
import Logo from './Logo';

const ICONS = { PenTool, Home, Building2, KeyRound, HardHat, Compass };

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div className="about-media">
          <Reveal className="about-img about-img-1"><img {...srcset(PROJECTS[0].images[4], '(max-width: 900px) 90vw, 40vw')} alt="Timber-panelled dining hall with Mona Lisa murals" loading="lazy" /></Reveal>
          <Reveal className="about-img about-img-2" delay={0.15}><img src={PROJECTS[2].images[3].sm} alt="Customer lounge at Blue Hyundai Rajajinagar" loading="lazy" /></Reveal>
          <Reveal className="about-since" delay={0.3}><b>1996</b><span>Building since</span></Reveal>
        </div>
        <div className="about-copy">
          <SectionHead index="01" eyebrow="About Esteem" title={ABOUT.title} />
          {ABOUT.body.map((p, i) => <Reveal key={i} delay={0.1 + i * 0.1}><p className="body-lg">{p}</p></Reveal>)}
          <Reveal delay={0.3}>
            <ul className="checklist">
              {ABOUT.points.map((p) => <li key={p}><Check size={18} /> {p}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.4} className="about-sign">
            <span className="sign-name">{COMPANY.founder}</span>
            <span className="sign-role">Founder, Esteem Interiors & Consultants</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="stat">
            <b className="stat-value"><CountUp to={s.value} suffix={s.suffix} /></b>
            <span className="stat-label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="services-head">
          <SectionHead index="02" eyebrow="What we do" title="Design, build and consult — under one roof." />
          <Reveal className="services-intro" delay={0.1}>
            <p>From the first sketch to the final coat of polish, one accountable team carries your project, backed by our own manufacturing unit.</p>
          </Reveal>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const I = ICONS[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="service">
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="service-icon"><I size={26} strokeWidth={1.5} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a href="#contact" className="service-link" aria-label={`Enquire about ${s.title}`}><ArrowUpRight size={20} /></a>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="specialties">
          {SPECIALTIES.map((s) => <span key={s}>{s}</span>)}
        </Reveal>
      </div>
    </section>
  );
}

function Lightbox({ project, start, onClose }) {
  const [i, setI] = useState(start);
  const n = project.images.length;
  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n]);
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [go, onClose]);
  return (
    <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <div><b>{project.title}</b> <span>{project.location}</span></div>
        <span className="lb-count">{i + 1} / {n}</span>
        <button onClick={onClose} aria-label="Close"><X /></button>
      </div>
      <AnimatePresence mode="wait">
        <motion.img key={i} {...srcset(project.images[i])} alt={`${project.title} — photo ${i + 1}`} className="lb-img"
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
          onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }} />
      </AnimatePresence>
      <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous"><ChevronLeft /></button>
      <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next"><ChevronRight /></button>
      <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
        {project.images.map((im, k) => (
          <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)}><img src={im.sm} alt="" /></button>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const cats = ['All', ...new Set(PROJECTS.map((p) => p.category))];
  const list = PROJECTS.filter((p) => filter === 'All' || p.category === filter);
  const strip = PROJECTS.flatMap((p) => p.images.slice(1, 5).map((im) => ({ ...im, p })));

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="projects-head">
          <SectionHead index="03" eyebrow="Selected work" title="Spaces we've brought to life." />
          <Reveal className="filters" delay={0.1}>
            {cats.map((c) => <button key={c} className={c === filter ? 'on' : ''} onClick={() => setFilter(c)}>{c}</button>)}
          </Reveal>
        </div>
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {list.map((p, i) => (
              <motion.article layout key={p.id} className={`project p${i}`}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}>
                <button className="project-media" onClick={() => setOpen({ p, i: 0 })} aria-label={`Open ${p.title} ${p.location} gallery`}>
                  <img {...srcset(p.images[0], '(max-width: 800px) 100vw, 55vw')} alt={`${p.title}, ${p.location}`} loading="lazy" />
                  <span className="project-count">{p.images.length} photos <Plus size={14} /></span>
                </button>
                <div className="project-info">
                  <span className="project-cat">{p.category} · {p.location}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="gallery-strip" aria-label="More project photos">
        <div className="gallery-track">
          {[...strip, ...strip].map((im, k) => (
            <button key={k} onClick={() => setOpen({ p: im.p, i: im.p.images.findIndex((x) => x.src === im.src) })} aria-label={`${im.p.title} photo`}>
              <img src={im.sm} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <Lightbox project={open.p} start={open.i} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <SectionHead index="04" eyebrow="How we work" title="A clear path from first call to handover." align="center" />
        <ol className="process-list">
          {PROCESS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="step">
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Clients() {
  return (
    <section className="clients">
      <div className="container"><p className="clients-label">Trusted by leading national & international brands</p></div>
      <div className="marquee">
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS].map((c, i) => <span key={i}>{c}<i>✦</i></span>)}
        </div>
      </div>
    </section>
  );
}

export function Consultation() {
  const [form, setForm] = useState({ name: '', phone: '', type: PROJECT_TYPES[0], message: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const text = `Hello Esteem Interiors! I'd like a free design consultation.\n\nName: ${form.name}\nPhone: ${form.phone}\nProject: ${form.type}\n${form.message ? `Details: ${form.message}` : ''}`;
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };
  return (
    <section className="section consult" id="contact">
      <div className="consult-bg"><img {...srcset(PROJECTS[0].images[2])} alt="" loading="lazy" /></div>
      <div className="container consult-grid">
        <div className="consult-copy">
          <SectionHead index="05" eyebrow="Let's talk" title="Book your free design consultation." />
          <Reveal delay={0.1}><p className="body-lg">Tell us about your space. We'll get back to you with ideas, an honest view of budget and a clear plan.</p></Reveal>
          <Reveal delay={0.2} className="contact-list">
            <a href={COMPANY.phoneHref}><Phone size={18} /> {COMPANY.phone}</a>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> {COMPANY.whatsappDisplay}</a>
            <a href={`mailto:${COMPANY.email}`}><Mail size={18} /> {COMPANY.email}</a>
            <a href={COMPANY.mapsHref} target="_blank" rel="noreferrer"><MapPin size={18} /> {COMPANY.address}</a>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="consult-card">
          <form onSubmit={submit}>
            <label><span>Your name</span><input required value={form.name} onChange={set('name')} placeholder="Full name" autoComplete="name" /></label>
            <label><span>Phone</span><input required value={form.phone} onChange={set('phone')} placeholder="+91" inputMode="tel" autoComplete="tel" /></label>
            <fieldset>
              <legend>Project type</legend>
              <div className="pills">
                {PROJECT_TYPES.map((t) => (
                  <button type="button" key={t} className={form.type === t ? 'on' : ''} onClick={() => setForm({ ...form, type: t })}>{t}</button>
                ))}
              </div>
            </fieldset>
            <label><span>Tell us more (optional)</span><textarea rows={3} value={form.message} onChange={set('message')} placeholder="Location, size, timeline, budget…" /></label>
            <button className="btn btn-primary btn-block" type="submit"><span>Send via WhatsApp</span><Send size={18} /></button>
            <p className="form-note">Opens WhatsApp with your details pre-filled. No spam, ever.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <SectionHead index="06" eyebrow="FAQ" title="Questions, answered." lead="Still curious? Call us. We're happy to talk through your project." />
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04} className={`faq-item ${open === i ? 'on' : ''}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span><Plus className="faq-icon" size={20} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ logo }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <h2>Let's build something <em>remarkable</em>.</h2>
          <Button href="#contact" icon={ArrowUpRight}>Start a project</Button>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo id={logo} />
            <p>{COMPANY.tagline}</p>
            <div className="socials">
              <a href={COMPANY.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={COMPANY.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
              <a href={COMPANY.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.map((s) => <a key={s.title} href="#services">{s.title}</a>)}
          </div>
          <div>
            <h4>Visit</h4>
            <p>{COMPANY.address}</p>
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>Bengaluru · Since 1996</span>
        </div>
      </div>
    </footer>
  );
}
