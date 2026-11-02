
export type AccountData = {
  fullName: string;
  email: string;
  password: string;
};

export type BusinessData = {
  accountType: "Business" | "Individual";
  businessName: string;
  companySize: string;
  industry: string;
};

export type Plan = "Starter" | "Pro" | "Enterprise";

export type PlanDetails = {
  name: Plan;
  price: string;
  description: string;
  features: string[];
};

// Previous code:
// export type OnboardingState = {
//   step: number;
//   accountData: AccountData;
//   businessData: BusinessData;
//   selectedPlan: Plan;
//   files: File[];
// };

// Updated code:
export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6;

export type OnboardingState = {
  step: OnboardingStep;
  accountData: AccountData;
  businessData: BusinessData;
  selectedPlan: Plan;
  files: File[];
};

// Previous code:
// export type OnboardingAction =
//   | { type: "SET_STEP"; payload: number }
//   | { type: "UPDATE_ACCOUNT"; payload: Partial<AccountData> }
//   | { type: "UPDATE_BUSINESS"; payload: Partial<BusinessData> }
//   | { type: "SET_PLAN"; payload: Plan }
//   | { type: "SET_FILES"; payload: File[] }
//   | { type: "RESET" };

// Updated code:
export type OnboardingAction =
  | { type: "SET_STEP"; payload: OnboardingStep }
  | { type: "UPDATE_ACCOUNT"; payload: Partial<AccountData> }
  | { type: "UPDATE_BUSINESS"; payload: Partial<BusinessData> }
  | { type: "SET_PLAN"; payload: Plan }
  | { type: "SET_FILES"; payload: File[] }
  | { type: "RESET" };

export type SavedSubmission = {
  id: string;
  accountData: {
    fullName: string;
    email: string;
  };
  businessData: BusinessData;
  selectedPlan: Plan;
  submittedAt: string;
};

// New context type for API and draft functions
export type OnboardingContextType = {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  saveDraft: () => boolean;
  saveSubmission: () => Promise<boolean>;
};
