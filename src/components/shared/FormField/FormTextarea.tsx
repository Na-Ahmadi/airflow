import Field from "@/components/shared/Field/Field";
import { forwardRef } from "react";
import styles from "./formField.module.css";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, required, className, ...props }, ref) => (
    <Field label={label} error={error} required={required}>
      <textarea
        ref={ref}
        className={[
          styles.input,
          styles.textarea,
          error && styles.inputError,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </Field>
  ),
);

FormTextarea.displayName = "FormTextarea";
export default FormTextarea;
