import { useEffect, useLayoutEffect, useState } from 'react';
import { THEMES, themeById } from './data/themes';
import { LOGOS } from './data/logos.generated';
import { asset } from './data/content';
import Nav, { MobileBar } from './components/Nav';
import Hero from './components/Hero';
import { About, Stats, Services, Projects, Process, Clients, Consultation, Faq, Footer } from './components/Sections';
import LogoShowcase from './components/LogoShowcase';
import Studio from './components/Studio';

const readParams = () => {
  const p = new URLSearchParams(window.location.search);
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('esteem-studio') || '{}'); } catch { /* storage unavailable */ }
  const theme = themeById(p.get('theme') || saved.theme).id;
  const logoParam = p.get('logo') || saved.logo;
  const logo = LOGOS.some((l) => l.id === logoParam) ? logoParam : themeById(theme).logo;
  return { theme, logo, paired: p.get('logo') ? false : saved.paired ?? !logoParam };
};

function useFonts(theme) {
  useEffect(() => {
    const id = `font-${theme.id}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${theme.fonts}&display=swap`;
    document.head.appendChild(link);
  }, [theme]);
}

export default function App() {
  const [state, setState] = useState(readParams);
  const theme = themeById(state.theme);
  const logo = state.paired ? theme.logo : state.logo;
  useFonts(theme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme.id;
    document.documentElement.dataset.dark = theme.dark ? 'true' : 'false';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.swatch[0]);
    const fav = document.getElementById('favicon');
    if (fav) fav.href = asset(`logos/esteem-${logo}-icon-color.svg`);
  }, [theme, logo]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme.id);
    url.searchParams.set('logo', logo);
    window.history.replaceState(null, '', url);
    try { localStorage.setItem('esteem-studio', JSON.stringify({ ...state })); } catch { /* storage unavailable */ }
  }, [theme, logo, state]);

  // Preload every theme's fonts once idle, so switching feels instant.
  useEffect(() => {
    const t = setTimeout(() => THEMES.forEach((th) => {
      const l = document.createElement('link');
      l.rel = 'preload'; l.as = 'style';
      l.href = `https://fonts.googleapis.com/css2?${th.fonts}&display=swap`;
      document.head.appendChild(l);
    }), 2500);
    return () => clearTimeout(t);
  }, []);

  const api = {
    theme, logo, paired: state.paired,
    setTheme: (id) => setState((s) => ({ ...s, theme: id })),
    setLogo: (id) => setState((s) => ({ ...s, logo: id, paired: false })),
    setPaired: (paired) => setState((s) => ({ ...s, paired, logo: paired ? themeById(s.theme).logo : s.logo })),
  };

  return (
    <div className={`site hero-${theme.hero}`} key={theme.id}>
      <Nav logo={logo} />
      <main>
        <Hero theme={theme} logo={logo} />
        <About />
        <Stats />
        <Services />
        <Projects />
        <Process />
        <Clients />
        <Consultation />
        <Faq />
        <LogoShowcase current={logo} onPick={api.setLogo} />
      </main>
      <Footer logo={logo} />
      <MobileBar />
      <Studio {...api} />
    </div>
  );
}
