import { z } from 'zod';
import type { Lang } from '@/context/LanguageContext';

const messages: Record<Lang, Record<'name' | 'email' | 'phone' | 'projectType' | 'message', string>> = {
  fa: {
    name:        'نام باید حداقل ۲ کاراکتر باشد',
    email:       'ایمیل معتبر نیست',
    phone:       'شماره تلفن معتبر نیست',
    projectType: 'لطفاً نوع پروژه را انتخاب کنید',
    message:     'پیام باید حداقل ۱۰ کاراکتر باشد',
  },
  en: {
    name:        'Name must be at least 2 characters',
    email:       'Invalid email address',
    phone:       'Invalid phone number',
    projectType: 'Please select a project type',
    message:     'Message must be at least 10 characters',
  },
};

export function getContactSchema(lang: Lang) {
  const m = messages[lang];
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
