
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  UserRound,
  Globe,
  ShieldCheck,
  FileText,
  Sparkles,
} from 'lucide-react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';

interface ContactPageClientProps {
  locale: Locale;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPageClient({
  locale,
}: ContactPageClientProps) {
  const t = useTranslations('contactPage');
  const tCommon = useTranslations('common');

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactEmail = 'contact@pdfrang.recipeoai.com';

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Contact us with questions, feedback, or issues.',
      action: 'Email Us',
      href: `mailto:${contactEmail}`,
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Demo form only: no backend/API is connected yet.
    setFormStatus('submitting');

    await new Promise((resolve) => setTimeout(resolve, 600));

    setFormStatus('success');

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Colorful Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-600 to-blue-600 py-16 text-white md:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-pink-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur">
                <MessageSquare className="h-8 w-8" />
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
                <Sparkles className="h-4 w-4" />
                <span>PDFRang Support</span>
              </div>

              <h1 className="mb-5 text-4xl font-extrabold tracking-tight md:text-5xl">
                {t('hero.title')}
              </h1>

              <p className="mx-auto max-w-2xl text-base leading-8 text-blue-50 md:text-lg">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Website and Contact Information */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Card className="overflow-hidden rounded-3xl border border-slate-200/80 p-0 shadow-xl dark:border-slate-800">
                <div className="h-2 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400" />

                <div className="p-6 md:p-9">
                  <div className="flex flex-col items-start gap-6 sm:flex-row">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/20">
                      <UserRound className="h-8 w-8" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                        About the Website
                      </p>

                      <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                        PDFRang
                      </h2>

                      <p className="mb-6 leading-7 text-slate-600 dark:text-slate-300">
                        For questions about PDFRang, website functionality,
                        PDF tools, feedback, or general enquiries, contact
                        us using the details and form on this page.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Uttar Pradesh, India
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Globe className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                          <div className="min-w-0">
                            <p className="font-medium">Official Website</p>
                            <a
                              href="https://www.pdfrang.recipeoai.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-sm text-blue-600 underline decoration-blue-300 underline-offset-4 hover:text-violet-600 dark:text-blue-400"
                            >
                              www.pdfrang.recipeoai.com
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
                          <div className="min-w-0">
                            <p className="font-medium">Contact Email</p>
                            <a
                              href={`mailto:${contactEmail}`}
                              className="break-all text-sm text-blue-600 underline underline-offset-4 hover:text-violet-600 dark:text-blue-400"
                            >
                              {contactEmail}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 flex items-start gap-3 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-blue-50 p-4 dark:border-slate-700 dark:from-violet-950/40 dark:to-blue-950/40">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                          We welcome your feedback and suggestions to help
                          improve your PDFRang experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="pb-12 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  Get in Touch
                </p>

                <h2 className="text-2xl font-bold md:text-3xl">
                  Contact Options
                </h2>

                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  Choose the contact method below to reach PDFRang.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {contactMethods.map((method) => {
                  const Icon = method.icon;

                  return (
                    <a
                      key={method.title}
                      href={method.href}
                      className="block h-full"
                    >
                      <Card className="group h-full rounded-2xl border border-slate-200 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl dark:border-slate-800 dark:hover:border-violet-700">
                        <div
                          className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${method.gradient} text-white shadow-lg transition group-hover:scale-110`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>

                        <h3 className="mb-2 font-bold">
                          {method.title}
                        </h3>

                        <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {method.description}
                        </p>

                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
                          {method.action}
                          <Send className="h-4 w-4" />
                        </span>
                      </Card>
                    </a>
                  );
                })}

                <Card className="rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-lg">
                    <FileText className="h-7 w-7" />
                  </div>

                  <h3 className="mb-2 font-bold">Frequently Asked Questions</h3>

                  <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Find answers to common questions about PDFRang.
                  </p>

                  <Link
                    href={`/${locale}/faq`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-pink-600 dark:text-violet-400"
                  >
                    Visit FAQ
                    <Send className="h-4 w-4" />
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50 py-14 dark:from-slate-900 dark:via-slate-950 dark:to-violet-950/30 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg">
                  <Mail className="h-7 w-7" />
                </div>

                <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                  {t('form.title')}
                </h2>

                <p className="text-slate-600 dark:text-slate-400">
                  {t('form.description')}
                </p>
              </div>

              {formStatus === 'success' ? (
                <Card className="rounded-3xl border border-green-200 p-8 text-center shadow-xl dark:border-green-900">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                    <CheckCircle className="h-9 w-9 text-green-600 dark:text-green-400" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold">
                    Message form submitted
                  </h3>

                  <p className="mb-6 leading-7 text-slate-600 dark:text-slate-400">
                    This is a demo form. Your message has not been sent
                    because a contact API has not been connected yet.
                    Please use the email link above to contact us.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => setFormStatus('idle')}
                  >
                    {t('form.success.button')}
                  </Button>
                </Card>
              ) : (
                <Card className="rounded-3xl border border-white/70 p-6 shadow-xl shadow-violet-500/5 dark:border-slate-800 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-semibold"
                        >
                          {t('form.fields.name.label')}
                        </label>

                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          autoComplete="name"
                          placeholder={t('form.fields.name.placeholder')}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-semibold"
                        >
                          {t('form.fields.email.label')}
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          autoComplete="email"
                          placeholder={t('form.fields.email.placeholder')}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-semibold"
                      >
                        {t('form.fields.subject.label')}
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900"
                      >
                        <option value="">
                          {t('form.fields.subject.placeholder')}
                        </option>
                        <option value="general">
                          {t('form.fields.subject.options.general')}
                        </option>
                        <option value="bug">
                          {t('form.fields.subject.options.bug')}
                        </option>
                        <option value="feature">
                          {t('form.fields.subject.options.feature')}
                        </option>
                        <option value="feedback">
                          {t('form.fields.subject.options.feedback')}
                        </option>
                        <option value="other">
                          {t('form.fields.subject.options.other')}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-semibold"
                      >
                        {t('form.fields.message.label')}
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder={t('form.fields.message.placeholder')}
                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                      >
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                        <p className="text-sm">{t('form.error')}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      loading={formStatus === 'submitting'}
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting'
                        ? t('form.submit.loading')
                        : t('form.submit.default')}

                      {formStatus !== 'submitting' && (
                        <Send className="ml-2 h-4 w-4" />
                      )}
                    </Button>

                    <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Submitting this demo form does not send an email.
                      Please use the email link if you need to contact us.
                    </p>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-14 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 p-8 text-center text-white shadow-xl md:p-12">
              <MessageSquare className="mx-auto mb-5 h-11 w-11" />

              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                {t('faq.title')}
              </h2>

              <p className="mx-auto mb-7 max-w-xl leading-7 text-white/90">
                {t('faq.description', {
                  brand: tCommon('brand'),
                })}
              </p>

              <Link href={`/${locale}/faq`}>
                <Button variant="outline">
                  {t('faq.button')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
