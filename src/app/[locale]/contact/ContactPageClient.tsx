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
