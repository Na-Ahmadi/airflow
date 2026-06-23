import { z } from 'zod';

export const contactSchema = z.object({
  name:        z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email:       z.string().email('ایمیل معتبر نیست'),
  phone:       z.string().min(10, 'شماره تلفن معتبر نیست').regex(/^[\d\s\-+()۰-۹]+$/, 'شماره تلفن معتبر نیست'),
  company:     z.string().optional(),
  projectType: z.string().min(1, 'لطفاً نوع پروژه را انتخاب کنید'),
  message:     z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
