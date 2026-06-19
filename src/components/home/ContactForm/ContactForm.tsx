'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useInView } from 'framer-motion';
import type { ContactFormValues } from '@/types';
import Container from '@/components/shared/Container';
import SectionTitle from '@/components/shared/SectionTitle';
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
                  <SuccessIcon />
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
                      <UploadIcon />
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

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <><Spinner /> {data.submit.loading}</>
                    ) : (
                      data.submit.label
                    )}
                  </button>
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
      <div className={styles.contactIcon}><ContactIcon name={icon} /></div>
      <div>
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactValue}>{value}</span>
      </div>
    </div>
  );
}

function ContactIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactElement> = {
    phone:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016.09 17.9l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
    mail:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  };
  return <div className={styles.iconSvg}>{icons[name] ?? null}</div>;
}

function SuccessIcon() { return <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>; }
function UploadIcon()  { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>; }
function Spinner() { return <span className={styles.spinner} aria-hidden />; }
