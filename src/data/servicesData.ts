import { ServiceItem } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'website-development',
    slug: 'website-development',
    name: 'Website Development',
    tagline: 'High-performance, modern React, Next.js & full-stack web applications.',
    category: 'web',
    startingPriceUSD: 799,
    deliveryTimeline: '2–3 Weeks',
    iconName: 'Globe',
    shortDescription: 'Custom, blazing-fast, responsive web applications engineered for conversions, SEO, and international scalability.',
    fullDescription: 'We craft high-converting, modern web applications built on cutting-edge technologies like React, TypeScript, Next.js, and Express. Whether you need a corporate web platform, a modern SaaS application, or a custom web dashboard, BRANIFY delivers pixel-perfect, secure, and lightning-fast solutions.',
    features: [
      'Custom React/Next.js frontend development',
      'Full API & backend integrations',
      'Ultra-responsive desktop & mobile experience',
      'SEO & performance optimization (Core Web Vitals)',
      'Custom CMS & headless options',
      'International multi-language & currency support',
      'High-security standards & SSL readiness'
    ],
    benefits: [
      'Boost visitor conversion rates by up to 40%',
      'Lightning-fast page speeds under 1.5 seconds',
      'Scale seamlessly as your user base expands',
      'Complete ownership of source code & architecture'
    ],
    processSteps: [
      { step: '01', title: 'Discovery & Architecture', desc: 'Analyzing requirements, wireframing user flows, and planning tech stack.' },
      { step: '02', title: 'UI/UX & Prototyping', desc: 'Crafting interactive Figma prototypes focused on brand identity & conversion.' },
      { step: '03', title: 'Clean Code Engineering', desc: 'Developing clean, type-safe TypeScript code with modern styling.' },
      { step: '04', title: 'Testing & Core Web Vitals', desc: 'Cross-browser testing, accessibility audit, and performance tuning.' },
      { step: '05', title: 'Deployment & Support', desc: 'Production launch, SSL setup, domain mapping, and post-launch maintenance.' }
    ],
    faqs: [
      { question: 'What stack do you build custom websites with?', answer: 'We specialize in React, TypeScript, Vite, Next.js, Node.js/Express, Tailwind CSS, and cloud databases like Firestore or PostgreSQL.' },
      { question: 'Will my website be mobile friendly?', answer: 'Yes, 100%. All our web builds follow mobile-first responsive design standards.' },
      { question: 'Do you provide source code ownership?', answer: 'Yes, full source code and intellectual property rights belong to you upon final delivery.' }
    ],
    deliverables: ['Production Web App Build', 'Full Source Code', 'Admin Setup', 'SEO Configuration', 'User Guide & Documentation'],
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Vite']
  },
  {
    id: 'wordpress-development',
    slug: 'wordpress-development',
    name: 'WordPress Development',
    tagline: 'Custom Elementor, WooCommerce & headless WordPress solutions.',
    category: 'web',
    startingPriceUSD: 499,
    deliveryTimeline: '1–2 Weeks',
    iconName: 'LayoutGrid',
    shortDescription: 'Scalable, secure, and user-friendly WordPress websites with custom themes, Elementor Pro, WooCommerce, and speed optimization.',
    fullDescription: 'Power your business with the world’s most popular CMS. We build ultra-fast, tailored WordPress & WooCommerce stores that are easy for your team to manage, fully secured against vulnerabilities, and optimized for search engine rankings.',
    features: [
      'Custom Elementor Pro & Gutenberg block builds',
      'WooCommerce store setup & payment gateway integration',
      'Custom theme styling & plugin configuration',
      'Advanced speed optimization (Rocket/NitroPack)',
      'WordPress security hardening & firewall setup',
      'Seamless database migration & backup routines',
      'Ongoing WordPress care & maintenance plans'
    ],
    benefits: [
      'Manage content without any coding knowledge',
      'Accept credit cards, PayPal, Stripe, and local gateways',
      'Optimized database for minimal server load',
      'Clean SEO structure out of the box'
    ],
    processSteps: [
      { step: '01', title: 'Strategy & Wireframing', desc: 'Determining site architecture, required plugins, and WooCommerce flows.' },
      { step: '02', title: 'Theme & Page Construction', desc: 'Building responsive visual layouts using Elementor or block editor.' },
      { step: '03', title: 'E-commerce & Gateway Wiring', desc: 'Configuring payment gateways, shipping rules, and automated emails.' },
      { step: '04', title: 'Security & Speed Hardening', desc: 'Applying caching, image WebP compression, and security firewall.' },
      { step: '05', title: 'Handoff & Training', desc: 'Client admin training video session and site handover.' }
    ],
    faqs: [
      { question: 'Can I edit products and pages myself?', answer: 'Yes! We provide complete administrative access and a custom training guide so you can update text, images, and products anytime.' },
      { question: 'How do you prevent WordPress site slowness?', answer: 'We avoid bloated pre-made themes, use clean lightweight builders, optimize images to WebP, and set up server-level caching.' }
    ],
    deliverables: ['Custom WordPress Build', 'WooCommerce Setup', 'Elementor Pro License Setup', 'Speed Audit Report', 'Admin Video Guide'],
    techStack: ['WordPress', 'PHP', 'WooCommerce', 'Elementor Pro', 'MySQL']
  },
  {
    id: 'landing-pages',
    slug: 'landing-pages',
    name: 'Landing Pages',
    tagline: 'High-converting lead generation & product launch pages.',
    category: 'web',
    startingPriceUSD: 299,
    deliveryTimeline: '3–5 Days',
    iconName: 'MousePointerClick',
    shortDescription: 'Psychology-driven, fast-loading landing pages designed to turn ad traffic into paying customers and qualified leads.',
    fullDescription: 'Stop wasting ad spend on low-converting pages. BRANIFY crafts hyper-focused landing pages engineered around direct-response design principles, clear calls-to-action, mobile ergonomics, and instant loading speeds.',
    features: [
      'Direct-response copywriting & headline structuring',
      'Mobile-first conversion layout',
      'A/B testing ready architecture',
      'Form integration (HubSpot, Mailchimp, Zapier, Webhooks)',
      'Sub-second loading speed',
      'Interactive micro-animations & social proof badges'
    ],
    benefits: [
      'Increase ad campaign ROI by 2x-4x',
      'Eliminate friction points in the buyer journey',
      'Seamless lead capture into your CRM'
    ],
    processSteps: [
      { step: '01', title: 'Audience Research', desc: 'Analyzing user pain points, competitors, and offer hook.' },
      { step: '02', title: 'Copywriting & Wireframe', desc: 'Crafting persuasive copy and section flow.' },
      { step: '03', title: 'Design & Development', desc: 'Building responsive high-end visuals.' },
      { step: '04', title: 'Analytics & Webhooks', desc: 'Connecting pixel tags, CRM forms, and tracking.' }
    ],
    faqs: [
      { question: 'Can you integrate my CRM or email list?', answer: 'Yes, we integrate with Mailchimp, HubSpot, Klaviyo, Google Sheets, or custom API endpoints.' }
    ],
    deliverables: ['High-Converting Landing Page', 'Copywriting Outline', 'CRM Integration', 'Analytics & Pixel Setup'],
    techStack: ['React', 'Tailwind CSS', 'Figma', 'Webhooks']
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    tagline: 'User-centric research, wireframes & high-fidelity Figma design systems.',
    category: 'design',
    startingPriceUSD: 499,
    deliveryTimeline: '1–2 Weeks',
    iconName: 'Figma',
    shortDescription: 'Elevate your web or mobile product with intuitive user experience mapping, sleek visual design systems, and Figma prototypes.',
    fullDescription: 'Great software starts with exceptional user experience. We combine user research, wireframing, interactive prototyping, and reusable Figma design systems to turn complex workflows into delightful, effortless digital products.',
    features: [
      'User journey mapping & flow diagrams',
      'Low-fidelity wireframes to high-fidelity UI',
      'Comprehensive Figma Design Systems (Tokens, Components, Variants)',
      'Interactive clickable prototypes',
      'Mobile & desktop responsive layouts',
      'Design handoff ready for developers'
    ],
    benefits: [
      'Reduce developer rewrite time by up to 50%',
      'Create an unforgettable, modern brand aesthetic',
      'Validate ideas before writing a single line of code'
    ],
    processSteps: [
      { step: '01', title: 'User Research', desc: 'Defining personas, feature requirements, and competitive benchmarking.' },
      { step: '02', title: 'Wireframing', desc: 'Mapping user journeys and low-fidelity structural layouts.' },
      { step: '03', title: 'High-Fidelity UI', desc: 'Applying brand colors, typography, and micro-interactions.' },
      { step: '04', title: 'Design System & Export', desc: 'Structuring component libraries and developer handoff assets.' }
    ],
    faqs: [
      { question: 'What software do you deliver designs in?', answer: 'All design source files are delivered in structured Figma files with auto-layout enabled.' }
    ],
    deliverables: ['Figma Source File', 'Interactive Prototype Link', 'Design System Library', 'Asset Exports (SVG/PNG)'],
    techStack: ['Figma', 'FigJam', 'Design Tokens']
  },
  {
    id: 'logo-design',
    slug: 'logo-design',
    name: 'Logo Design',
    tagline: 'Memorable, modern, and vector-perfect brand logos.',
    category: 'branding',
    startingPriceUSD: 199,
    deliveryTimeline: '3–5 Days',
    iconName: 'Palette',
    shortDescription: 'Distill your business essence into an iconic, timeless, and versatile vector logo that stands out across print and digital media.',
    fullDescription: 'Your logo is the visual cornerstone of your brand. Our designers craft unique, conceptual logo marks that communicate authority, trust, and distinction across digital screens, business cards, merchandise, and billboards.',
    features: [
      '3 to 5 unique logo concepts',
      'Unlimited revisions on selected concept',
      '100% original vector artwork (No stock icons)',
      'Full brand colors & black/white variants',
      'Favicon & app icon adaptations',
      'Vector master files (AI, EPS, SVG, PDF, High-Res PNG)'
    ],
    benefits: [
      'Instant brand recognition and credibility',
      'Scalable vector formats for any size from 16px to giant banners',
      'Full legal copyright ownership'
    ],
    processSteps: [
      { step: '01', title: 'Brief & Moodboard', desc: 'Understanding your business values, industry, and aesthetic preferences.' },
      { step: '02', title: 'Conceptual Sketching', desc: 'Drafting vector concepts with geometric precision.' },
      { step: '03', title: 'Refinement & Typography', desc: 'Pairing typography and color palettes.' },
      { step: '04', title: 'Final Asset Export', desc: 'Exporting vector files, transparent PNGs, and usage guidelines.' }
    ],
    faqs: [
      { question: 'Do I get copyright ownership?', answer: 'Yes, full commercial usage rights and vector master files are transferred to you upon completion.' }
    ],
    deliverables: ['3-5 Unique Concepts', 'Vector AI/EPS/SVG Files', 'High-Res PNG/JPG Packs', 'Favicon & App Icon Formats'],
    techStack: ['Adobe Illustrator', 'Figma', 'Vector Engine']
  },
  {
    id: 'brand-identity',
    slug: 'brand-identity',
    name: 'Brand Identity',
    tagline: 'Complete visual branding: guidelines, typography & social kits.',
    category: 'branding',
    startingPriceUSD: 599,
    deliveryTimeline: '1–2 Weeks',
    iconName: 'Sparkles',
    shortDescription: 'Transform your business into a cohesive, premium international brand with full style guidelines, stationery, and social kits.',
    fullDescription: 'In today’s crowded marketplace, consistency creates trust. BRANIFY builds holistic brand identity systems including logo usage rules, color swatches, font pairings, business stationery, social media templates, and brand strategy guides.',
    features: [
      'Primary & secondary logo variations',
      'Color palette hierarchy (HEX, RGB, CMYK, Pantone)',
      'Typography pairing rules & licensed web fonts',
      'Comprehensive Brand Guidelines PDF (20+ pages)',
      'Business card, letterhead & email signature designs',
      'Social media avatar & banner kit',
      '3D realistic brand mockups'
    ],
    benefits: [
      'Look like an established, multi-million dollar international enterprise',
      'Maintain 100% visual consistency across all team members and media',
      'Attract premium clients who value high-end aesthetics'
    ],
    processSteps: [
      { step: '01', title: 'Brand Strategy', desc: 'Defining brand tone of voice, values, target audience, and positioning.' },
      { step: '02', title: 'Visual Explorations', desc: 'Creating moodboards, logo suite, and color concepts.' },
      { step: '03', title: 'Stationery & Collateral', desc: 'Designing business cards, letterheads, and social media kits.' },
      { step: '04', title: 'Brand Guidelines Manual', desc: 'Compiling a comprehensive brand book for future use.' }
    ],
    faqs: [
      { question: 'What is included in the Brand Guidelines PDF?', answer: 'Logo clear space, incorrect usage examples, color codes, font hierarchy, imagery style, and print specifications.' }
    ],
    deliverables: ['Brand Guidelines PDF', 'Logo Master Suite', 'Color & Typography Kit', 'Stationery Designs', 'Social Media Templates'],
    techStack: ['Adobe Illustrator', 'InDesign', 'Figma']
  },
  {
    id: 'social-media-design',
    slug: 'social-media-design',
    name: 'Social Media Design',
    tagline: 'Engaging Instagram, LinkedIn, Facebook & YouTube ad creatives.',
    category: 'marketing',
    startingPriceUSD: 199,
    deliveryTimeline: '3–5 Days',
    iconName: 'Share2',
    shortDescription: 'Eye-catching social media posts, story templates, carousel graphics, reel covers, and ad creatives that stop the scroll.',
    fullDescription: 'Stand out on feed algorithms with high-impact, custom social media designs tailored for Instagram, Facebook, LinkedIn, Twitter/X, and YouTube. We combine bold typography, custom graphics, and brand consistency to boost your engagement.',
    features: [
      'Custom Instagram grid posts & carousel slides',
      'Story & Reel cover graphics',
      'LinkedIn infographic sliders & banner graphics',
      'High-converting Facebook & Instagram ad creatives',
      'YouTube channel art & custom thumbnails',
      'Editable Canva or Figma templates for easy re-use'
    ],
    benefits: [
      'Dramatically increase follower engagement & clicks',
      'Maintain a polished, professional brand feed',
      'Save time with ready-to-publish Canva/Figma templates'
    ],
    processSteps: [
      { step: '01', title: 'Content Planning', desc: 'Reviewing post topics, ad goals, and brand theme.' },
      { step: '02', title: 'Creative Design', desc: 'Designing high-contrast graphics and carousel slides.' },
      { step: '03', title: 'Review & Edit', desc: 'Fine-tuning text overlay and imagery.' },
      { step: '04', title: 'Export & Handoff', desc: 'Delivering PNG files and editable Canva template links.' }
    ],
    faqs: [
      { question: 'Can I edit the text myself later?', answer: 'Yes! We deliver editable Canva or Figma templates so you can quickly change text and images for daily posting.' }
    ],
    deliverables: ['Post Graphics Pack', 'Carousel Slides', 'Ad Creatives', 'Editable Canva Templates'],
    techStack: ['Canva', 'Photoshop', 'Figma']
  },
  {
    id: 'business-presentation',
    slug: 'business-presentation',
    name: 'Business Presentation',
    tagline: 'Investor pitch decks, sales presentations & company profiles.',
    category: 'branding',
    startingPriceUSD: 349,
    deliveryTimeline: '4–6 Days',
    iconName: 'Presentation',
    shortDescription: 'Captivate investors, board members, and clients with custom pitch decks, sales decks, and polished company profiles.',
    fullDescription: 'Secure funding and close high-value deals with custom-designed presentations. We turn complex data, market statistics, and business strategy into visually compelling, easy-to-digest pitch decks in PowerPoint, Google Slides, or PDF.',
    features: [
      'Custom slide layouts matching brand guidelines',
      'Data visualization, graphs, and custom diagrams',
      'Infographics & visual timeline slides',
      'Editable PowerPoint (.pptx) & Google Slides formats',
      'High-resolution PDF export for emailing',
      'Stock photos & vector iconography included'
    ],
    benefits: [
      'Impress venture capitalists and angel investors',
      'Communicate value propositions quickly and clearly',
      'Reusable slide templates for future pitch revisions'
    ],
    processSteps: [
      { step: '01', title: 'Deck Structure', desc: 'Reviewing outline, market data, and core messaging.' },
      { step: '02', title: 'Slide Master Design', desc: 'Establishing grid layout, typography, and color scheme.' },
      { step: '03', title: 'Data & Visual Crafting', desc: 'Creating custom charts, graphics, and icon metrics.' },
      { step: '04', title: 'Final Formatting', desc: 'Exporting editable PPTX, Google Slides, and PDF versions.' }
    ],
    faqs: [
      { question: 'In what file formats do you deliver the presentation?', answer: 'PowerPoint (.pptx), Google Slides link, and high-quality PDF format.' }
    ],
    deliverables: ['Editable PowerPoint File', 'Google Slides Link', 'Print-Ready PDF Deck', 'Custom Graphic Assets'],
    techStack: ['PowerPoint', 'Google Slides', 'Figma', 'Illustrator']
  },
  {
    id: 'seo',
    slug: 'seo',
    name: 'SEO (Search Engine Optimization)',
    tagline: 'Technical, on-page, local SEO & keyword ranking strategies.',
    category: 'marketing',
    startingPriceUSD: 399,
    deliveryTimeline: 'Ongoing / Monthly',
    iconName: 'Search',
    shortDescription: 'Dominate Google search results with comprehensive technical audits, keyword strategy, schema markup, and speed optimization.',
    fullDescription: 'Drive sustainable, organic traffic to your website without relying solely on paid ads. Our SEO services cover deep technical fixes, keyword mapping, content structuring, schema markup, local SEO, and Google Search Console performance optimization.',
    features: [
      'Comprehensive Technical SEO audit & site health fixes',
      'In-depth keyword research & competitor mapping',
      'On-page title, meta, H1-H6, and content optimization',
      'Schema markup (JSON-LD) implementation',
      'XML Sitemap & Robots.txt setup',
      'Google Search Console & GA4 configuration',
      'Local SEO & Google Business Profile optimization'
    ],
    benefits: [
      'Achieve top rankings for high-intent buyer keywords',
      'Attract steady, free organic leads 24/7',
      'Fix indexation errors and broken backlink structures'
    ],
    processSteps: [
      { step: '01', title: 'SEO Audit', desc: 'Analyzing crawlability, page speed, meta tags, and indexing issues.' },
      { step: '02', title: 'Keyword Strategy', desc: 'Finding high-traffic, low-competition search terms in your niche.' },
      { step: '03', title: 'On-Page Optimization', desc: 'Updating title tags, meta descriptions, alt text, and schema.' },
      { step: '04', title: 'Technical Hardening & Analytics', desc: 'Optimizing site architecture and configuring Google Search Console.' }
    ],
    faqs: [
      { question: 'How long does it take to see SEO results?', answer: 'Organic SEO typically shows measurable ranking improvements within 3 to 6 months depending on keyword competition.' }
    ],
    deliverables: ['Technical Audit Report', 'Keyword Mapping Document', 'On-Page Meta Optimization', 'GSC & Analytics Setup'],
    techStack: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Schema.org', 'GA4']
  },
  {
    id: 'ai-solutions',
    slug: 'ai-solutions',
    name: 'AI Solutions',
    tagline: 'Custom AI chatbots, workflow automation & LLM integration.',
    category: 'ai',
    startingPriceUSD: 899,
    deliveryTimeline: '2–3 Weeks',
    iconName: 'Bot',
    shortDescription: 'Empower your business with custom AI chatbots, automated customer support, Gemini API workflows, and smart task automation.',
    fullDescription: 'Leverage state-of-the-art AI technology to automate customer support, generate smart business insights, and streamline daily operations. We build custom AI applications, Gemini/OpenAI API integrations, RAG knowledge bots, and automated workflows.',
    features: [
      'Custom Gemini & OpenAI API integration',
      'Smart customer support chatbots trained on your business data',
      'Automated email & content generation workflows',
      'AI document analysis & data extraction',
      'Voice & multimodal AI assistant integrations',
      'Custom internal AI dashboards for staff productivity'
    ],
    benefits: [
      'Reduce customer support response times to under 3 seconds',
      'Automate repetitive manual data tasks',
      'Operate 24/7 with intelligent, human-like AI responses'
    ],
    processSteps: [
      { step: '01', title: 'Use Case Analysis', desc: 'Identifying tasks that can be automated with LLMs & APIs.' },
      { step: '02', title: 'Knowledge Training', desc: 'Structuring your business documents & FAQs for AI grounding.' },
      { step: '03', title: 'API & Widget Development', desc: 'Building responsive AI chat widgets & backend proxies.' },
      { step: '04', title: 'Testing & Safety Rails', desc: 'Implementing prompt safety checks and context limits.' }
    ],
    faqs: [
      { question: 'Which AI models do you support?', answer: 'We build with Gemini 2.5/1.5, Claude, OpenAI GPT-4o, and open-source models.' }
    ],
    deliverables: ['Custom AI Widget/App', 'Server Proxy & API Integration', 'Prompt Engineering Architecture', 'Admin Control Panel'],
    techStack: ['Gemini API', 'TypeScript', 'Node.js', 'Vector DB', 'Express']
  },
  {
    id: 'business-consultation',
    slug: 'business-consultation',
    name: 'Business Consultation',
    tagline: 'Strategic roadmap for digital transformation, branding & growth.',
    category: 'consulting',
    startingPriceUSD: 249,
    deliveryTimeline: '1-on-1 Session',
    iconName: 'TrendingUp',
    shortDescription: 'Get expert 1-on-1 strategic guidance on web technology, brand positioning, online scaling, and AI adoption for your business.',
    fullDescription: 'Unsure which technology stack to choose, how to rebrand, or how to implement AI in your operations? Sit down with BRANIFY strategy leads for an actionable consultation session that provides clear roadmaps, vendor audits, and growth blueprints.',
    features: [
      '1-on-1 strategy video consultation (60 to 90 minutes)',
      'Digital presence & website performance audit',
      'Brand positioning & messaging analysis',
      'Technology stack & SaaS tool recommendations',
      'Custom Actionable Growth Blueprint document',
      'Follow-up email Q&A support for 14 days'
    ],
    benefits: [
      'Avoid costly mistakes on wrong technology choices',
      'Get a clear step-by-step roadmap tailored to your budget',
      'Direct feedback from experienced international strategists'
    ],
    processSteps: [
      { step: '01', title: 'Pre-Session Audit', desc: 'We analyze your website, competitors, and goals beforehand.' },
      { step: '02', title: '1-on-1 Live Strategy Call', desc: 'In-depth discussion on challenges, tech options, and action items.' },
      { step: '03', title: 'Growth Blueprint Delivery', desc: 'Receiving a structured PDF report outlining steps & tools.' },
      { step: '04', title: '14-Day Q&A Window', desc: 'Email support for any follow-up questions.' }
    ],
    faqs: [
      { question: 'How is the session conducted?', answer: 'Sessions are conducted live via Google Meet or Zoom, with video recording provided afterward.' }
    ],
    deliverables: ['1-on-1 Live Strategy Session', 'Custom Growth Blueprint PDF', 'Recorded Call Session', '14-Day Email Q&A Access'],
    techStack: ['Google Meet', 'Strategy Blueprint', 'Audit System']
  }
];
