import Field from "@/components/shared/Field/Field";
import Icon from "@/components/shared/Icon/Icon";
import { forwardRef } from "react";
import styles from "./formField.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      required,
      options,
      placeholder,
      className,
      defaultValue = "",
      ...props
    },
    ref,
  ) => (
    <Field label={label} error={error} required={required}>
      <div className={styles.selectWrapper}>
        <select
          ref={ref}
          defaultValue={defaultValue}
          className={[
            styles.input,
            styles.select,
            error && styles.inputError,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={16} className={styles.selectIcon} />
      </div>
    </Field>
  ),
);

FormSelect.displayName = "FormSelect";
export default FormSelect;
