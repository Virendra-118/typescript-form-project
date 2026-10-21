
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import ArrowIcon from "../components/ArrowIcon";
import FormField from "../components/FormField";
import WizardStepPanel from "../components/WizardStepPanel";
import { validateAccountForm } from "../utils/validation";
import { useOnboarding } from "../context/OnboardingContext";
import type { AccountData } from "../types";

type AccountInformationProps = {
  onNext: () => void;
};

function AccountInformation({ onNext }: AccountInformationProps) {
  const { state, dispatch } = useOnboarding();

  const [errors, setErrors] = useState<
    Partial<Record<keyof AccountData, string>>
  >({});
  const [showPassword, setShowPassword] = useState(false);

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
    if (strengthScore <= 2) {
      strength = "Weak";
    } else if (strengthScore <= 4) {
      strength = "Medium";
    } else {
      strength = "Strong";
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const fieldName = name as keyof AccountData;

    dispatch({
      type: "UPDATE_ACCOUNT",
      payload: { [fieldName]: value } as Partial<AccountData>,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateAccountForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onNext();
  }

  return (
    <WizardStepPanel>
      <div className="mt-0">
        <h1 className="text-2xl font-bold tracking-[-0.025em] text-blue-950">
          Account Information
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please fill in your details to get started. You can always change
          this later.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit}>
        <div className="mt-6 flex flex-col gap-4 [@media(min-width:901px)_and_(max-height:760px)]:mt-3 [@media(min-width:901px)_and_(max-height:760px)]:gap-3">
          <FormField
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            error={errors.fullName}
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <div className="w-full">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                maxLength={15}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`w-full appearance-none rounded-lg border px-4 py-3 pr-12 text-sm outline-none focus:ring-2 [@media(min-width:901px)_and_(max-height:760px)]:py-2.5 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-blue-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 5.2A10.7 10.7 0 0112 5c5 0 8.5 4.5 9 7-.2 1.2-1.2 2.7-2.7 4" />
                    <path d="M6.2 6.2C3.9 7.7 2.3 10 2 12c.5 2.5 4 7 10 7 1.1 0 2.1-.2 3-.5" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {password && (
              <div className="mt-2">
                {strength !== "Strong" ? (
                  <p className="text-xs text-emerald-500">
                    Please use a strong password.
                  </p>
                ) : (
                  <p className="text-xs text-emerald-500">
                    Strong password!
                  </p>
                )}
              </div>
            )}
            {errors.password && (
              <p
                id="password-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5 [@media(min-width:901px)_and_(max-height:760px)]:mt-3 [@media(min-width:901px)_and_(max-height:760px)]:pt-3 max-[420px]:gap-3">
          <p className="min-w-0 text-xs text-slate-500 sm:text-sm">
            Already have an account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Sign in
            </a>
          </p>

          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 max-[420px]:px-4"
          >
            Next
            <ArrowIcon direction="right" />
          </button>
        </div>
      </form>
    </WizardStepPanel>
  );
}

export default AccountInformation;
