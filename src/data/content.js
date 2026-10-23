// All site copy, sourced from esteeminteriors.in and the project photo archive.

// Resolves a public/ file against Vite's base path (needed for GitHub Pages sub-folder hosting).
export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

export const COMPANY = {
  name: 'Esteem Interiors & Consultants',
  short: 'Esteem',
  tagline: 'Trust That Builds. Design That Inspires.',
  founded: 1996,
  founder: 'Mohammed Ameenuddin',
  city: 'Bengaluru',
  phone: '+91 93418 18210',
  phoneHref: 'tel:+919341818210',
  whatsapp: '918147367609',
  whatsappDisplay: '+91 81473 67609',
  email: 'enquire@esteeminteriors.in',
  address: '#7, Lalbagh Fort Rd, Doddamavalli, Mavalli, Bengaluru, Karnataka 560004',
  mapsHref: 'https://maps.google.com/?q=7+Lalbagh+Fort+Rd+Mavalli+Bengaluru+560004',
  social: {
    instagram: 'https://www.instagram.com/esteem.constructions/',
    youtube: 'https://www.youtube.com/@esteem.constructions',
    facebook: 'https://www.facebook.com/',
  },
};

export const HERO = {
  eyebrow: 'Interiors · Construction · Consulting — Since 1996',
  title: 'Transforming Spaces Into Extraordinary Experiences',
  lead: 'Premier interior design, construction and consulting services. We bring your vision to life with creativity, precision and excellence.',
};

export const STATS = [
  { value: 30, suffix: '+', label: 'Years of experience' },
  { value: 500, suffix: '+', label: 'Projects delivered' },
  { value: 15, suffix: '+', label: 'Leading brands served' },
  { value: 1996, suffix: '', label: 'Founded in Bengaluru' },
];

export const ABOUT = {
  title: 'Three decades of building trust, one space at a time.',
  body: [
    'Founded in 1996 and headquartered in Bengaluru, Esteem Interiors & Consultants has completed 500+ residential and commercial projects across South India. Our reputation rests on trust, technical expertise and an uncompromising commitment to quality.',
    `Under the leadership of our founder, Mr. ${'Mohammed Ameenuddin'}, Esteem has earned the confidence of leading national and international brands — from automotive showrooms and corporate offices to restaurants, retail and private homes.`,
  ],
  points: [
    'End-to-end solutions, from design to execution',
    'In-house factory for custom interiors & furniture',
    'Commitment to quality, timelines & transparency',
    'On-time delivery with professional project management',
  ],
};

export const SERVICES = [
  { icon: 'PenTool', title: 'Interior Design', text: 'Bespoke design that reflects your personal style and the way you actually live and work.' },
  { icon: 'Home', title: 'Residential Interiors', text: 'Apartments, villas and independent homes, crafted with a deeply personal approach.' },
  { icon: 'Building2', title: 'Commercial Interiors', text: 'Functional, brand-true spaces for offices, showrooms, retail and hospitality.' },
  { icon: 'KeyRound', title: 'Turnkey Projects', text: 'One team from concept to handover, so you get a single point of accountability.' },
  { icon: 'HardHat', title: 'Construction & Renovation', text: 'Quality civil, structural and renovation work that realises the architectural vision.' },
  { icon: 'Compass', title: 'Consulting', text: 'Expert guidance on space planning, materials and budgets so you can decide with confidence.' },
];

export const SPECIALTIES = [
  'Automotive Showrooms', 'Corporate Offices', 'Restaurants & Cafés', 'Retail Stores',
  'Luxury Residences', 'Space Planning', '3D Visualisation', 'Custom Furniture',
];

const img = (slug, ids) => ids.map((n) => ({ src: asset(`img/${slug}/${n}.webp`), md: asset(`img/${slug}/${n}-md.webp`), sm: asset(`img/${slug}/${n}-sm.webp`) }));

export const PROJECTS = [
  {
    id: 'pizza-hsr',
    title: 'The Pizza Bakery',
    location: 'HSR Layout, Bengaluru',
    category: 'Hospitality',
    summary: 'A Neapolitan-inspired bakery-restaurant: hand-finished timber panelling, arched niches, rattan pendants, monochrome stripe flooring and tiled wood-fired ovens.',
    images: img('pizza-bakery-hsr', ['28', '37', '29', '30', '16', '22', '06', '04', '46', '35', '41', '20', '27', '21', '49', '39']),
  },
  {
    id: 'pizza-koramangala',
    title: 'The Pizza Bakery',
    location: 'Koramangala, Bengaluru',
    category: 'Hospitality',
    summary: 'A double-height trussed dining hall with Mona Lisa mural arches, a show-kitchen counter, hand-drawn city murals and a leafy terrace.',
    images: img('pizza-bakery-koramangala', ['33', '34', '39', '23', '09', '02', '26', '36', '01', '25', '31', '06']),
  },
  {
    id: 'hyundai-rajajinagar',
    title: 'Blue Hyundai',
    location: 'Rajajinagar, Bengaluru',
    category: 'Automotive',
    summary: 'A multi-level dealership: oak-clad display bays, customer lounges, an accessories wall and glass-partitioned sales offices.',
    images: img('hyundai-rajajinagar', ['01', '02', '05', '08', '11', '19', '23', '29', '22']),
  },
  {
    id: 'hyundai-hesarghatta',
    title: 'Blue Hyundai',
    location: 'Hesarghatta, Bengaluru',
    category: 'Automotive',
    summary: 'A bright, brand-compliant showroom with timber feature walls, a delivery lounge, frameless-glass cabins and a reception pod.',
    images: img('hyundai-hesarghatta', ['01', '05', '07', '08', '15', '23', '24', '19']),
  },
];

// A few hero-worthy frames, used by the hero sliders and mosaics.
export const HERO_IMAGES = [
  PROJECTS[0].images[0], PROJECTS[1].images[0], PROJECTS[2].images[0], PROJECTS[0].images[1],
  PROJECTS[3].images[0], PROJECTS[1].images[2],
];

export const PROCESS = [
  { title: 'Consultation', text: 'A detailed conversation about your goals, site, lifestyle and budget.' },
  { title: 'Space Planning & Concept', text: 'Layouts, mood boards and 3D visualisation that bring the idea into focus.' },
  { title: 'Materials, Budget & Timeline', text: 'Itemised proposals, finalised specifications and a schedule you can hold us to.' },
  { title: 'Execution & Handover', text: 'In-house manufacturing, site supervision, regular progress updates and on-time handover.' },
];

export const CLIENTS = [
  'Mercedes-Benz', 'Hyundai', 'Kia', 'Toyota', 'Honda', 'Škoda', 'Mahindra', 'Tata Motors',
  'Nexa', 'Ford', 'Ather Energy', 'Reebok', "Levi's", 'Nokia', 'The Pizza Bakery',
];

export const FAQS = [
  { q: 'What types of projects do you handle?', a: 'Residential, commercial, hospitality, automotive and turnkey projects — from apartments and villas to showrooms, offices, restaurants and retail.' },
  { q: 'Do you provide turnkey project solutions?', a: 'Yes. We handle everything from concept and design through construction, interiors and final handover, all under one roof.' },
  { q: 'Do you have your own factory?', a: 'Yes. We manufacture custom interiors and furniture in-house, which gives us tighter control over quality, finish, fit and timelines.' },
  { q: 'How long does a residential interior project take?', a: 'It depends on scope. Apartments and villas typically take anywhere from a few weeks to a few months, and we share a detailed schedule before work begins.' },
  { q: 'Can you work within my budget?', a: 'Absolutely. We align design, materials and scope to your budget and are upfront about what is feasible.' },
  { q: 'How is your pricing structured?', a: 'Pricing is based on scope, material specifications and complexity. Our proposals itemise all major costs so there are no surprises.' },
  { q: 'How do you ensure quality?', a: 'Standardised processes, regular site inspections and experienced in-house teams at every stage.' },
];

export const PROJECT_TYPES = ['2 BHK', '3 BHK', 'Villa', 'Office', 'Showroom', 'Restaurant / Café', 'Retail', 'Other'];

export const NAV = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

// Responsive <img> props: phones get the 760/1200px files, desktops the 1800px one.
export const srcset = (im, sizes = '100vw') => ({ src: im.src, srcSet: `${im.sm} 760w, ${im.md} 1200w, ${im.src} 1800w`, sizes });
