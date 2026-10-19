import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import AboutPageClient from './AboutPageClient';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

const SITE_URL = 'https://pdfrang.recipeoai.com';

// --- SEO: Har language ke liye unique About Title ---
export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  const seoData: Record<string, { title: string; desc: string }> = {
    en: { title: "About Us - Professional PDF Tools", desc: "Learn more about PDFRang, our mission to provide free, secure, and browser-based PDF tools for everyone." },
    ja: { title: "私たちについて - プロフェッショナルなPDFツール", desc: "PDFRang、およびすべての人に無料で安全なブラウザベースのPDFツールを提供するという当社の使命について詳しくご覧ください。" },
    ko: { title: "회사 소개 - 전문 PDF 도구", desc: "PDFRang와 모든 사람에게 무료로 안전한 브라우저 기반 PDF 도구를 제공하려는 당사의 사명에 대해 자세히 알아보세요." },
    es: { title: "Sobre nosotros - Herramientas PDF profesionales", desc: "Obtenga más información sobre PDFRang y nuestra misión de proporcionar herramientas PDF gratuitas, seguras y basadas en el navegador para todos." },
    fr: { title: "À propos de nous - Outils PDF professionnels", desc: "En savoir plus sur PDFRang, notre mission de fournir des outils PDF gratuits, sécurisés et basés sur un navigateur pour tous." },
    de: { title: "Über uns - Professionelle PDF-Tools", desc: "Erfahren Sie mehr über PDFRang und unsere Mission, jedem kostenlose, sichere und browserbasierte PDF-Tools zur Verfügung zu stellen." },
    zh: { title: "关于我们 - 专业 PDF 工具", desc: "详细了解 PDFRang，我们的使命是为每个人提供免费、安全且基于浏览器的 PDF 工具。" },
    pt: { title: "Sobre nós - Ferramentas PDF profissionais", desc: "Saiba mais sobre o PDFRang, nossa missão de fornecer ferramentas PDF gratuitas, seguras e baseadas em navegador para todos." },
  };

  const currentSeo = seoData[locale] || seoData['en'];

  return {
    title: `${currentSeo.title} | PDFRang`,
    description: currentSeo.desc,
    alternates: {
      // Slash (/) fix taaki Redirect Error na aaye
      canonical: `${SITE_URL}/${locale}/about/`,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <AboutPageClient locale={locale as Locale} />;
}