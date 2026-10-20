
import ArrowIcon from "../components/ArrowIcon";
import FormField from "../components/FormField";
import WizardStepPanel from "../components/WizardStepPanel";
import { useOnboarding } from "../context/OnboardingContext";
import type { ChangeEvent, FormEvent } from "react";
import type { BusinessData } from "../types";

type BusinessInformationProps = {
  onBack: () => void;
  onNext: () => void;
};

function BusinessInformation({ onBack, onNext }: BusinessInformationProps) {
  const { state, dispatch } = useOnboarding();
  const businessData = state.businessData;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_BUSINESS",
      payload: {
        [name]: value,
      } as Partial<BusinessData>,
    });
  }

  function handleAccountTypeChange(type: BusinessData["accountType"]) {
    dispatch({
      type: "UPDATE_BUSINESS",
      payload: {
        accountType: type,
      },
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onNext();
  }

  const selectClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 [@media(min-width:901px)_and_(max-height:760px)]:py-2.5";

  return (
    <WizardStepPanel>

        
        
        <div className="mt-0">
          <h1 className="text-2xl font-bold tracking-[-0.025em] text-blue-950">
            Tell us about your business
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            This helps us tailor the best experience for you.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="mt-6 grid grid-cols-2 gap-3 [@media(min-width:901px)_and_(max-height:760px)]:mt-3">
            {(["Business", "Individual"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleAccountTypeChange(type)}
                aria-pressed={businessData.accountType === type}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition ${
                  businessData.accountType === type
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-blue-300"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    businessData.accountType === type
                      ? "border-blue-600"
                      : "border-slate-300"
                  }`}
                >
                  {businessData.accountType === type && (
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </span>

                {type}
              </button>
            ))}
          </div>

          
          <div className="mt-5 flex flex-col gap-4 [@media(min-width:901px)_and_(max-height:760px)]:mt-3 [@media(min-width:901px)_and_(max-height:760px)]:gap-3">
            <FormField
              label={
                businessData.accountType === "Business"
                  ? "Business Name"
                  : "Full Name"
              }
              name="businessName"
              placeholder={
                businessData.accountType === "Business"
                  ? "Enter business name"
                  : "Enter your full name"
              }
              value={businessData.businessName}
              onChange={handleChange}
              required
            />

            {businessData.accountType === "Business" && (
              <>
                
                <div>
                  <label
                    htmlFor="companySize"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Company Size <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="companySize"
                    name="companySize"
                    value={businessData.companySize}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select company size</option>
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-500 employees">201-500 employees</option>
                    <option value="500+ employees">500+ employees</option>
                  </select>
                </div>

                
                <div>
                  <label
                    htmlFor="industry"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Industry <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="industry"
                    name="industry"
                    value={businessData.industry}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            )}
          </div>

          
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5 [@media(min-width:901px)_and_(max-height:760px)]:mt-3 [@media(min-width:901px)_and_(max-height:760px)]:pt-3 max-[420px]:gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 max-[420px]:px-4"
            >
              <ArrowIcon direction="left" />
              Back
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 max-[420px]:px-4"
            >
              Next
              <ArrowIcon direction="right" />
            </button>
          </div>
        </form>
    </WizardStepPanel>
  );
}

export default BusinessInformation;
