import { useState } from "react";
import type { ChangeEvent } from "react";
import { Formik } from "formik";
import {
  Button,
  Input,
  Text,
  makeStyles,
  Toast,
  ToastTitle,
  Toaster,
  useId,
  useToastController,
} from "@fluentui/react-components";

import ArrowIcon from "../components/ArrowIcon";
import FormField from "../components/FormField";
import WizardStepPanel from "../components/WizardStepPanel";
import { useOnboarding } from "../context/OnboardingContext";
import type { AccountData } from "../types";

const useStyles = makeStyles({
  heading: {
    margin: 0,
    color: "#172554",
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "-0.025em",
  },
  description: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "24px",
  },
  form: { width: "100%" },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "24px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      gap: "12px",
      marginTop: "12px",
    },
  },
  field: { width: "100%", minWidth: 0 },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#334155",
    fontSize: "14px",
    fontWeight: 500,
  },
  requiredMark: { color: "#ef4444" },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    minWidth: 0,
    minHeight: "46px",
    boxSizing: "border-box",
    paddingRight: "64px",
    borderRadius: "8px",
    fontSize: "14px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      minHeight: "42px",
    },
  },
  passwordToggle: { position: "absolute", right: "6px" },
  strength: {
    display: "block",
    marginTop: "8px",
    color: "#10b981",
    fontSize: "12px",
  },
  error: {
    marginTop: "4px",
    color: "#ef4444",
    fontSize: "14px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #f1f5f9",
    "@media (min-width: 901px) and (max-height: 760px)": {
      marginTop: "12px",
      paddingTop: "12px",
    },
    "@media (max-width: 420px)": { gap: "12px" },
  },
  footerText: {
    minWidth: 0,
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
    "@media (max-width: 420px)": { fontSize: "12px" },
  },
  signInLink: {
    color: "#2563eb",
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },
  nextButton: { flexShrink: 0, borderRadius: "8px" },
});

type AccountInformationProps = {
  onNext: () => void;
};

function AccountInformation({ onNext }: AccountInformationProps) {
  const { state, dispatch } = useOnboarding();
  const [showPassword, setShowPassword] = useState(false);
  const styles = useStyles();

  const toasterId = useId("signin-toaster");
  const { dispatchToast } = useToastController(toasterId);

  const formData = state.accountData;
  const password = formData.password || "";

  const passwordChecks = [
    password.length >= 8 && password.length <= 15,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const strengthScore = passwordChecks.filter(Boolean).length;

  let strength = "";

  if (password) {
    if (strengthScore <= 2) strength = "Weak";
    else if (strengthScore <= 4) strength = "Medium";
    else strength = "Strong";
  }

  function handleSignIn() {
    dispatchToast(
      <Toast>
        <ToastTitle>This feature is coming soon!</ToastTitle>
      </Toast>,
      { intent: "info", timeout: 3000 }
    );
  }

  return (
    <WizardStepPanel>
      <Toaster toasterId={toasterId} />

      <div>
        <h1 className={styles.heading}>Account Information</h1>
        <p className={styles.description}>
          Please fill in your details to get started. You can always change
          this later.
        </p>
      </div>

      <Formik<AccountData>
        initialValues={formData}
        validate={(values) => {
          const errors: Partial<Record<keyof AccountData, string>> = {};

          if (!values.fullName.trim()) {
            errors.fullName = "Full name is required";
          }

          if (!values.email.trim()) {
            errors.email = "Email is required";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Please enter a valid email address";
          }

          const currentPassword = values.password || "";

          if (!currentPassword) {
            errors.password = "Password is required";
          } else if (
            currentPassword.length < 8 ||
            currentPassword.length > 15 ||
            !/[A-Z]/.test(currentPassword) ||
            !/[a-z]/.test(currentPassword) ||
            !/[0-9]/.test(currentPassword) ||
            !/[^A-Za-z0-9]/.test(currentPassword)
          ) {
            errors.password =
              "Use 8–15 characters with uppercase, lowercase, a number, and a special character";
          }

          return errors;
        }}
        onSubmit={(values) => {
          dispatch({ type: "UPDATE_ACCOUNT", payload: values });
          onNext();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          function updateField(event: ChangeEvent<HTMLInputElement>) {
            handleChange(event);

            const { name, value } = event.target;

            dispatch({
              type: "UPDATE_ACCOUNT",
              payload: { [name]: value } as Partial<AccountData>,
            });
          }

          return (
            <form
              className={styles.form}
              noValidate
              onSubmit={handleSubmit}
            >
              <div className={styles.fields}>
                <FormField
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onChange={updateField}
                  onBlur={handleBlur}
                  required
                  error={touched.fullName ? errors.fullName : undefined}
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={updateField}
                  onBlur={handleBlur}
                  required
                  error={touched.email ? errors.email : undefined}
                />

                <div className={styles.field}>
                  <label htmlFor="password" className={styles.label}>
                    Password <span className={styles.requiredMark}>*</span>
                  </label>

                  <div className={styles.passwordWrapper}>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password || ""}
                      onChange={(_, data) => {
                        handleChange({
                          target: {
                            name: "password",
                            value: data.value,
                          },
                        } as ChangeEvent<HTMLInputElement>);

                        dispatch({
                          type: "UPDATE_ACCOUNT",
                          payload: { password: data.value },
                        });
                      }}
                      onBlur={handleBlur}
                      placeholder="Enter your password"
                      maxLength={15}
                      autoComplete="new-password"
                      aria-invalid={Boolean(
                        touched.password && errors.password
                      )}
                      aria-describedby={
                        touched.password && errors.password
                          ? "password-error"
                          : undefined
                      }
                      className={styles.passwordInput}
                    />

                    <Button
                      type="button"
                      appearance="subtle"
                      size="small"
                      className={styles.passwordToggle}
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </div>

                  {password && (
                    <Text className={styles.strength} size={200}>
                      {strength === "Strong"
                        ? "Strong password!"
                        : "Please use a strong password."}
                    </Text>
                  )}

                  {touched.password && errors.password && (
                    <p
                      id="password-error"
                      className={styles.error}
                      role="alert"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.footer}>
                <p className={styles.footerText}>
                  Already have an account?{" "}
                  <a
                    href="#"
                    className={styles.signInLink}
                    onClick={(event) => {
                      event.preventDefault();
                      handleSignIn();
                    }}
                  >
                    Sign in
                  </a>
                </p>

                <Button
                  type="submit"
                  appearance="primary"
                  className={styles.nextButton}
                  icon={<ArrowIcon direction="right" />}
                  iconPosition="after"
                >
                  Next
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </WizardStepPanel>
  );
}

export default AccountInformation;
