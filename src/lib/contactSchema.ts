import { z } from 'zod';
import type { Locale } from '@/i18n/routing';
import faMessages from '../../messages/fa.json';
import enMessages from '../../messages/en.json';

const messages: Record<Locale, typeof faMessages.contactSchema> = {
  fa: faMessages.contactSchema,
  en: enMessages.contactSchema,
};

export function getContactSchema(locale: Locale) {
  const m = messages[locale];
  return z.object({
    name:        z.string().min(2, m.name),
    email:       z.string().email(m.email),
    phone:       z.string().min(10, m.phone).regex(/^[\d\s\-+()۰-۹]+$/, m.phone),
    company:     z.string().optional(),
    projectType: z.string().min(1, m.projectType),
    message:     z.string().min(10, m.message),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;
