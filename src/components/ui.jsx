import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function SectionHead({ index, eyebrow, title, lead, align = 'left' }) {
  return (
    <Reveal className={`section-head align-${align}`}>
      <div className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" />
        <span className="eyebrow-text">{eyebrow}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

export function CountUp({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(to > 1900 ? to - 30 : 0);
  useEffect(() => {
    if (!inView) return;
    const from = to > 1900 ? to - 30 : 0;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Button({ href, children, variant = 'primary', icon: Icon, ...rest }) {
  return (
    <a className={`btn btn-${variant}`} href={href} {...rest}>
      <span>{children}</span>
      {Icon && <Icon size={18} strokeWidth={1.8} />}
    </a>
  );
}
