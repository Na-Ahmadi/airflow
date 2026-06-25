"use client";

import Button from "@/components/shared/Button/Button";
import ContactDetail from "@/components/shared/ContactDetail/ContactDetail";
import Container from "@/components/shared/Container/Container";
import FileUpload from "@/components/shared/FileUpload/FileUpload";
import FormField from "@/components/shared/FormField/FormField";
import FormSelect from "@/components/shared/FormField/FormSelect";
import Icon from "@/components/shared/Icon/Icon";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import {
  contactSchema,
  type ContactFormValues as FormValues,
} from "@/lib/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  data: {
    section: { tag: string; title: string; subtitle: string };
    projectTypes: string[];
    fileInfo: { label: string; hint: string };
    submit: { label: string; loading: string; success: string; error: string };
  };
}

const CONTACT_DETAILS = [
  { icon: "phone", label: "تلفن تماس", value: "۰۲۱-۳۳۵۸۵۷۸" },
  { icon: "mail", label: "ایمیل", value: "info@airflowsystem.ir" },
  {
    icon: "location",
    label: "آدرس",
    value: "تهران، شهران، خیابان مطهری، پلاک ۱۲۳",
  },
  {
    icon: "clock",
    label: "ساعات کاری",
    value: "شنبه تا چهارشنبه ۸–۱۷ | پنج‌شنبه ۸–۱۳",
  },
];

export default function ContactForm({ data }: ContactFormProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const projectOptions = data.projectTypes.map((pt) => ({
    value: pt,
    label: pt,
  }));

  return (
    <section
      className={styles.section}
      ref={ref}
      id="contact"
      aria-label={data.section.title}
    >
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
              {CONTACT_DETAILS.map((detail) => (
                <ContactDetail key={detail.icon} {...detail} />
              ))}
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
              {status === "success" ? (
                <div className={styles.successMsg}>
                  <Icon
                    name="check-circle"
                    size={56}
                    style={{ color: "var(--color-success)" }}
                  />
                  <p>{data.submit.success}</p>
                  <button
                    className={styles.resetBtn}
                    onClick={() => setStatus("idle")}
                  >
                    ارسال پیام جدید
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className={styles.form}
                >
                  <div className={styles.row}>
                    <FormField
                      label="نام و نام خانوادگی"
                      error={errors.name?.message}
                      required
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      {...register("name")}
                    />
                    <FormField
                      label="ایمیل"
                      error={errors.email?.message}
                      required
                      type="email"
                      placeholder="ایمیل"
                      {...register("email")}
                    />
                  </div>
                  <div className={styles.row}>
                    <FormField
                      label="شماره تماس"
                      error={errors.phone?.message}
                      required
                      type="tel"
                      placeholder="شماره تماس"
                      {...register("phone")}
                    />
                    <FormField
                      label="شرکت / سازمان"
                      error={errors.company?.message}
                      type="text"
                      placeholder="شرکت / سازمان"
                      {...register("company")}
                    />
                  </div>
                  <FormSelect
                    label="نوع پروژه"
                    error={errors.projectType?.message}
                    required
                    placeholder="انتخاب کنید"
                    options={projectOptions}
                    {...register("projectType")}
                  />
                  <FormField
                    multiline
                    label="توضیحات پروژه"
                    error={errors.message?.message}
                    required
                    placeholder="توضیحات پروژه خود را بنویسید..."
                    rows={4}
                    {...register("message")}
                  />
                  <FileUpload
                    label={data.fileInfo.label}
                    hint={data.fileInfo.hint}
                  />
                  {status === "error" && (
                    <p className={styles.errorMsg}>{data.submit.error}</p>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={status === "loading"}
                  >
                    {status === "loading"
                      ? data.submit.loading
                      : data.submit.label}
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
