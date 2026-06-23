import Field from "@/components/shared/Field/Field";
import { forwardRef } from "react";
import styles from "./formField.module.css";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, className, ...props }, ref) => (
    <Field label={label} error={error} required={required}>
      <input
        ref={ref}
        className={[styles.input, error && styles.inputError, className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </Field>
  ),
);

FormInput.displayName = "FormInput";
export default FormInput;
