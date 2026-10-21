import { useOnboarding } from "../context/OnboardingContext";
import ArrowIcon from "../components/ArrowIcon";
import WizardStepPanel from "../components/WizardStepPanel";
import type { ReactNode } from "react";
import type { Plan } from "../types";

type ReviewProps = {
  onBack: () => void;
  onSubmit: () => void;
  onEditAccount: () => void;
  onEditBusiness: () => void;
  onEditPlan: () => void;
  onEditDocuments: () => void;
};

function Review({
  onBack,
  onSubmit,
  onEditAccount,
  onEditBusiness,
  onEditPlan,
  onEditDocuments,
}: ReviewProps) {
  const { state } = useOnboarding();
  const { accountData, businessData, selectedPlan, files } = state;

  const planPrices: Record<Plan, string> = {
    Starter: "$0",
    Pro: "$19",
    Enterprise: "$49",
  };

  const sections: {
    title: string;
    icon: ReactNode;
    onEdit: () => void;
    content: ReactNode;
  }[] = [
    {
      title: "Account Information",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20v-2a7 7 0 0 1 14 0v2" strokeLinecap="round" />
        </svg>
      ),
      onEdit: onEditAccount,
      content: (
        <>
          <p className="mt-2 break-words text-sm text-slate-600">
            {accountData.fullName || "Not provided"}
          </p>
          <p className="mt-1 break-all text-sm text-slate-500">
            {accountData.email || "Not provided"}
          </p>
        </>
      ),
    },
    {
      title: "Business Details",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
        </svg>
      ),
      onEdit: onEditBusiness,
      content: (
        <>
          <p className="mt-2 break-words text-sm text-slate-600">
            {businessData.businessName || "Not provided"}
          </p>

          {businessData.accountType === "Individual" ? (
            <p className="mt-1 text-sm text-slate-500">Individual</p>
          ) : (
            <p className="mt-1 break-words text-sm text-slate-500">
              {businessData.companySize || "Not provided"}
              {" / "}
              {businessData.industry || "Not provided"}
            </p>
          )}
        </>
      ),
    },
    {
      title: "Plan",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path
            d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onEdit: onEditPlan,
      content: (
        <p className="mt-2 text-sm text-slate-600">
          {selectedPlan} Plan
          <span className="text-slate-400"> / </span>
          {planPrices[selectedPlan] || "$19"}/month
        </p>
      ),
    },
    {
      title: "Documents",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path
            d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
            strokeLinejoin="round"
          />
          <path d="M14 3v5h5M8 13h8M8 17h5" strokeLinecap="round" />
        </svg>
      ),
      onEdit: onEditDocuments,
      content: (
        <>
          {files.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="break-all text-sm text-slate-500"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              No documents selected
            </p>
          )}
        </>
      ),
    },
  ];

  return (
    <WizardStepPanel>
      <div className="mt-0">
        <h1 className="text-2xl font-bold tracking-[-0.025em] text-blue-950">
          Review your information
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please confirm your details before submitting.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-blue-100 px-4 sm:px-5 [@media(min-width:901px)_and_(max-height:760px)]:mt-3">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className={`flex items-start gap-3 py-3 sm:gap-4 sm:py-3 ${
              index !== sections.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              {section.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-blue-950">
                {section.title}
              </h2>
              {section.content}
            </div>

            <button
              type="button"
              onClick={section.onEdit}
              className="shrink-0 rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Edit
            </button>
          </section>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5 [@media(min-width:901px)_and_(max-height:760px)]:mt-3 [@media(min-width:901px)_and_(max-height:760px)]:pt-3 max-[420px]:gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-blue-600 transition hover:text-blue-800 max-[420px]:px-4"
        >
          <ArrowIcon direction="left" />
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:px-7 max-[420px]:px-4"
        >
          Submit
          <ArrowIcon direction="right" />
        </button>
      </div>
    </WizardStepPanel>
  );
}

export default Review;
