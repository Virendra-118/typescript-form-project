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

export type OnboardingState = {
  step: number;
  accountData: AccountData;
  businessData: BusinessData;
  selectedPlan: Plan;
  files: File[];
};

export type OnboardingAction =
  | { type: "SET_STEP"; payload: number }
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
