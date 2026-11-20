export interface NavLink {
  label: string;
  path: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  addressLines: string[];
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  mapUrl: string;
  hours: { days: string; time: string }[];
  socials: { label: string; short: string; url: string }[];
  admissions: string;
}

export interface Program {
  slug: string;
  title: string;
  category: ProgramCategory;
  tagline: string;
  description: string;
  longDescription: string;
  duration: string;
  schedule: string;
  ageGroup: string;
  level: string;
  fee: string;
  image: string;
  alt: string;
  outcomes: string[];
  featured?: boolean;
}

export type ProgramCategory =
  | 'Drawing'
  | 'Painting'
  | 'Digital'
  | 'Ceramics'
  | 'Printmaking'
  | 'Portfolio';

export interface Faculty {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  alt: string;
  specialisms: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  program: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  artist: string;
  medium: string;
  year: string;
  category: GalleryCategory;
  image: string;
  alt: string;
  ratio: 'portrait' | 'landscape' | 'square';
}

export type GalleryCategory =
  | 'Painting'
  | 'Drawing'
  | 'Ceramics'
  | 'Mixed media'
  | 'Mural';

export interface Faq {
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export interface Value {
  title: string;
  text: string;
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
}

export interface Step {
  number: string;
  title: string;
  text: string;
}

export const SITE: SiteConfig = {
  name: 'Artino Studio Art Academy',
  shortName: 'Artino Studio',
  legalName: 'Artino Studio Art Academy',
  tagline: 'Where imagination finds its craft.',
  description:
    'A studio-first art academy in Fort Kochi teaching drawing, painting, ceramics, printmaking, digital art and portfolio preparation to children, teens and adults.',
  url: 'https://artinostudio.academy',
  email: 'hello@artinostudio.academy',
  phone: '+91 98470 12345',
  phoneHref: '+919847012345',
  whatsapp: '919847012345',
  addressLines: ['14 Gallery Lane', 'Fort Kochi'],
  locality: 'Kochi',
  region: 'Kerala',
  postalCode: '682001',
  country: 'India',
  mapUrl: 'https://maps.google.com/?q=Fort+Kochi+Kerala+India',
  hours: [
    { days: 'Tuesday – Friday', time: '9:00 am – 7:00 pm' },
    { days: 'Saturday – Sunday', time: '9:00 am – 5:00 pm' },
    { days: 'Monday', time: 'Closed — studio reset' },
  ],
  socials: [
    { label: 'Instagram', short: 'IG', url: 'https://www.instagram.com/artinostudio' },
    { label: 'Facebook', short: 'FB', url: 'https://www.facebook.com/artinostudio' },
    { label: 'Pinterest', short: 'PIN', url: 'https://www.pinterest.com/artinostudio' },
    { label: 'YouTube', short: 'YT', url: 'https://www.youtube.com/@artinostudio' },
  ],
  admissions: 'Admissions open · Spring term 2026',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programmes', path: '/courses' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export const STATS: Stat[] = [
  { value: 12, suffix: '+', label: 'Years in the studio', note: 'A practice, not a promise.' },
  { value: 2400, suffix: '+', label: 'Students guided', note: 'Children, teens and adults.' },
  { value: 48, suffix: '', label: 'Term exhibitions', note: 'Every class ends on a wall.' },
  { value: 96, suffix: '%', label: 'Portfolio placements', note: 'Art school & design pathways.' },
];

export const PROGRAMS: Program[] = [
  {
    slug: 'foundation-drawing',
    title: 'Foundation Drawing',
    category: 'Drawing',
    tagline: 'Learn to see before you draw.',
    description:
      'A grounding in line, proportion, perspective and light — built through looking, measuring and a lot of honest marks.',
    longDescription:
      'Foundation Drawing is the table everyone starts at. Over twelve weeks we move from contour and gesture to measured proportion, one- and two-point perspective, and the quiet logic of light and shadow. Students keep a daily sketchbook, work from still life and life, and leave with a visual vocabulary they can carry into any medium.',
    duration: '12 weeks',
    schedule: 'Tue 4:30 pm · Sat 10 am',
    ageGroup: 'Ages 8 – 14',
    level: 'Beginner',
    fee: '₹8,400',
    image: 'images/sketchbook.jpg',
    alt: 'An open sketchbook, fountain pen and glasses on a wooden desk',
    outcomes: ['Contour, gesture & proportion', 'Perspective & spatial thinking', 'Value, light and form', 'A habit of daily drawing'],
    featured: true,
  },
  {
    slug: 'painting-colour',
    title: 'Painting & Colour',
    category: 'Painting',
    tagline: 'Colour is a language. Learn to speak it.',
    description:
      'Watercolour, acrylic and oil — mixed, layered and understood. A studio practice in colour theory, surface and expression.',
    longDescription:
      'This programme treats colour as a material and a language. Students learn to mix from a limited palette, understand temperature and harmony, and build paintings in layers — from transparent watercolour washes to opaque oil passages. Weekly critique helps each painter find a subject and a voice rather than a formula.',
    duration: '10 weeks',
    schedule: 'Wed 5 pm · Sun 11 am',
    ageGroup: 'Ages 10 – Adult',
    level: 'All levels',
    fee: '₹9,200',
    image: 'images/abstract-chromatic.jpg',
    alt: 'A richly textured abstract painting in yellow, orange, teal and red',
    outcomes: ['Colour mixing & theory', 'Watercolour, acrylic & oil', 'Composition & edge', 'Personal subject & voice'],
    featured: true,
  },
  {
    slug: 'digital-art',
    title: 'Digital Art & Illustration',
    category: 'Digital',
    tagline: 'A screen can hold a sketchbook too.',
    description:
      'Procreate and Photoshop fundamentals, character design, visual storytelling and a portfolio-ready illustration practice.',
    longDescription:
      'Digital Art & Illustration translates the studio habits of drawing into a screen-based practice. Students learn brush economy, value structure, colour scripting, composition for narrative, and a professional file workflow. The term closes with a short illustrated story and three portfolio pieces.',
    duration: '8 weeks',
    schedule: 'Thu 5:30 pm · Sat 2 pm',
    ageGroup: 'Ages 12 – Adult',
    level: 'Beginner +',
    fee: '₹8,900',
    image: 'images/designer-laptop.jpg',
    alt: 'A designer sketching on a tablet beside a laptop and flowers',
    outcomes: ['Procreate & Photoshop fluency', 'Character & concept design', 'Visual storytelling', 'A three-piece digital folio'],
    featured: true,
  },
  {
    slug: 'ceramics-sculpture',
    title: 'Ceramics & Sculpture',
    category: 'Ceramics',
    tagline: 'Make something that holds space.',
    description:
      'Hand-building, wheel throwing, surface and glaze. Clay teaches patience, weight and the beauty of an unrepeatable edge.',
    longDescription:
      'Working in stoneware, students learn pinch, coil and slab construction before moving to the wheel. We cover joining, drying, bisque firing, glazing and the small decisions that make a vessel feel resolved. The term ends with a fired collection and a group table display.',
    duration: '10 weeks',
    schedule: 'Fri 4 pm · Sun 9:30 am',
    ageGroup: 'Ages 9 – Adult',
    level: 'All levels',
    fee: '₹10,500',
    image: 'images/ceramics-vessels.jpg',
    alt: 'Three hand-thrown pale ceramic vessels with dried seed heads',
    outcomes: ['Hand-building & wheel throwing', 'Form, weight & proportion', 'Glazing & firing', 'A fired body of work'],
  },
  {
    slug: 'printmaking-mixed-media',
    title: 'Printmaking & Mixed Media',
    category: 'Printmaking',
    tagline: 'One image, many lives.',
    description:
      'Linocut, monotype, collagraph and collage — learning to think in layers, editions and happy accidents.',
    longDescription:
      'Printmaking rewards a different kind of attention: planning in reverse, carving with consequence, and accepting the variation of every pull. We explore relief and monotype processes, paper selection, registration and the collaged surface. Students build an edition and a small set of experimental proofs.',
    duration: '8 weeks',
    schedule: 'Sat 11:30 am',
    ageGroup: 'Ages 12 – Adult',
    level: 'Intermediate',
    fee: '₹8,200',
    image: 'images/printing-press.jpg',
    alt: 'A printing press pulling a freshly inked sheet of paper',
    outcomes: ['Linocut & monotype', 'Editioning & registration', 'Paper & ink knowledge', 'Layered mixed-media work'],
  },
  {
    slug: 'portfolio-atelier',
    title: 'Portfolio Atelier',
    category: 'Portfolio',
    tagline: 'For the next door you want to open.',
    description:
      'A focused, critiqued studio year for art school and design applications — concept, craft, documentation and interview.',
    longDescription:
      'Portfolio Atelier is for students preparing for art, design and architecture schools in India and abroad. We build a coherent body of work across media, document it properly, write about it clearly, and rehearse the conversation. The pace is demanding and the critique is honest — because the work deserves both.',
    duration: '16 weeks',
    schedule: 'Sun 3 pm · by review',
    ageGroup: 'Ages 15 – 19',
    level: 'Advanced',
    fee: '₹18,500',
    image: 'images/mural.jpg',
    alt: 'A large painted mural of a face with expressive eyes and colour',
    outcomes: ['A coherent 12–15 piece folio', 'Concept & research practice', 'High-quality documentation', 'Interview & statement coaching'],
  },
];

export const PROGRAM_CATEGORIES: { label: string; value: ProgramCategory | 'All' }[] = [
  { label: 'All programmes', value: 'All' },
  { label: 'Drawing', value: 'Drawing' },
  { label: 'Painting', value: 'Painting' },
  { label: 'Digital', value: 'Digital' },
  { label: 'Ceramics', value: 'Ceramics' },
  { label: 'Printmaking', value: 'Printmaking' },
  { label: 'Portfolio', value: 'Portfolio' },
];

export const FACULTY: Faculty[] = [
  {
    name: 'Anaya Menon',
    role: 'Founder & Painting Faculty',
    credentials: 'MFA Painting · MS University, Baroda',
    bio: 'Anaya founded Artino in 2014 after a decade of painting and teaching. Her work explores memory, domestic objects and the colour of coastal light.',
    image: 'images/faculty-1.jpg',
    alt: 'Portrait of Anaya Menon, founder of Artino Studio Art Academy',
    specialisms: ['Oil & acrylic', 'Colour theory', 'Critique'],
  },
  {
    name: "Rohan D'Souza",
    role: 'Drawing & Printmaking',
    credentials: 'BFA · Sir J.J. School of Art, Mumbai',
    bio: "Rohan is a draughtsman and printmaker with a residency at RISD. He teaches drawing as a way of thinking — slow, exact and quietly radical.",
    image: 'images/faculty-2.jpg',
    alt: "Portrait of Rohan D'Souza, drawing and printmaking faculty",
    specialisms: ['Life drawing', 'Linocut', 'Sketchbook'],
  },
  {
    name: 'Mira Kapoor',
    role: 'Digital Art & Illustration',
    credentials: 'MFA Illustration · SVA, New York',
    bio: 'Mira is an illustrator working across editorial and picture books. She helps students build worlds on screen without losing the hand.',
    image: 'images/faculty-3.jpg',
    alt: 'Portrait of Mira Kapoor, digital art and illustration faculty',
    specialisms: ['Procreate', 'Narrative', 'Character design'],
  },
  {
    name: 'Kabir Sen',
    role: 'Ceramics & Sculpture',
    credentials: 'M.Des Ceramics · NID, Ahmedabad',
    bio: 'Kabir is a studio potter and sculptor. His classes are about weight, patience and the intelligence of the hand.',
    image: 'images/faculty-4.jpg',
    alt: 'Portrait of Kabir Sen, ceramics and sculpture faculty',
    specialisms: ['Wheel throwing', 'Glaze', 'Form'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "My daughter stopped asking ‘is this good?’ and started asking ‘what if…’. That shift is worth more to us than any certificate.",
    name: 'Priya Nair',
    context: 'Parent of Aanya, age 12',
    program: 'Foundation Drawing',
  },
  {
    quote:
      'The portfolio atelier got me into my dream design school. More than that, it taught me how to look at my own work honestly.',
    name: 'Ahaan Raj',
    context: 'Alumnus · now at NID Ahmedabad',
    program: 'Portfolio Atelier',
  },
  {
    quote:
      'It feels like a real atelier — quiet, focused, generous. I paint for two hours on a Wednesday and leave lighter than I arrived.',
    name: 'Meera Suresh',
    context: 'Adult learner',
    program: 'Painting & Colour',
  },
  {
    quote:
      'Six students, one long table, endless attention. Our son comes home with clay under his nails and a story every single week.',
    name: 'Daniel Kurian',
    context: 'Parent of Ishan, age 10',
    program: 'Ceramics & Sculpture',
  },
  {
    quote:
      'I arrived with a folder of neat, safe drawings. I left with a portfolio that actually sounds like me. The critique was the real gift.',
    name: 'Nila Fathima',
    context: 'Alumna · now at Srishti Manipal',
    program: 'Portfolio Atelier',
  },
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'chromatic-bloom',
    title: 'Chromatic Bloom',
    artist: 'Aanya Nair',
    medium: 'Acrylic on canvas',
    year: '2025',
    category: 'Painting',
    image: 'images/abstract-chromatic.jpg',
    alt: 'Abstract painting in vivid yellow, orange, teal and crimson',
    ratio: 'portrait',
  },
  {
    id: 'layered-light',
    title: 'Layered Light',
    artist: 'Studio collective',
    medium: 'Oil on linen',
    year: '2025',
    category: 'Painting',
    image: 'images/abstract-impasto.jpg',
    alt: 'Thickly layered oil paint in rainbow colours',
    ratio: 'portrait',
  },
  {
    id: 'after-the-dutch-masters',
    title: 'After the Dutch Masters',
    artist: 'Meera Suresh',
    medium: 'Oil on panel',
    year: '2024',
    category: 'Painting',
    image: 'images/still-life-flowers.jpg',
    alt: 'A classical still-life painting of flowers in a dark vase',
    ratio: 'portrait',
  },
  {
    id: 'botanical-study',
    title: 'Botanical Study',
    artist: 'Ishan Kurian',
    medium: 'Watercolour on paper',
    year: '2025',
    category: 'Drawing',
    image: 'images/watercolour-study.jpg',
    alt: 'A watercolour painting of berries and leaves beside paint tubes',
    ratio: 'landscape',
  },
  {
    id: 'current',
    title: 'Current',
    artist: 'Nila Fathima',
    medium: 'Mixed media on board',
    year: '2024',
    category: 'Mixed media',
    image: 'images/fluid-current.jpg',
    alt: 'Fluid abstract artwork in magenta, violet and silver',
    ratio: 'portrait',
  },
  {
    id: 'nocturne-in-blue',
    title: 'Nocturne in Blue',
    artist: 'Anaya Menon',
    medium: 'Acrylic on canvas',
    year: '2025',
    category: 'Painting',
    image: 'images/abstract-nocturne.jpg',
    alt: 'Dark blue abstract painting with strokes of orange and red',
    ratio: 'landscape',
  },
  {
    id: 'tools-of-the-trade',
    title: 'Tools of the Trade',
    artist: 'Studio archive',
    medium: 'Photograph',
    year: '2025',
    category: 'Mixed media',
    image: 'images/brushes-flatlay.jpg',
    alt: 'A collection of well-used paintbrushes covered in colour',
    ratio: 'square',
  },
  {
    id: 'three-vessels',
    title: 'Three Vessels',
    artist: 'Kabir Sen',
    medium: 'Stoneware & glaze',
    year: '2024',
    category: 'Ceramics',
    image: 'images/ceramics-vessels.jpg',
    alt: 'Three pale hand-built ceramic vessels holding dried flowers',
    ratio: 'landscape',
  },
  {
    id: 'walls-have-eyes',
    title: 'Walls Have Eyes',
    artist: 'Mural cohort',
    medium: 'Acrylic mural',
    year: '2024',
    category: 'Mural',
    image: 'images/mural.jpg',
    alt: 'A painted street mural of two large blue eyes and a hummingbird',
    ratio: 'landscape',
  },
];

export const GALLERY_CATEGORIES: (GalleryCategory | 'All')[] = [
  'All',
  'Painting',
  'Drawing',
  'Ceramics',
  'Mixed media',
  'Mural',
];

export const FAQS: Faq[] = [
  {
    question: 'Do I need any prior art experience?',
    answer:
      'No. Most of our students arrive as complete beginners. Foundation Drawing is designed for a first real encounter with materials, and our faculty meet each student at their own level. The only prerequisite is curiosity and a willingness to keep a sketchbook.',
  },
  {
    question: 'What is included in the course fee?',
    answer:
      'Studio time, faculty guidance, firing and glazing for ceramics, and basic shared materials such as inks, charcoal and paper are included. A personal sketchbook and any specialised surfaces are listed in the welcome note. We keep material lists short and honest.',
  },
  {
    question: 'How large are the batches?',
    answer:
      'Eight students to one faculty member, and often fewer. Small groups are central to how we teach: they make room for real conversation, individual critique and the kind of attention that changes how someone works.',
  },
  {
    question: 'Are classes in the studio or online?',
    answer:
      'All programmes are taught in person at our Fort Kochi studio. Art is physical — the weight of clay, the tooth of paper, the smell of turpentine. We do offer short online portfolio critique sessions for alumni and applicants who live outside Kochi.',
  },
  {
    question: 'Can adults join the programmes?',
    answer:
      'Yes. Painting & Colour, Ceramics & Sculpture, Digital Art and Printmaking are open to adults. Many of our weekday evening batches are a mix of teens and adults, and the conversation is better for it.',
  },
  {
    question: 'Do you help with art school portfolios?',
    answer:
      'Portfolio Atelier is built precisely for that. Over sixteen weeks we develop a coherent body of work, document it properly, write an artist statement and rehearse interviews. Admission to the atelier is by a short portfolio conversation.',
  },
  {
    question: 'What happens if I miss a class?',
    answer:
      'Each term includes one complimentary make-up class, subject to studio availability. If you know you will miss a session, tell us in advance and we will arrange a catch-up or share the week’s studio notes.',
  },
];

export const VALUES: Value[] = [
  {
    title: 'Studio first',
    text: 'We teach in a room with north light, real materials and other people. Screens are tools here, not the room itself.',
    icon: 'window',
  },
  {
    title: 'Eight seats, one table',
    text: 'Small cohorts mean your work gets looked at — properly, often, and with care. Attention is the curriculum.',
    icon: 'people',
  },
  {
    title: 'Process over polish',
    text: 'Sketchbooks, failed attempts and honest critique are part of the work. We teach decisions, not tricks.',
    icon: 'pencil',
  },
  {
    title: 'A wall to answer to',
    text: 'Every term ends in an exhibition. Making for an audience changes the way you make for yourself.',
    icon: 'frame',
  },
];

export const APPROACH = [
  {
    number: '01',
    title: 'Look slowly',
    text: 'Every programme begins with observation: a still life, a room, a face, a colour relationship. We train the eye before the hand.',
  },
  {
    number: '02',
    title: 'Make deliberately',
    text: 'Materials are introduced with their history and their behaviour. Students learn why a surface, a brush or a firing matters.',
  },
  {
    number: '03',
    title: 'Critique generously',
    text: 'Weekly conversations about the work — specific, respectful and useful. Critique is how a private instinct becomes a practice.',
  },
  {
    number: '04',
    title: 'Show the work',
    text: 'The term ends on the wall. Family, friends and the neighbourhood are invited. Nothing clarifies a decision like a public room.',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2014',
    title: 'A single room in Fort Kochi',
    text: 'Anaya Menon begins weekend drawing circles for six students above a spice warehouse, with one long table and borrowed chairs.',
  },
  {
    year: '2017',
    title: 'The first wall',
    text: 'The first student exhibition opens in a heritage warehouse on Bazaar Road. Four hundred people walk through in a weekend.',
  },
  {
    year: '2021',
    title: 'A wider table',
    text: 'The ceramics kiln and digital studio arrive. The faculty grows into a group of practising artists who still make their own work.',
  },
  {
    year: '2024',
    title: 'Ten years of looking',
    text: 'Alumni are studying at NID, Srishti, SVA and the Royal College of Art. The studio begins its scholarship programme for local students.',
  },
  {
    year: '2026',
    title: 'The next chapter',
    text: 'A community atelier, a public lecture series, and more seats at the table — without growing the class size.',
  },
];

export const ADMISSION_STEPS: Step[] = [
  {
    number: '01',
    title: 'Visit the studio',
    text: 'Book a twenty-minute visit. See the light, meet a teacher, ask the awkward questions. No commitment, no pressure.',
  },
  {
    number: '02',
    title: 'Find your table',
    text: 'We will suggest a programme and a batch based on your age, schedule and what you want to make. You choose.',
  },
  {
    number: '03',
    title: 'Begin with an empty page',
    text: 'Your first class includes a studio orientation, a sketchbook and a conversation about what you would like to leave with.',
  },
];

export const STUDIO_IMAGES = {
  heroMain: 'images/hero-main.jpg',
  heroSecondary: 'images/palette.jpg',
  heroTertiary: 'images/abstract-nocturne.jpg',
  aboutMain: 'images/studio.jpg',
  aboutSecondary: 'images/brushes-flatlay.jpg',
  cta: 'images/fluid-current.jpg',
};
