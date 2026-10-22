
import type {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import {
  Field,
  Input,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  field: {
    width: "100%",
    minWidth: 0,
  },
  label: {
    color: "#334155",
    fontSize: "14px",
    fontWeight: 500,
  },
  requiredMark: {
    color: "#ef4444",
  },
  input: {
    width: "100%",
    minWidth: 0,
    minHeight: "46px",
    boxSizing: "border-box",
    borderRadius: "8px",
    fontSize: "14px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      minHeight: "42px",
    },
  },
  error: {
    marginTop: "4px",
    color: "#ef4444",
    fontSize: "14px",
  },
});

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

function FormField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  required = false,
  error,
}: FormFieldProps) {
  const styles = useStyles();

  return (
    <Field
      className={styles.field}
      label={
        <span className={styles.label}>
          {label}
          {required && (
            <span className={styles.requiredMark}> *</span>
          )}
        </span>
      }
      validationState={error ? "error" : "none"}
      validationMessage={
        error ? (
          <span id={`${name}-error`} className={styles.error} role="alert">
            {error}
          </span>
        ) : undefined
      }
    >
      <Input
        id={name}
        name={name}
        // type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={styles.input}
      />
    </Field>
  );
}

export default FormField;
