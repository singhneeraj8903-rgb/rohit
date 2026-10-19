import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, Scale, Mail } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { type Locale } from "@/lib/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL = "https://pdfrang.recipeoai.com";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const url = `${BASE_URL}/${locale}/disclaimer/`;

  return {
    title: "Disclaimer | PDFRang",
    description:
      "Read the PDFRang disclaimer covering PDF tools, website information, third-party services, and limitations of liability.",
    alternates: {
      canonical: url,
    },
  };
}

const sections = [
  {
    title: "General Information",
    text: [
      "The information and tools provided by PDFRang are offered for general informational and productivity purposes. Although we aim to keep our website accurate and useful, we do not guarantee that all information or results will always be complete, accurate, or up to date.",
    ],
  },
  {
    title: "Use of PDF Tools",
    text: [
      "PDFRang provides tools for working with PDF files. Results may vary depending on the file, browser, device, and selected operation. You are responsible for checking the output before relying on it.",
      "Keep a backup of important files before editing or converting them. Do not rely on any tool as the sole means of preserving important documents.",
    ],
  },
  {
    title: "No Professional Advice",
    text: [
      "Content on PDFRang is not legal, financial, tax, medical, or other professional advice. Consult a qualified professional when you need advice specific to your circumstances.",
    ],
  },
  {
    title: "Third-Party Services and Advertising",
    text: [
      "Our website may use third-party services, including analytics, advertising providers, and external links. These services may operate under their own terms and privacy policies. PDFRang does not control third-party websites or guarantee their content.",
      "Third-party advertising providers, such as Google, may use cookies or similar technologies to serve ads, subject to your settings and applicable policies.",
    ],
  },
  {
    title: "Limitation of Liability",
    text: [
      "To the extent permitted by applicable law, PDFRang shall not be liable for losses or damages arising from the use of, inability to use, or reliance on the website or its tools. Nothing in this disclaimer excludes liability that cannot legally be excluded.",
    ],
  },
  {
    title: "Website Availability",
    text: [
      "We may update, modify, suspend, or discontinue any part of the website or its tools at any time. We do not guarantee uninterrupted availability or error-free operation.",
    ],
  },
  {
    title: "Changes to This Disclaimer",
    text: [
      "We may update this disclaimer from time to time. Changes will be posted on this page with an updated revision date.",
    ],
  },
];

export default async function DisclaimerPage({ params }: Props) {
  const { locale } = await params;

  const icons = [
    FileText,
    ShieldCheck,
    Scale,
    FileText,
    Scale,
    ShieldCheck,
    FileText,
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {/* Website header */}
      <Header locale={locale as Locale} />

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-28 sm:px-6 lg:px-8"
      >
        {/* Hero */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-indigo-100 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-indigo-400/15 blur-3xl" />

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
              <ShieldCheck className="h-4 w-4" />
              Website Transparency
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Disclaimer
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Important information about using PDFRang, our PDF
              tools, third-party services, and your responsibilities
              when using this website.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
                Last updated: October 16, 2026
              </span>
              <span className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
                7 policy sections
              </span>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/30 sm:p-6">
          <h2 className="text-lg font-bold text-indigo-950 dark:text-indigo-200">
            Please read this disclaimer
          </h2>
          <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
            By accessing or using PDFRang, you acknowledge that you
            have read and understood the information below. Please
            review the terms carefully before relying on any tool or
            result.
          </p>
        </section>

        {/* Policy sections */}
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = icons[index];

            return (
              <section
                key={section.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600 dark:text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Section {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {section.text.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Related policies */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Related Policies
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Learn more about how our website handles privacy, cookies,
            and user enquiries.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/privacy/`}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950"
            >
              Privacy Policy →
            </Link>

            <Link
              href={`/${locale}/cookies/`}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950"
            >
              Cookie Policy →
            </Link>
          </div>
        </section>

        {/* Contact card */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold">
                Have questions?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
                If you have questions about this disclaimer, please
                get in touch with the PDFRang team.
              </p>
            </div>

            <Link
              href={`/${locale}/contact/`}
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition-transform hover:scale-[1.02] hover:bg-indigo-50"
            >
              Contact Us →
            </Link>
          </div>
        </section>
      </main>

      {/* Website footer */}
      <Footer locale={locale as Locale} />
    </div>
  );
}