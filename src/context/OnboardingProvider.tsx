
import { useReducer } from "react";
import type { ReactNode } from "react";
import { OnboardingContext } from "./OnboardingContext";
import type {
  OnboardingAction,
  OnboardingState,
  SavedSubmission,
} from "../types";

const STORAGE_KEY = "devflow-onboarding";
const DRAFT_STORAGE_KEY = "devflow-onboarding-draft";
const DRAFT_ID_KEY = "devflow-onboarding-draft-id";

const initialState: OnboardingState = {
  step: 1,
  accountData: {
    fullName: "",
    email: "",
    password: "",
  },
  businessData: {
    accountType: "Business",
    businessName: "",
    companySize: "",
    industry: "",
  },
  selectedPlan: "Pro",
  files: [],
};

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };

    case "UPDATE_ACCOUNT":
      return {
        ...state,
        accountData: { ...state.accountData, ...action.payload },
      };

    case "UPDATE_BUSINESS":
      return {
        ...state,
        businessData: { ...state.businessData, ...action.payload },
      };

    case "SET_PLAN":
      return { ...state, selectedPlan: action.payload };

    case "SET_FILES":
      return { ...state, files: action.payload };

    case "RESET":
      return {
        ...initialState,
        accountData: { ...initialState.accountData },
        businessData: { ...initialState.businessData },
        files: [],
      };

    default:
      return state;
  }
}

export function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  function saveDraft(): boolean {
    try {
      const existingId = localStorage.getItem(DRAFT_ID_KEY);
      const draftId = existingId ?? crypto.randomUUID();

      const draft = {
        id: draftId,
        step: state.step,
        accountData: {
          fullName: state.accountData.fullName,
          email: state.accountData.email,
        },
        businessData: { ...state.businessData },
        selectedPlan: state.selectedPlan,
        files: [],
        updatedAt: new Date().toISOString(),
      };

      // localStorage.setItem(DRAFT_ID_KEY, draftId);
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));

      return true;
    } catch (error) {
      console.error("Error saving draft:", error);
      return false;
    }
  }

  function saveSubmission(): boolean {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      let previousSubmissions: SavedSubmission[] = [];

      if (savedData) {
        const parsedData: unknown = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          previousSubmissions = parsedData as SavedSubmission[];
        } else if (
          typeof parsedData === "object" &&
          parsedData !== null
        ) {
          const oldSubmission = parsedData as Partial<SavedSubmission>;

          if (oldSubmission.accountData || oldSubmission.businessData) {
            previousSubmissions = [
              oldSubmission as SavedSubmission,
            ];
          }
        }
      }

      const newSubmission: SavedSubmission = {
        id: crypto.randomUUID(),
        accountData: {
          fullName: state.accountData.fullName,
          email: state.accountData.email,
        },
        businessData: { ...state.businessData },
        selectedPlan: state.selectedPlan,
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...previousSubmissions, newSubmission])
      );

      // Remove the completed draft.
      // localStorage.removeItem(DRAFT_STORAGE_KEY);
      // localStorage.removeItem(DRAFT_ID_KEY);

      return true;
    } catch (error) {
      console.error("Error saving submission:", error);
      return false;
    }
  }

  return (
    <OnboardingContext.Provider
      value={{ state, dispatch, saveSubmission, saveDraft }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
