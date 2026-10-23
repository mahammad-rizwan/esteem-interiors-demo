import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Link2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { THEMES } from '../data/themes';
import { LOGOS } from '../data/logos.generated';
import Logo from './Logo';

// Floating panel used during design review to switch theme + logo.
export default function Studio({ theme, logo, paired, setTheme, setLogo, setPaired }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('themes');
  const [copied, setCopied] = useState(false);
  const idx = THEMES.findIndex((t) => t.id === theme.id);
  const step = (d) => setTheme(THEMES[(idx + d + THEMES.length) % THEMES.length].id);

  const copy = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };

  return (
    <div className="studio" data-open={open}>
      <AnimatePresence>
        {open && (
          <motion.aside className="studio-panel" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: 0.25 }}>
            <header>
              <div>
                <b>Design Studio</b>
                <span>Theme {idx + 1}/8 · {theme.name}</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close studio"><X size={18} /></button>
            </header>
            <div className="studio-tabs" role="tablist">
              <button role="tab" aria-selected={tab === 'themes'} className={tab === 'themes' ? 'on' : ''} onClick={() => setTab('themes')}>Themes</button>
              <button role="tab" aria-selected={tab === 'logos'} className={tab === 'logos' ? 'on' : ''} onClick={() => setTab('logos')}>Logos</button>
            </div>
            {tab === 'themes' ? (
              <div className="studio-list">
                {THEMES.map((t, i) => (
                  <button key={t.id} className={`studio-theme ${t.id === theme.id ? 'on' : ''}`} onClick={() => setTheme(t.id)}>
                    <span className="sw">{t.swatch.map((c) => <i key={c} style={{ background: c }} />)}</span>
                    <span className="tx"><b>{i + 1}. {t.name}</b><small>{t.mood}</small></span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="studio-logos">
                <label className="studio-pair">
                  <input type="checkbox" checked={paired} onChange={(e) => setPaired(e.target.checked)} />
                  <span>Use each theme's matching logo</span>
                </label>
                <div className="studio-logo-grid">
                  {LOGOS.map((l, i) => (
                    <button key={l.id} className={l.id === logo ? 'on' : ''} onClick={() => setLogo(l.id)} title={l.name}
                      style={{ '--logo-ink': l.ink, '--logo-accent': l.accent }}>
                      <Logo id={l.id} icon />
                      <small>{i + 1}. {l.name}</small>
                    </button>
                  ))}
                </div>
                <a className="studio-dl" href="#logos" onClick={() => setOpen(false)}>Download logo files ↓</a>
              </div>
            )}
            <footer>
              <div className="studio-step">
                <button onClick={() => step(-1)} aria-label="Previous theme"><ChevronLeft size={18} /></button>
                <button onClick={() => step(1)} aria-label="Next theme"><ChevronRight size={18} /></button>
              </div>
              <button className="studio-share" onClick={copy}>{copied ? <><Check size={15} /> Link copied</> : <><Link2 size={15} /> Share this combo</>}</button>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
      {!open && (
        <div className="studio-fab">
          <button className="fab-step" onClick={() => step(-1)} aria-label="Previous theme"><ChevronLeft size={18} /></button>
          <button className="fab-main" onClick={() => setOpen(true)} aria-label="Open design studio">
            <Palette size={18} /> <span>Theme {idx + 1}/8 · {theme.name}</span>
          </button>
          <button className="fab-step" onClick={() => step(1)} aria-label="Next theme"><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
