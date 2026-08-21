import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(10, 'شماره تلفن معتبر نیست').regex(/^[\d\s\-+()۰-۹]+$/, 'شماره تلفن معتبر نیست'),
  productType: z.string().min(1, 'لطفاً نوع محصول را انتخاب کنید'),
  dimensions: z.string().min(1, 'لطفاً ابعاد را وارد کنید'),
  quantity: z.string().min(1, 'لطفاً تعداد را وارد کنید'),
  notes: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const PRODUCT_TYPE_OPTIONS = [
  { value: 'دریچه خطی', label: 'دریچه خطی' },
  { value: 'دریچه چهار طرفه', label: 'دریچه چهار طرفه' },
  { value: 'دریچه گرد', label: 'دریچه گرد' },
  { value: 'دریچه فن‌کویل', label: 'دریچه فن‌کویل' },
  { value: 'گریل تهویه', label: 'گریل تهویه' },
  { value: 'دمپر هوا', label: 'دمپر هوا' },
  { value: 'سایر', label: 'سایر' },
] as const;
