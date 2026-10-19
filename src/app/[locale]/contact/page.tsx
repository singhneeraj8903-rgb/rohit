import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import ContactPageClient from './ContactPageClient';

const BASE_URL = 'https://pdfrang.recipeoai.com';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Contact Us | PDFRang',
    description:
      'Get in touch with the PDFRang team for support, feedback, or questions about our free PDF tools.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact/`,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <ContactPageClient locale={locale as Locale} />;
}