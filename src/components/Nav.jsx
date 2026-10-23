import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import Logo from './Logo';
import { NAV, COMPANY } from '../data/content';

export default function Nav({ logo }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="nav-inner container">
          <a href="#top" className="nav-logo" aria-label="Esteem Interiors & Consultants — home" onClick={() => setOpen(false)}>
            <Logo id={logo} />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <a className="nav-cta" href={COMPANY.phoneHref} aria-label={`Call ${COMPANY.phone}`}><Phone size={16} /> <span>{COMPANY.phone}</span></a>
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile menu lives outside the header so the header's backdrop-filter can't trap it. */}
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <nav aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.a key={n.href} href={n.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <small>{String(i + 1).padStart(2, '0')}</small>{n.label}
                </motion.a>
              ))}
            </nav>
            <motion.div className="mobile-menu-foot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <a className="btn btn-primary btn-block" href={COMPANY.phoneHref}><span>Call {COMPANY.phone}</span><Phone size={18} /></a>
              <a className="btn btn-ghost btn-block" href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer"><span>WhatsApp us</span><MessageCircle size={18} /></a>
              <p>{COMPANY.address}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Thumb-reach action bar shown on phones once the visitor scrolls past the hero.
export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className={`mobile-bar ${show ? 'show' : ''}`} aria-hidden={!show}>
      <a href={COMPANY.phoneHref} tabIndex={show ? 0 : -1}><Phone size={19} /><span>Call</span></a>
      <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" tabIndex={show ? 0 : -1}><MessageCircle size={19} /><span>WhatsApp</span></a>
      <a href="#contact" className="primary" tabIndex={show ? 0 : -1}><CalendarCheck size={19} /><span>Free consultation</span></a>
    </div>
  );
}
