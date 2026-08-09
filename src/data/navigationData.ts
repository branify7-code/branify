export interface NavLinkItem {
  title: string;
  path: string;
  desc?: string;
  badge?: string;
  iconName?: string;
  price?: string;
}

export interface NavCategorySection {
  heading: string;
  items: NavLinkItem[];
}

export interface MegaMenuConfig {
  type: 'services' | 'products' | 'tools' | 'portfolio' | 'pricing' | 'blog';
  sections: NavCategorySection[];
  bottomCta?: {
    text: string;
    subtext?: string;
    linkText: string;
    path: string;
  };
}

export const SERVICES_MEGA_MENU: MegaMenuConfig = {
  type: 'services',
  sections: [
    {
      heading: 'Website & Development',
      items: [
        {
          title: 'Website Development',
          path: '/services/website-development',
          desc: 'High-performance React, Next.js & full-stack apps',
          iconName: 'Globe'
        },
        {
          title: 'WordPress Development',
          path: '/services/wordpress-development',
          desc: 'Custom Elementor, WooCommerce & speed optimization',
          iconName: 'LayoutGrid'
        },
        {
          title: 'Landing Pages',
          path: '/services/landing-pages',
          desc: 'High-converting lead gen & launch pages',
          iconName: 'MousePointerClick'
        }
      ]
    },
    {
      heading: 'Design & Branding',
      items: [
        {
          title: 'UI/UX Design',
          path: '/services/ui-ux-design',
          desc: 'User research, wireframes & Figma prototypes',
          iconName: 'Figma'
        },
        {
          title: 'Logo Design',
          path: '/services/logo-design',
          desc: 'Memorable, modern & vector-perfect marks',
          iconName: 'Palette'
        },
        {
          title: 'Brand Identity',
          path: '/services/brand-identity',
          desc: 'Style guides, stationery & social kits',
          iconName: 'Sparkles'
        },
        {
          title: 'Social Media Design',
          path: '/services/social-media-design',
          desc: 'Scroll-stopping Instagram, LinkedIn & ad creatives',
          iconName: 'Share2'
        },
        {
          title: 'Business Presentation',
          path: '/services/business-presentation',
          desc: 'Investor pitch decks & corporate profiles',
          iconName: 'Presentation'
        }
      ]
    },
    {
      heading: 'Growth & Technology',
      items: [
        {
          title: 'SEO (Search Engine Optimization)',
          path: '/services/seo',
          desc: 'Technical, on-page & keyword rankings',
          iconName: 'Search'
        },
        {
          title: 'AI Solutions',
          path: '/services/ai-solutions',
          desc: 'Custom Gemini chatbots & LLM automation',
          badge: 'HOT',
          iconName: 'Bot'
        },
        {
          title: 'Business Consultation',
          path: '/services/business-consultation',
          desc: '1-on-1 strategy, tech audits & roadmaps',
          iconName: 'TrendingUp'
        }
      ]
    }
  ],
  bottomCta: {
    text: 'Need a Custom Solution?',
    subtext: 'Get a tailored project roadmap & fixed quote in 24 hours.',
    linkText: 'Talk to BRANIFY →',
    path: '/contact'
  }
};

export const DIGITAL_PRODUCTS_MEGA_MENU: MegaMenuConfig = {
  type: 'products',
  sections: [
    {
      heading: 'AI & Productivity',
      items: [
        { title: 'AI Prompts', path: '/digital-products?category=AI+Prompts', desc: '1,500+ Gemini & ChatGPT Masterkit' },
        { title: 'AI Tools', path: '/digital-products?category=AI+Tools', desc: 'Automation & smart workflow tools' },
        { title: 'Productivity Templates', path: '/digital-products?category=Productivity+Templates', desc: 'Workflows & OS dashboards' }
      ]
    },
    {
      heading: 'Design & Creative',
      items: [
        { title: 'Canva Templates', path: '/digital-products?category=Canva+Templates', desc: '300+ Agency Instagram & carousel kits' },
        { title: 'Social Media Kits', path: '/digital-products?category=Social+Media+Kits', desc: 'LinkedIn, YouTube & ad templates' },
        { title: 'Presentation Templates', path: '/digital-products?category=Presentation+Templates', desc: 'Investor pitch decks (PPTX/Google Slides)' },
        { title: 'Website Templates', path: '/digital-products?category=Website+Templates', desc: 'React, Next.js & Tailwind starter kits' }
      ]
    },
    {
      heading: 'Business & Finance',
      items: [
        { title: 'Business Templates', path: '/digital-products?category=Business+Templates', desc: 'Contracts, proposals & strategy frameworks' },
        { title: 'Business Documents', path: '/digital-products?category=Business+Documents', desc: 'Legal NDA, client onboarding & SOPs' },
        { title: 'Marketing Templates', path: '/digital-products?category=Marketing+Templates', desc: 'Ad scripts, email funnels & planners' },
        { title: 'Notion Templates', path: '/digital-products?category=Notion+Templates', desc: 'BRANIFY Agency OS & CRM' },
        { title: 'Spreadsheet Templates', path: '/digital-products?category=Spreadsheet+Templates', desc: 'Financial models & valuation sheets' }
      ]
    },
    {
      heading: 'Career & Growth',
      items: [
        { title: 'Resume / CV Templates', path: '/digital-products?category=Resume%2FCV+Templates', desc: 'ATS-optimized professional layouts' },
        { title: 'E-books', path: '/digital-products?category=E-books', desc: 'Growth, branding & agency scaling guides' },
        { title: 'Career Resources', path: '/digital-products?category=Career+Resources', desc: 'Interview prep & portfolio builders' }
      ]
    },
    {
      heading: 'Premium Subscriptions',
      items: [
        { title: 'AI Subscriptions', path: '/subscriptions?category=AI+Subscriptions', desc: 'Official AI writing & LLM pro passes', badge: 'PRO' },
        { title: 'Design Subscriptions', path: '/subscriptions?category=Design+Subscriptions', desc: 'Creative Cloud & asset libraries' },
        { title: 'Video & Creative Tools', path: '/subscriptions?category=Video+%26+Creative+Tools', desc: '4K stock, 3D & audio passes' },
        { title: 'Productivity Software', path: '/subscriptions?category=Productivity+Software', desc: 'Cloud storage & workspace licenses' },
        { title: 'Marketing Tools', path: '/subscriptions?category=Marketing+Tools', desc: 'SEO & social scheduling suites' },
        { title: 'Learning Platforms', path: '/subscriptions?category=Learning+Platforms', desc: 'Masterclasses & tech courses' },
        { title: 'Developer Tools', path: '/subscriptions?category=Developer+Tools', desc: 'API keys & developer environments' }
      ]
    }
  ],
  bottomCta: {
    text: 'Explore All Digital Products',
    subtext: 'Instant digital downloads with commercial license & free updates.',
    linkText: 'Explore All Digital Products →',
    path: '/digital-products'
  }
};

export const FREE_TOOLS_MEGA_MENU: MegaMenuConfig = {
  type: 'tools',
  sections: [
    {
      heading: 'PDF TOOLS',
      items: [
        { title: 'PDF to Word', path: '/tools?category=PDF+Tools', desc: 'Convert PDF to editable Word document' },
        { title: 'Word to PDF', path: '/tools?category=PDF+Tools', desc: 'Convert DOCX to clean PDF file' },
        { title: 'PDF to JPG', path: '/tools?category=PDF+Tools', desc: 'Extract PDF pages into JPG images' },
        { title: 'JPG to PDF', path: '/tools?category=PDF+Tools', desc: 'Combine photos into single PDF' },
        { title: 'PDF Merge', path: '/tools/pdf-merge-planner', desc: 'Combine multiple PDF documents' },
        { title: 'PDF Split', path: '/tools/pdf-page-counter', desc: 'Split PDF pages into separate files' },
        { title: 'PDF Compress', path: '/tools/pdf-size-estimator', desc: 'Reduce PDF file size for emailing' }
      ]
    },
    {
      heading: 'IMAGE TOOLS',
      items: [
        { title: 'Image Compressor', path: '/tools/image-compressor', desc: 'Compress PNG/JPG without quality loss' },
        { title: 'Image Resizer', path: '/tools/image-resizer', desc: 'Resize image dimensions in pixels' },
        { title: 'Image Converter', path: '/tools/image-converter-webp', desc: 'Convert images to WebP format' },
        { title: 'JPG to PNG', path: '/tools/jpg-to-png', desc: 'Convert JPEG images to PNG format' },
        { title: 'PNG to JPG', path: '/tools/png-to-jpg', desc: 'Convert PNG to JPG with background fill' },
        { title: 'WebP Converter', path: '/tools/image-converter-webp', desc: 'Modern high-speed WebP image converter' },
        { title: 'Favicon Generator', path: '/tools/favicon-generator', desc: 'Generate 16x16, 32x32 website icons' }
      ]
    },
    {
      heading: 'SEO TOOLS',
      items: [
        { title: 'Meta Title Generator', path: '/tools/meta-title-description-gen', desc: 'Craft SEO-friendly page title tags' },
        { title: 'Meta Description Generator', path: '/tools/meta-title-description-gen', desc: 'Write Google snippet descriptions' },
        { title: 'Keyword Density Checker', path: '/tools/keyword-density-checker', desc: 'Analyze word frequency & density %' },
        { title: 'Sitemap Generator', path: '/tools/sitemap-xml-generator-helper', desc: 'Build valid XML sitemap code' },
        { title: 'Robots.txt Generator', path: '/tools/robots-txt-generator', desc: 'Create custom spider access rules' },
        { title: 'Schema Generator', path: '/tools/schema-markup-organization', desc: 'JSON-LD Organization & FAQ markup' }
      ]
    },
    {
      heading: 'BUSINESS TOOLS',
      items: [
        { title: 'Invoice Generator', path: '/tools/invoice-generator', desc: 'Download instant PDF business invoices', badge: 'FREE' },
        { title: 'Profit Calculator', path: '/tools/profit-margin-calculator', desc: 'Calculate gross profit margin & markup' },
        { title: 'ROI Calculator', path: '/tools/roi-payback-calculator', desc: 'Calculate marketing campaign return' },
        { title: 'VAT Calculator', path: '/tools/sales-tax-vat-calculator', desc: 'Calculate net, gross & VAT amounts' },
        { title: 'Discount Calculator', path: '/tools/discount-calculator', desc: 'Calculate sale price & savings' },
        { title: 'Percentage Calculator', path: '/tools/percentage-calculator', desc: 'Calculate percentage increase & difference' }
      ]
    },
    {
      heading: 'DEVELOPER TOOLS',
      items: [
        { title: 'JSON Formatter', path: '/tools/json-formatter', desc: 'Beautify & validate JSON objects' },
        { title: 'JSON Validator', path: '/tools/json-formatter', desc: 'Spot syntax errors in JSON' },
        { title: 'Base64 Encoder', path: '/tools/base64-encoder-decoder', desc: 'Encode string to Base64 format' },
        { title: 'Base64 Decoder', path: '/tools/base64-encoder-decoder', desc: 'Decode Base64 string to plain text' },
        { title: 'URL Encoder', path: '/tools/url-encoder-decoder', desc: 'Percent-encode URL query strings' },
        { title: 'UUID Generator', path: '/tools/uuid-generator', desc: 'Generate cryptographically secure v4 GUIDs' }
      ]
    },
    {
      heading: 'TEXT TOOLS',
      items: [
        { title: 'Word Counter', path: '/tools/word-counter', desc: 'Live word, character & reading time' },
        { title: 'Character Counter', path: '/tools/word-counter', desc: 'Count letters with/without spaces' },
        { title: 'Case Converter', path: '/tools/case-converter', desc: 'UPPERCASE, lowercase & Title Case' },
        { title: 'Slug Generator', path: '/tools/slug-generator', desc: 'Convert titles into clean URL slugs' },
        { title: 'Lorem Ipsum Generator', path: '/tools/lorem-ipsum-generator', desc: 'Generate custom placeholder filler text' }
      ]
    }
  ],
  bottomCta: {
    text: 'Explore 100+ Free Online Browser Tools',
    subtext: '100% Client-side processing. No server uploads. Instant results.',
    linkText: 'Explore 100+ Free Tools →',
    path: '/tools'
  }
};

export const PORTFOLIO_MEGA_MENU: MegaMenuConfig = {
  type: 'portfolio',
  sections: [
    {
      heading: 'Project Categories',
      items: [
        { title: 'All Projects', path: '/portfolio', desc: 'Browse our complete international portfolio' },
        { title: 'Web Development', path: '/portfolio?category=Web+Development', desc: 'React, Next.js & SaaS platforms' },
        { title: 'WordPress', path: '/portfolio?category=WordPress', desc: 'Custom Elementor & WooCommerce stores' },
        { title: 'UI/UX Design', path: '/portfolio?category=UI%2FUX', desc: 'Figma prototypes & design systems' },
        { title: 'Branding', path: '/portfolio?category=Branding', desc: 'Logo suites, guidelines & brand identities' },
        { title: 'E-commerce', path: '/portfolio?category=E-commerce', desc: 'High-converting online store builds' },
        { title: 'AI Solutions', path: '/portfolio?category=AI+Solutions', desc: 'Custom chatbots & LLM integrations' },
        { title: 'Marketing', path: '/portfolio?category=Marketing', desc: 'SEO campaigns & direct-response pages' }
      ]
    }
  ],
  bottomCta: {
    text: 'Want to See Case Studies & Client Results?',
    subtext: 'Explore detailed breakdown of challenges, tech stacks, and ROI generated.',
    linkText: 'View Portfolio & Case Studies →',
    path: '/portfolio'
  }
};

export const PRICING_MEGA_MENU: MegaMenuConfig = {
  type: 'pricing',
  sections: [
    {
      heading: 'Services Pricing',
      items: [
        { title: 'Website Development', path: '/services/website-development', price: 'From $799', desc: 'React, Next.js & full-stack web builds' },
        { title: 'WordPress Development', path: '/services/wordpress-development', price: 'From $499', desc: 'WooCommerce, Elementor Pro & speed' },
        { title: 'Landing Pages', path: '/services/landing-pages', price: 'From $299', desc: 'Direct response lead generation pages' },
        { title: 'UI/UX Design', path: '/services/ui-ux-design', price: 'From $499', desc: 'Figma prototypes & design systems' },
        { title: 'Branding', path: '/services/brand-identity', price: 'From $199', desc: 'Logo designs, style guides & stationery' },
        { title: 'SEO', path: '/services/seo', price: 'From $399', desc: 'Technical SEO, keyword research & rankings' },
        { title: 'AI Solutions', path: '/services/ai-solutions', price: 'From $899', desc: 'Custom chatbots & Gemini API integrations' }
      ]
    },
    {
      heading: 'Digital Products Pricing',
      items: [
        { title: 'Templates', path: '/digital-products?category=Canva+Templates', price: 'From $25', desc: 'Canva, Notion, PPTX & Web templates' },
        { title: 'AI Prompts', path: '/digital-products?category=AI+Prompts', price: 'From $29', desc: '1,500+ Gemini & ChatGPT Masterkit' },
        { title: 'Subscription Products', path: '/subscriptions', price: 'From $119', desc: 'Authorized AI, Design & Storage licenses' }
      ]
    }
  ],
  bottomCta: {
    text: 'Need an Enterprise Custom Estimate?',
    subtext: 'We provide transparent fixed-price quotes with no hidden fees.',
    linkText: 'Get a Custom Quote →',
    path: '/contact'
  }
};

export const BLOG_MEGA_MENU: MegaMenuConfig = {
  type: 'blog',
  sections: [
    {
      heading: 'Topics & Categories',
      items: [
        { title: 'Web Development', path: '/blog?category=Web+Development' },
        { title: 'WordPress', path: '/blog?category=WordPress' },
        { title: 'Branding', path: '/blog?category=Branding' },
        { title: 'UI/UX Design', path: '/blog?category=UI%2FUX' },
        { title: 'SEO & Growth', path: '/blog?category=SEO' },
        { title: 'AI & Automation', path: '/blog?category=AI' },
        { title: 'Digital Marketing', path: '/blog?category=Digital+Marketing' },
        { title: 'Business Strategy', path: '/blog?category=Business' },
        { title: 'Freelancing', path: '/blog?category=Freelancing' },
        { title: 'Online Business', path: '/blog?category=Online+Business' }
      ]
    }
  ],
  bottomCta: {
    text: 'Read Latest Insights & Tutorials',
    subtext: 'Actionable strategies for agency founders, developers, and creators.',
    linkText: 'Visit BRANIFY Blog →',
    path: '/blog'
  }
};
