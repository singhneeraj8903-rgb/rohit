'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Shield,
  Lock,
  FileCheck,
  Mail,
  Globe,
  FileText,
  Cookie,
  Scale,
  Info,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

import {
  type Locale,
  locales,
  localeConfig,
  getLocalizedPath,
} from '@/lib/i18n/config';

import { saveLanguagePreference } from './LanguageSelector';

export interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  // PDFRang website pages
  const resourceLinks = [
    { href: `/${locale}/about`, label: 'About Us', icon: Info },
    { href: `/${locale}/tools`, label: 'PDF Tools', icon: FileCheck },
    { href: `/${locale}/workflow`, label: 'Workflow', icon: FileText },
    { href: `/${locale}/faq`, label: 'FAQs', icon: MessageCircle },
    { href: `/${locale}/contact`, label: 'Contact Us', icon: Mail },
  ];

  // Legal pages
  const legalLinks = [
    { href: `/${locale}/privacy`, label: 'Privacy Policy', icon: Shield },
    { href: `/${locale}/terms`, label: 'Terms of Service', icon: Scale },
    { href: `/${locale}/cookies`, label: 'Cookie Policy', icon: Cookie },
    { href: `/${locale}/disclaimer`, label: 'Disclaimer', icon: FileText },
  ];

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);

    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  return (
    <footer
      className="w-full border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] pt-14 pb-8"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-2.5 text-xl font-bold text-[hsl(var(--color-foreground))]"
              aria-label="PDFRang Home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--color-primary))] text-white shadow-md transition-transform group-hover:scale-105">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M8 13h8" />
                  <path d="M8 17h8" />
                </svg>
              </div>

              <span>PDFRang</span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              {t('tagline') ||
                'Free, easy-to-use PDF tools to help you merge, split, compress and manage PDF documents.'}
            </p>

            {/* Contextual backlink: link inside a natural sentence (higher SEO value) */}
            <p className="max-w-xs text-sm leading-relaxed text-[hsl(var(--color-muted-foreground))]">
              Looking for more options? Explore{' '}
              <a
                href="https://pdftara.com"
                target="_blank"
                rel="noopener"
                title="PDFTara - Free Online PDF Tools"
                className="font-medium text-[hsl(var(--color-primary))] hover:underline"
              >
                PDFTara free online PDF tools
              </a>{' '}
              to edit, convert and manage your PDF files.
            </p>

            {/* Official contact email */}
            <a
              href="mailto:support@pdfrang.com"
              className="inline-flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
              aria-label="Email PDFRang support"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>support@pdfrang.com</span>
            </a>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))]">
              Resources
            </h3>

            <ul className="flex flex-col gap-3">
              {resourceLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}

              {/* PDFTara backlink (dofollow: no rel="nofollow") */}
              <li>
                <a
                  href="https://pdftara.com"
                  target="_blank"
                  rel="noopener"
                  title="PDFTara - Free Online PDF Tools"
                  className="group flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  <span>PDFTara - Free PDF Tools</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))]">
              Legal &amp; Policies
            </h3>

            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Security & Privacy */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))]">
              Security &amp; Privacy
            </h3>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 rounded bg-[hsl(var(--color-success)/0.1)] p-1 text-[hsl(var(--color-success))]">
                  <Lock className="h-3 w-3" />
                </div>

                <div>
                  <span className="block text-sm font-medium text-[hsl(var(--color-foreground))]">
                    Browser-Based Processing
                  </span>
                  <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                    Supported tools process files directly in your browser.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-0.5 rounded bg-[hsl(var(--color-primary)/0.1)] p-1 text-[hsl(var(--color-primary))]">
                  <FileCheck className="h-3 w-3" />
                </div>

                <div>
                  <span className="block text-sm font-medium text-[hsl(var(--color-foreground))]">
                    Privacy-Focused Tools
                  </span>
                  <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                    Local-processing tools keep your files on your device.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-0.5 rounded bg-[hsl(var(--color-success)/0.1)] p-1 text-[hsl(var(--color-success))]">
                  <Shield className="h-3 w-3" />
                </div>

                <div>
                  <span className="block text-sm font-medium text-[hsl(var(--color-foreground))]">
                    Privacy Information
                  </span>
                  <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                    Learn how your information is handled.
                  </span>
                </div>
              </li>
            </ul>

            <Link
              href={`/${locale}/privacy`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
            >
              <Shield className="h-4 w-4" />
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="border-t border-[hsl(var(--color-border))] py-6">
          <div className="mb-4 flex items-center gap-3">
            <Globe className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />

            <span className="text-sm font-medium text-[hsl(var(--color-foreground))]">
              {t('buttons.selectLanguage')}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {locales.map((loc) => {
              const config = localeConfig[loc];
              const isActive = loc === locale;

              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLanguageChange(loc)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                    isActive
                      ? 'bg-[hsl(var(--color-primary))] font-medium text-white'
                      : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-primary)/0.1)] hover:text-[hsl(var(--color-primary))]'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {config.nativeName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--color-border))] pt-8 md:flex-row">
          <p className="text-center text-sm text-[hsl(var(--color-muted-foreground))] md:text-left">
            © {currentYear} PDFRang. All rights reserved.
          </p>

          <nav
            aria-label="Legal links"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[hsl(var(--color-muted-foreground))] transition-colors hover:text-[hsl(var(--color-primary))]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;