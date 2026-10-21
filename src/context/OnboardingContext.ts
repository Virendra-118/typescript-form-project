
import { createContext, useContext } from "react";
import type { Dispatch } from "react";
import type {
  OnboardingAction,
  OnboardingState,
} from "../types";

export type OnboardingContextValue = {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
  saveSubmission: () => boolean;
  saveDraft: () => boolean;
};

export const OnboardingContext = createContext<
  OnboardingContextValue | undefined
>(undefined);

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used inside OnboardingProvider",
    );
  }

  return context;
}
