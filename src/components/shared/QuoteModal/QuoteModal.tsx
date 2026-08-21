'use client';

import Button from '@/components/shared/Button/Button';
import FormField from '@/components/shared/FormField/FormField';
import FormSelect from '@/components/shared/FormField/FormSelect';
import Icon from '@/components/shared/Icon/Icon';
import Modal from '@/components/shared/Modal/Modal';
import { PRODUCT_TYPE_OPTIONS, quoteSchema, type QuoteFormValues } from '@/lib/quoteSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './QuoteModal.module.css';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  productCategory?: string;
  productModel?: string;
}

function matchProductType(category?: string): string {
  if (!category) return '';
  const match = PRODUCT_TYPE_OPTIONS.find(
    (opt) => category.includes(opt.value) || opt.value.includes(category),
  );
  return match ? match.value : 'سایر';
}

export default function QuoteModal({
  isOpen,
  onClose,
  productId,
  productName,
  productCategory,
  productModel,
}: QuoteModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  useEffect(() => {
    if (isOpen) {
      setValue('productType', matchProductType(productCategory));
    }
  }, [isOpen, productCategory, setValue]);

  const handleClose = () => {
    onClose();
    setStatus('idle');
    reset();
  };

  const onSubmit = async (values: QuoteFormValues) => {
    setStatus('loading');

    const productLine = productName
      ? `\n---\nمحصول مرتبط: ${productName}${productModel ? ` (مدل ${productModel})` : ''}${productId ? ` — ${productId}` : ''}`
      : '';

    const message = `نوع محصول: ${values.productType}\nابعاد: ${values.dimensions}\nتعداد: ${values.quantity}\nتوضیحات: ${values.notes || '—'}${productLine}`;

    const payload = {
      name: values.name,
      email: `quote+${values.phone.replace(/\D/g, '')}@airflowsystem.ir`,
      phone: values.phone,
      company: '',
      projectType: `درخواست قیمت – ${values.productType}`,
      message,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="درخواست قیمت سریع">
      {status === 'success' ? (
        <div className={styles.successMsg}>
          <Icon name="check-circle" size={56} style={{ color: 'var(--color-success)' }} />
          <p>
            درخواست شما با موفقیت ثبت شد. تیم فروش ما در سریع‌ترین زمان ممکن با شما در ارتباط خواهد
            بود.
          </p>
          <button className={styles.resetBtn} onClick={handleClose}>
            بستن
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
          {productName && (
            <div className={styles.productContext}>
              <Icon name="box" size={18} />
              <span>
                محصول: {productName}
                {productModel ? ` (${productModel})` : ''}
              </span>
            </div>
          )}

          <div className={styles.row}>
            <FormField
              label="نام"
              error={errors.name?.message}
              required
              type="text"
              placeholder="نام و نام خانوادگی"
              {...register('name')}
            />
            <FormField
              label="شماره موبایل"
              error={errors.phone?.message}
              required
              type="tel"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              {...register('phone')}
            />
          </div>

          <FormSelect
            label="نوع محصول"
            error={errors.productType?.message}
            required
            placeholder="انتخاب کنید"
            options={PRODUCT_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            {...register('productType')}
          />

          <div className={styles.row}>
            <FormField
              label="ابعاد"
              error={errors.dimensions?.message}
              required
              type="text"
              placeholder="مثلاً ۶۰۰×۶۰۰ میلی‌متر"
              {...register('dimensions')}
            />
            <FormField
              label="تعداد"
              error={errors.quantity?.message}
              required
              type="text"
              placeholder="مثلاً ۵۰ عدد"
              {...register('quantity')}
            />
          </div>

          <FormField
            multiline
            label="توضیحات یا نکات فنی (اختیاری)"
            error={errors.notes?.message}
            placeholder="توضیحات تکمیلی خود را وارد کنید"
            rows={3}
            {...register('notes')}
          />

          {status === 'error' && (
            <p className={styles.errorMsg}>ارسال درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید.</p>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
            {status === 'loading' ? 'در حال ارسال...' : 'ارسال درخواست قیمت'}
          </Button>
        </form>
      )}
    </Modal>
  );
}
