import Field from "@/components/shared/Field/Field";
import { forwardRef } from "react";
import styles from "./formField.module.css";

type FormFieldProps = {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "rows">;

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, required, multiline = false, rows, className, ...props }, ref) => {
    const inputClass = [styles.input, error && styles.inputError, className]
      .filter(Boolean)
      .join(" ");

    return (
      <Field label={label} error={error} required={required}>
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${inputClass} ${styles.textarea}`}
            rows={rows}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClass}
            {...props}
          />
        )}
      </Field>
    );
  },
);

FormField.displayName = "FormField";
export default FormField;
