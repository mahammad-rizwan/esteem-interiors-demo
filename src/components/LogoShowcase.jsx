import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { LOGOS } from '../data/logos.generated';
import { SectionHead, Reveal } from './ui';
import Logo from './Logo';
import { asset } from '../data/content';

const DOWNLOADS = [
  ['logo-color', 'Logo · Colour'],
  ['logo-reverse', 'Logo · Reverse'],
  ['icon-color', 'Icon · Colour'],
  ['icon-reverse', 'Icon · Reverse'],
];

function LogoCard({ l, i, current, onPick }) {
  const [fmt, setFmt] = useState('png');
  return (
    <Reveal delay={(i % 4) * 0.06} className={`logo-card ${current === l.id ? 'on' : ''}`}>
      <div className="logo-stage light" style={{ '--logo-ink': l.ink, '--logo-accent': l.accent }}>
        <Logo id={l.id} />
      </div>
      <div className="logo-stage dark" style={{ '--logo-ink': l.reverse, '--logo-accent': l.accent, background: l.ink }}>
        <Logo id={l.id} icon />
        <Logo id={l.id} />
      </div>
      <div className="logo-meta">
        <div className="logo-meta-top">
          <span className="logo-num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{l.name}</h3>
          <span className="logo-swatches"><i style={{ background: l.ink }} /><i style={{ background: l.accent }} /></span>
        </div>
        <p>{l.concept}</p>
        <div className="logo-actions">
          <button className={`use ${current === l.id ? 'on' : ''}`} onClick={() => onPick(l.id)}>
            {current === l.id ? <><Check size={15} /> In use</> : 'Preview on site'}
          </button>
          <div className="fmt" role="group" aria-label="File format">
            {['png', 'svg'].map((f) => <button key={f} className={fmt === f ? 'on' : ''} onClick={() => setFmt(f)}>{f.toUpperCase()}</button>)}
          </div>
        </div>
        <div className="logo-downloads">
          {DOWNLOADS.map(([k, label]) => (
            <a key={k} href={asset(`logos/${l.files[k]}.${fmt}`)} download><Download size={14} /> {label}</a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function LogoShowcase({ current, onPick }) {
  return (
    <section className="section logos" id="logos">
      <div className="container">
        <SectionHead index="✦" eyebrow="Brand identity — for review" title="Eight logo directions for Esteem."
          lead="Every mark is fully vector. Download print-ready SVG or high-resolution PNG (2400px) in colour and reverse, or click 'Preview on site' to see it in the header and footer." />
        <Reveal className="logo-all">
          <a className="btn btn-primary" href={asset('esteem-logos-all.zip')} download><span>Download all 8 logos (.zip)</span><Download size={18} /></a>
        </Reveal>
        <div className="logo-grid">
          {LOGOS.map((l, i) => <LogoCard key={l.id} l={l} i={i} current={current} onPick={onPick} />)}
        </div>
      </div>
    </section>
  );
}
