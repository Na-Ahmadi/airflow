'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/shared/Container/Container';
import SectionTitle from '@/components/shared/SectionTitle/SectionTitle';
import Icon from '@/components/shared/Icon/Icon';
import Button from '@/components/shared/Button/Button';
import styles from './ContactForm.module.css';

const schema = z.object({
  name:        z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email:       z.string().email('ایمیل معتبر نیست'),
  phone:       z.string().min(10, 'شماره تلفن معتبر نیست').regex(/^[\d\s\-+()۰-۹]+$/, 'شماره تلفن معتبر نیست'),
  company:     z.string().optional(),
  projectType: z.string().min(1, 'لطفاً نوع پروژه را انتخاب کنید'),
  message:     z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
});

type FormValues = z.infer<typeof schema>;

interface ContactFormProps {
  data: {
    section: { tag: string; title: string; subtitle: string };
    projectTypes: string[];
    fileInfo: { label: string; hint: string };
    submit: { label: string; loading: string; success: string; error: string };
  };
}

export default function ContactForm({ data }: ContactFormProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setStatus('loading');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    try {
      console.log('Form submitted:', values);
      setStatus('success');
      reset();
      setFileName('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className={styles.section} ref={ref} id="contact" aria-label={data.section.title}>
      <div className={styles.bg} aria-hidden>
        <div className={styles.bgGrad} />
      </div>
      <Container>
        <div className={styles.wrapper}>
          {/* Left: Info */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              tag={data.section.tag}
              title={data.section.title}
              subtitle={data.section.subtitle}
              align="start"
            />
            <div className={styles.contactDetails}>
              <ContactDetail icon="phone" label="تلفن تماس" value="۰۲۱-۳۳۵۸۵۷۸" />
              <ContactDetail icon="mail" label="ایمیل" value="info@airflowsystem.ir" />
              <ContactDetail icon="location" label="آدرس" value="تهران، شهران، خیابان مطهری، پلاک ۱۲۳" />
              <ContactDetail icon="clock" label="ساعات کاری" value="شنبه تا چهارشنبه ۸–۱۷ | پنج‌شنبه ۸–۱۳" />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.successMsg}>
                  <Icon name="check-circle" size={56} style={{ color: 'var(--color-success)' }} />
                  <p>{data.submit.success}</p>
                  <button className={styles.resetBtn} onClick={() => setStatus('idle')}>ارسال پیام جدید</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
                  <div className={styles.row}>
                    <Field label="نام و نام خانوادگی" error={errors.name?.message} required>
                      <input className={[styles.input, errors.name ? styles.inputError : ''].filter(Boolean).join(' ')} type="text" placeholder="نام و نام خانوادگی" {...register('name')} />
                    </Field>
                    <Field label="ایمیل" error={errors.email?.message} required>
                      <input className={[styles.input, errors.email ? styles.inputError : ''].filter(Boolean).join(' ')} type="email" placeholder="ایمیل" {...register('email')} />
                    </Field>
                  </div>
                  <div className={styles.row}>
                    <Field label="شماره تماس" error={errors.phone?.message} required>
                      <input className={[styles.input, errors.phone ? styles.inputError : ''].filter(Boolean).join(' ')} type="tel" placeholder="شماره تماس" {...register('phone')} />
                    </Field>
                    <Field label="شرکت / سازمان" error={errors.company?.message}>
                      <input className={styles.input} type="text" placeholder="شرکت / سازمان" {...register('company')} />
                    </Field>
                  </div>
                  <Field label="نوع پروژه" error={errors.projectType?.message} required>
                    <select className={[styles.input, styles.select, errors.projectType ? styles.inputError : ''].filter(Boolean).join(' ')} {...register('projectType')} defaultValue="">
                      <option value="" disabled>انتخاب کنید</option>
                      {data.projectTypes.map((pt) => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="توضیحات پروژه" error={errors.message?.message} required>
                    <textarea
                      className={[styles.input, styles.textarea, errors.message ? styles.inputError : ''].filter(Boolean).join(' ')}
                      placeholder="توضیحات پروژه خود را بنویسید..."
                      rows={4}
                      {...register('message')}
                    />
                  </Field>

                  {/* File Upload */}
                  <div className={styles.fileUpload}>
                    <label className={styles.fileLabel}>
                      <Icon name="upload" size={24} />
                      <div>
                        <span className={styles.fileLabelTitle}>{data.fileInfo.label}</span>
                        <span className={styles.fileHint}>{data.fileInfo.hint}</span>
                        {fileName && <span className={styles.fileName}>{fileName}</span>}
                      </div>
                      <input
                        type="file"
                        className={styles.fileInput}
                        accept=".pdf,.dwg,.zip"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                      />
                    </label>
                  </div>

                  {status === 'error' && (
                    <p className={styles.errorMsg}>{data.submit.error}</p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={status === 'loading'}
                  >
                    {status === 'loading' ? data.submit.loading : data.submit.label}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}

function ContactDetail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className={styles.contactItem}>
      <div className={styles.contactIcon}><div className={styles.iconSvg}><Icon name={icon} /></div></div>
      <div>
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactValue}>{value}</span>
      </div>
    </div>
  );
}
