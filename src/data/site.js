// Source unique des contenus de la maquette.
// Sources : documents client (Review & Action Plan, Remediation SoW) et pages publiées de s4dconsulting.com (octobre 2026).
// Contenus non documentés : volontairement omis ou présentés comme « à venir ».

export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/systems-for-development-s4d/' },
  { label: 'X', href: 'https://x.com/S4DConsulting' },
  { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=100069853390134' },
  { label: 'Instagram', href: 'https://www.instagram.com/s4dconsulting/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@s4dconsulting902' },
]

export const EMAIL = 'info@s4dconsulting.com'

export const OFFICES = [
  { country: 'USA', phone: '+1 240-938-6300', address: '1472 4th St. Laurel #336, MD 20707, USA' },
  { country: 'Ghana', phone: '+233 54 229 0807', address: '3rd Floor Marvel House, 148A Giffard Road, Accra, Ghana' },
  { country: 'Uganda', phone: '+256 789 059 569', address: 'Padre Pio House, Plot 8, Lumumba Ave, Kampala, Uganda' },
]

export const LIVE = 'https://s4dconsulting.com'

export const IMG = {
  hero: '/img/site/data-team.jpg',
  team: '/img/site/team-work.jpg',
  teamSmile: '/img/site/team-smile.jpg',
  office: '/img/site/office.jpg',
  health: '/img/site/medical-record.jpg',
  healthCare: '/img/site/health-care.jpg',
  edu: '/img/site/edunexus.jpg',
  property: '/img/site/property.jpg',
  dt: '/img/site/digital-transformation.jpg',
  ai: '/img/site/ai-mobile.jpg',
  bpr: '/img/site/bpr.jpg',
  supply: '/img/site/supply-chain.jpg',
  market: '/img/site/market.jpg',
  life: '/img/site/life.jpg',
}

/* ---------- Core areas ---------- */
export const AREAS = [
  {
    slug: 'core-digital-health', name: 'Digital Health', img: IMG.health, cta: 'Explore Digital Health',
    short: 'Intelligent health systems that integrate data, AI and interoperability to power evidence-based decisions and national health sovereignty.',
    what: [
      'We help ministries and private sector enterprises build intelligent health systems, integrating data, AI and interoperability to power evidence-based decisions and national health sovereignty.',
      'Public and private health entities seeking to improve service delivery through technology trust S4D to design and implement data-driven health ecosystems. We develop enterprise-grade solutions such as Health Information Exchanges, AI-enabled forecasting platforms and National Health Intelligence Centers that connect systems, strengthen visibility and power evidence-based decision-making across all levels of care.',
    ],
    solutions: ['Health Information Exchanges', 'AI-enabled forecasting platforms', 'National Health Intelligence Centers', 'Supply chain and logistics information systems'],
    products: ['product-cognivo', 'product-nhic-hub'],
    caps: ['cap-ai', 'cap-data', 'cap-integration'],
    stories: ['story-supply-chain', 'story-data-exchange', 'story-moh-hie', 'story-family-health', 'story-community-health', 'story-data-strategy', 'story-ghilmis-helpdesk'],
  },
  {
    slug: 'core-digital-education', name: 'Digital Education', img: IMG.edu, cta: 'Discover Digital Education',
    short: 'From classroom to cloud: the EduNexus platforms connect students, parents and schools through data-driven learning management and digital administration.',
    what: [
      'From classroom to cloud, our EduNexus SIMS connects students, parents and schools through data-driven learning management and digital administration.',
      'Educational institutions and ministries aiming to digitalize operations and enhance learning outcomes partner with S4D. Our EduNexus School Information Management System (SIMS) delivers an integrated view of academic, administrative and welfare data, giving schools analytics and insights to improve student performance and institutional management.',
    ],
    solutions: ['EduNexus School Information Management System (SIMS)', 'EduNexus AI education management and analytics', 'S4D Learn Hub, an AI-powered learning management system'],
    products: ['product-edunexus', 'product-edunexus-ai', 'product-learn-hub'],
    caps: ['cap-ai', 'cap-data'],
    stories: ['story-uganda', 'story-learn-hub'],
  },
  {
    slug: 'core-property-management', name: 'Property Management', img: IMG.property, cta: 'View Property Solutions',
    short: 'PropTech that simplifies tenant, lease and payment management, with real-time visibility and control for property owners.',
    what: [
      'Our PropTech solutions simplify tenant, lease and payment management, giving property owners real-time visibility and control through smart, AI-powered systems.',
      'Property enterprises, from real-estate developers and rental agencies to hotels, turn to S4D to modernize and automate their operations. We build and integrate smart property management platforms that unify accounting, access control, IoT systems and tenant engagement into a single digital experience.',
    ],
    solutions: ['Property management platform covering the full property lifecycle', 'Accounting, access control and IoT integration', 'Tenant engagement and mobile-money reconciliation'],
    products: ['product-nyumba-pms'],
    caps: ['cap-integration', 'cap-process'],
    stories: ['story-lakeview', 'story-uganda'],
  },
  {
    slug: 'core-capability-assessment', name: 'Technology Capability Assessment', img: IMG.dt, cta: 'Assess your readiness',
    short: 'We assess and strengthen digital maturity across organizations, mapping people, processes and platforms.',
    what: [
      'We assess and strengthen digital maturity across organizations, mapping people, processes and platforms to accelerate transformation and sustainable innovation.',
    ],
    solutions: ['Digital analysis and organizational readiness assessments', 'Data needs assessments, strategy and roadmaps'],
    products: [],
    caps: ['cap-process', 'cap-data'],
    stories: ['story-uganda', 'story-data-strategy'],
  },
]

/* ---------- Products ---------- */
export const PRODUCTS = [
  {
    slug: 'product-cognivo', name: 'S4D Cognivo™', kind: 'Data & AI intelligence platform', img: '/img/site/product-ai.jpg', area: 'AI & data',
    audience: 'Governments, development partners and enterprises',
    problem: 'Data is fragmented across health, education, finance and logistics systems.',
    summary: 'S4D Cognivo turns fragmented data into actionable intelligence. It integrates data from multiple systems into a single analytics and AI platform that delivers real-time insights, forecasting and evidence-based planning.',
    features: ['Connects systems like DHIS2, LMIS, HRHIS, ERP and CRM.', 'Uses AI forecasting to predict trends, risks and demand.', 'Offers no-code dashboards for decision-makers at all levels.'],
    cta: 'Request consultation',
  },
  {
    slug: 'product-edunexus', name: 'EduNexus™', kind: 'School Information Management System (SIMS)', img: '/img/site/product-edu.jpg', area: 'Education',
    audience: 'Schools and education ministries',
    problem: 'Academic, administrative and welfare data sit in separate places.',
    summary: 'The EduNexus School Information Management System (SIMS) delivers an integrated view of academic, administrative and welfare data, with analytics and insights to improve student performance and institutional management.',
    features: ['Integrated view of academic, administrative and welfare data.', 'Analytics and insights for schools.'],
    cta: 'Talk to an education specialist',
  },
  {
    slug: 'product-edunexus-ai', name: 'EduNexus AI™', kind: 'Intelligent education management and analytics', img: '/img/site/edunexus.jpg', area: 'Education',
    audience: 'Schools, school groups and ministries',
    problem: 'Institutions need one hub for academics, finance and operations, with insight to act on.',
    summary: 'A cloud-based education management and analytics platform that unifies academics, finance, operations and AI insights in one hub, helping institutions improve efficiency, personalize learning and make data-driven decisions.',
    features: ['Automates admissions, attendance, timetabling and resource planning.', 'Predicts student performance with AI-powered analytics.', 'Unified dashboards for teachers and administrators.'],
    cta: 'Talk to an education specialist',
  },
  {
    slug: 'product-nhic-hub', name: 'NHIC Hub', kind: 'National health intelligence', img: '/img/site/medical-record.jpg', area: 'Health',
    audience: 'Ministries of health and national health programmes',
    problem: 'Health systems need to connect data sources to see and act across all levels of care.',
    summary: 'NHIC Hub is part of S4D’s product suite. S4D builds National Health Intelligence Centers that connect systems, strengthen visibility and power evidence-based decision-making across all levels of care.',
    features: [],
    cta: 'Discuss NHIC Hub',
  },
  {
    slug: 'product-nyumba-pms', name: 'Nyumba PMS', kind: 'Property management platform', img: '/img/site/product-property.jpg', area: 'Property',
    audience: 'Real-estate developers, landlords and facility managers',
    problem: 'Leasing, rent collection and maintenance run on disconnected tools.',
    summary: 'The S4D property management platform digitizes the full property lifecycle, from land acquisition and construction to leasing and facility management. It combines workflow automation, smart IoT integrations and financial transparency.',
    features: ['Automates leasing, rent collection and maintenance tracking.', 'Integrates with TTLock for smart access and guest management.', 'Provides real-time portfolio dashboards and mobile-money reconciliation.'],
    cta: 'Schedule a demo',
  },
  {
    slug: 'product-learn-hub', name: 'S4D Learn Hub', kind: 'AI-powered learning management system', img: '/img/site/bpr.jpg', area: 'Education & capacity building',
    audience: 'Programme users and institutions that need training at scale',
    problem: 'End users of national systems must be trained and certified.',
    summary: 'S4D Learn Hub is an AI-powered LMS designed and implemented by S4D. It has trained and certified 2,000+ end users of GhiLMIS, Ghana’s Logistics Management Information System.',
    features: [],
    cta: 'Discuss S4D Learn Hub',
  },
]

/* ---------- Capabilities ---------- */
export const CAPS = [
  { slug: 'cap-ai', name: 'Artificial Intelligence', img: IMG.ai, cta: 'Explore AI solutions',
    short: 'We design and deploy AI solutions that think, learn and adapt, from predictive analytics to intelligent automation.',
    body: ['We design and deploy AI solutions that think, learn and adapt, from predictive analytics to intelligent automation, empowering governments and organizations to make faster, data-driven decisions with confidence.'],
    seen: ['S4D Cognivo uses AI forecasting to predict trends, risks and demand.', 'An AI-based chatbot and ChatGPT-powered help desk support capacity building for GhiLMIS.', 'S4D Learn Hub is an AI-powered learning management system.'],
    stories: ['story-ghilmis-helpdesk', 'story-learn-hub'], products: ['product-cognivo', 'product-edunexus-ai'] },
  { slug: 'cap-data', name: 'Data Analysis & Decision Intelligence', img: IMG.health, cta: 'Explore data intelligence',
    short: 'We turn raw data into actionable insight using AI, analytics and visualization.',
    body: ['We turn raw data into actionable insight, using AI, analytics and visualization to power smarter decisions across systems and sectors.'],
    seen: ['Interactive dashboards for the Ghana Health Service, Family Health Division.', 'A nationwide data needs assessment with a strategy and roadmap for quality data collection.'],
    stories: ['story-family-health', 'story-data-strategy'], products: ['product-cognivo'] },
  { slug: 'cap-process', name: 'Business Process Re-engineering', img: IMG.bpr, cta: 'Transform your processes',
    short: 'We optimize how organizations work, aligning workflows, technology and people.',
    body: ['We optimize how organizations work, aligning workflows, technology and people to deliver measurable efficiency and impact.', 'This is also where S4D’s end-to-end digital transformation offer sits: strategy, design and engineering.'],
    seen: ['Digital analysis and organizational readiness assessments for a school and an apartment complex in Uganda.'],
    stories: ['story-uganda'], products: [] },
  { slug: 'cap-integration', name: 'System Integration & Enterprise Systems', img: IMG.supply, cta: 'See system integration',
    short: 'We connect platforms, processes and people through secure, interoperable architectures built for scale.',
    body: ['We connect platforms, processes and people, enabling seamless data flow through secure, interoperable architectures built for scale.'],
    seen: ['A national enterprise supply chain solution covering the Ghana health sector.', 'Data exchange platforms linking logistics and routine health information systems.'],
    stories: ['story-supply-chain', 'story-data-exchange', 'story-moh-hie'], products: ['product-cognivo'],
  },
]

/* ---------- Industries ---------- */
export const INDUSTRIES = [
  { name: 'Health', img: IMG.health, text: 'Public and private health entities seeking to improve service delivery through technology trust S4D to design and implement data-driven health ecosystems: Health Information Exchanges, AI-enabled forecasting platforms and National Health Intelligence Centers.', link: 'core-digital-health' },
  { name: 'Education', img: IMG.edu, text: 'Educational institutions and ministries aiming to digitalize operations and enhance learning outcomes partner with S4D. The EduNexus School Information Management System (SIMS) delivers an integrated view of academic, administrative and welfare data.', link: 'core-digital-education' },
  { name: 'Government & Public Sector', img: IMG.team, text: 'We empower ministries and public institutions to modernize service delivery through data-driven systems, interoperability and digital governance, building smarter, more connected governments.', link: 'capabilities' },
  { name: 'Real Estate & Property Management', img: IMG.property, text: 'Developers, rental agencies and hotels turn to S4D to modernize and automate operations. We build and integrate smart property management platforms that unify accounting, access control, IoT systems and tenant engagement.', link: 'core-property-management' },
  { name: 'Private Enterprises', img: IMG.office, text: 'We help businesses modernize, integrate and scale through data intelligence, automation and AI-driven transformation, building systems that turn performance into growth.', link: 'capabilities' },
  { name: 'Development Partners', img: IMG.teamSmile, text: 'We work with global institutions like the Gates Foundation, The Global Fund and the World Bank to design digital ecosystems that strengthen national systems and deliver lasting impact.', link: 'stories' },
]

/* ---------- Success stories ---------- */
// source: 'site' = résumé repris du site publié ; 'review' = projet nommé dans le Review, sans détail documenté
export const STORIES = [
  { slug: 'story-supply-chain', title: 'Enterprise Supply Chain Transformation', area: 'Health', country: 'Ghana', client: 'On behalf of the Global Fund', img: IMG.supply, source: 'site',
    summary: 'Successfully configured and deployed a national enterprise supply chain solution covering the entire Ghana health sector, supporting 4,000+ facilities and 2,000+ users on behalf of the Global Fund.',
  },
  { slug: 'story-data-exchange', title: 'Aggregated Data Exchange Platform', area: 'Health', country: 'Ghana', client: 'Ghana Ministry of Health and the Global Fund', img: IMG.dt, source: 'site',
    summary: 'Designed and implemented an Azure-based Data Exchange Platform to facilitate seamless data sharing between Ghana MoH and the Global Fund.' },
  { slug: 'story-moh-hie', title: 'Ghana MoH Health Information Exchange (HIE) Platform', area: 'Health', country: 'Ghana', client: 'Ghana Ministry of Health', img: IMG.health, source: 'site',
    summary: 'Designed and implemented a data exchange platform to enable interoperability between logistics and routine health information systems for the Ghana Ministry of Health.',
  },
  { slug: 'story-family-health', title: 'Advanced Data Analytics for the Family Health Division', area: 'Health', country: 'Ghana', client: 'Ghana Health Service, Family Health Division', img: IMG.healthCare, source: 'site',
    summary: 'Developed interactive dashboards to support data-driven decision-making for the Ghana Health Service, Family Health Division.' },
  { slug: 'story-community-health', title: 'Community Health Application Development', area: 'Health', country: 'Ghana', client: 'Client to be confirmed', img: IMG.ai, source: 'site',
    summary: 'Successfully designed and deployed a Community Health Application to support public health interventions and community-level health service delivery.',
  },
  { slug: 'story-data-strategy', title: 'Data Strategy & Interoperability for Ghana MoH', area: 'Health', country: 'Ghana', client: 'On behalf of the World Bank', img: IMG.team, source: 'site',
    summary: 'Conducted a nationwide data needs assessment, developing a strategy and roadmap for quality data collection and system interoperability to support Ghana’s UHC 2030 goal on behalf of the World Bank.' },
  { slug: 'story-ghilmis-helpdesk', title: 'AI-Driven Capacity Building & Help Desk for GhiLMIS', area: 'Health · AI', country: 'Ghana', client: 'GhiLMIS, Ghana’s Logistics Management Information System', img: IMG.ai, source: 'site',
    summary: 'Developed and deployed an AI-based chatbot and a ChatGPT-powered help desk to support capacity building and technical assistance for Ghana’s Logistics Management Information System (GhiLMIS).' },
  { slug: 'story-learn-hub', title: 'S4D Learn Hub: AI-Powered Learning Management System', area: 'Education · AI', country: 'Ghana', client: 'GhiLMIS end users', img: IMG.bpr, source: 'site',
    summary: 'Designed and implemented S4D Learn Hub, an AI-powered LMS that has trained and certified 2,000+ end users of GhiLMIS.' },
  { slug: 'story-uganda', title: 'Digital Transformation for Education & Property Management in Uganda', area: 'Education · Property', country: 'Uganda', client: 'Hillside Nursery & Primary School; Chorley Apartments', img: IMG.property, source: 'site',
    summary: 'Conducted digital analysis and organizational readiness assessments for Hillside Nursery & Primary School and Chorley Apartments in Uganda.' },
  { slug: 'story-ghilmis-nsp', title: 'GhiLMIS National Sustainability Programme', area: 'Health', country: 'Ghana', client: 'To be confirmed', img: IMG.supply, source: 'review',
    summary: 'A flagship health engagement in Ghana. The full case study is coming soon.' },
  { slug: 'story-achimota-hie', title: 'Achimota HIE go-live', area: 'Health', country: 'Ghana', client: 'To be confirmed', img: IMG.health, source: 'review',
    summary: 'Go-live of a health information exchange at Achimota, Ghana. The full case study is coming soon.' },
  { slug: 'story-zambia-psie', title: 'Zambia PSIE demand-planning dashboards', area: 'Health', country: 'Zambia', client: 'To be confirmed', img: IMG.dt, source: 'review',
    summary: 'Demand-planning dashboards delivered in Zambia. The full case study is coming soon.' },
  { slug: 'story-rwanda-rms', title: 'Rwanda RMS AI platform', area: 'AI', country: 'Rwanda', client: 'To be confirmed', img: IMG.ai, source: 'review',
    summary: 'An AI platform delivered in Rwanda. The full case study is coming soon.' },
  { slug: 'story-lakeview', title: 'Lakeview Apartments property management go-live', area: 'Property', country: 'Property', client: 'Lakeview Apartments', img: IMG.property, source: 'review',
    summary: 'Go-live of a property management platform at Lakeview Apartments. The full case study is coming soon.' },
]

/* ---------- Insights ---------- */
export const INSIGHT_TYPES = [
  { name: 'Publications & Reports', text: 'In-depth reports and policy briefs shaping the digital transformation agenda across Africa’s health, education and governance sectors.' },
  { name: 'Case Studies', text: 'Real-world stories of how S4D solutions transform systems and strengthen institutions.', link: 'stories' },
  { name: 'Webinars & Podcasts', text: 'Live sessions and a podcast series on Africa’s digital future.' },
  { name: 'Research Papers', text: 'Technical and academic research on digital ecosystems, AI adoption and system interoperability.' },
  { name: 'Blog', text: 'Reflections and commentary from the S4D team: lessons learned, emerging trends and bold ideas.' },
]

export const INSIGHTS = [
  { slug: 'insight-ghilmis-dqf', type: 'Framework', title: 'GhiLMIS Data Quality Framework', img: IMG.health, text: 'A data quality framework for GhiLMIS, Ghana’s Logistics Management Information System.' },
  { slug: 'insight-stock-card', type: 'Concept note', title: 'Stock-card digitisation concept note', img: IMG.supply, text: 'A concept note on digitising stock cards.' },
  { slug: 'insight-q2-utilisation', type: 'Analysis', title: 'Q2 2026 utilisation analysis', img: IMG.dt, text: 'An analysis of utilisation for the second quarter of 2026.' },
]

/* ---------- About ---------- */
export const VALUES = [
  { name: 'Integrity', text: 'Trust built through transparency and accountability in every engagement.' },
  { name: 'Inclusion', text: 'Technology that empowers progress for everyone it serves.' },
  { name: 'Innovation', text: 'Data, intelligence and technology applied to real institutional problems.' },
  { name: 'Measurable impact', text: 'Sustainable results that clients and partners can see.' },
]

/* ---------- Navigation ---------- */
export const NAV = [
  { label: 'About S4D', route: 'about', children: [
    { label: 'Who we are', route: 'about' },
    { label: 'Purpose & values', route: 'about-values' },
    { label: 'Our people', route: 'about-people' },
    { label: 'Governance & ethics', route: 'about-governance' },
    { label: 'Newsroom', route: 'newsroom' },
  ] },
  { label: 'Core Areas', route: 'core-areas', children: AREAS.map((a) => ({ label: a.name, route: a.slug, desc: a.short })) },
  { label: 'Products', route: 'products', children: PRODUCTS.map((p) => ({ label: p.name.replace('™', ''), route: p.slug, desc: p.kind })) },
  { label: 'Capabilities', route: 'capabilities', children: CAPS.map((c) => ({ label: c.name, route: c.slug, desc: c.short })) },
  { label: 'Industries', route: 'industries' },
  { label: 'Insights', route: 'insights' },
  { label: 'Success Stories', route: 'stories' },
  { label: 'Careers', route: 'careers' },
]
