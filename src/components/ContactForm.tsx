'use client';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

type FormState = 'idle' | 'sending' | 'success' | 'error';

// EmailJS relays the send server-side on their end, so this static
// (GitHub Pages) site can deliver real email to an inbox without running
// its own backend or exposing SMTP credentials. Configure these three
// values as build-time env vars — see .env.local.example.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, setState] = useState<FormState>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // Not configured yet — see .env.local.example for setup.
      console.error('EmailJS is not configured: missing NEXT_PUBLIC_EMAILJS_* env vars.');
      setState('error');
      return;
    }

    setState('sending');
    const form = e.currentTarget;

    try {
      const res = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      if (res.status === 200) {
        setState('success');
        formRef.current?.reset();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
            {t('name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-bg-secondary/90 border border-accent/10 rounded-2xl px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all"
            placeholder={t('name')}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
            {t('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 transition-colors"
            placeholder={t('email')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
          {t('subject')}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          placeholder={t('subject')}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-text-secondary mb-1.5 uppercase tracking-wider">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className="w-full bg-bg-secondary/90 border border-accent/10 rounded-2xl px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/10 transition-all resize-y min-h-[120px]"
          placeholder={t('message')}
        />
      </div>

      <motion.button
        type="submit"
        disabled={state === 'sending' || state === 'success'}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-accent text-bg-primary font-semibold rounded-lg hover:bg-accent-muted transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {state === 'sending' ? t('sending') : t('send')}
      </motion.button>

      {state === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-accent font-medium"
        >
          {t('success')}
        </motion.p>
      )}
      {state === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-red-400 font-medium"
        >
          {t('error')}
        </motion.p>
      )}
    </form>
  );
}
