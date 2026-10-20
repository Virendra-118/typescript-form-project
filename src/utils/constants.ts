import type { PlanDetails } from "../types";

export const PLANS: PlanDetails[] = [
  {
    name: "Starter",
    price: "0",
    description: "For getting started",
    features: ["Basic features", "1 team member", "5 projects"],
  },
  {
    name: "Pro",
    price: "19",
    description: "For growing teams",
    features: ["Advanced features", "10 team members", "Unlimited projects"],
  },
  {
    name: "Enterprise",
    price: "49",
    description: "For larger teams",
    features: ["All features", "Unlimited members", "Priority support"],
  },
];

export const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Other",
];
