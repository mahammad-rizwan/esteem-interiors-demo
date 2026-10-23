import { LOGOS } from '../data/logos.generated';

export const logoById = (id) => LOGOS.find((l) => l.id === id) ?? LOGOS[0];

// Inline SVG logo, coloured by --logo-ink / --logo-accent from the surrounding CSS.
export default function Logo({ id, icon = false, className = '', title }) {
  const l = logoById(id);
  const w = icon ? l.iconW : l.w;
  const h = icon ? l.iconH : l.h;
  return (
    <svg
      className={`logo logo-${l.id} ${icon ? 'logo-icon' : ''} ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={title ?? 'Esteem Interiors & Consultants'}
      dangerouslySetInnerHTML={{ __html: icon ? l.iconBody : l.body }}
    />
  );
}
