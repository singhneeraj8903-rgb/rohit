/**
 * Site configuration
 */
export const siteConfig = {
  name: 'PDFRang',

  description:
    'Professional PDF Tools - Free, Private & Browser-Based. Merge, split, compress, convert, and edit PDF files online without uploading to servers.',

  url: 'https://pdfrang.recipeoai.com',

  ogImage: 'https://pdfrang.recipeoai.com/images/og-image.png',

  links: {},

  creator: 'PDFRang Team',

  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'free PDF tools',
    'online PDF editor',
    'browser-based PDF',
    'private PDF processing',
  ],

  /**
   * SEO-related settings
   */
  seo: {
    titleTemplate: '%s | PDFRang',
    defaultTitle: 'PDFRang - Professional PDF Tools',
    locale: 'en_US',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Tools',
      href: '/tools',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'FAQ',
      href: '/faq',
    },
  ],

  footerNav: [
    {
      title: 'Privacy',
      href: '/privacy',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
};