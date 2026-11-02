
import { useReducer } from "react";
import type { ReactNode } from "react";
import { OnboardingContext } from "./OnboardingContext";
import type {
  OnboardingAction,
  OnboardingState,
  // SavedSubmission, // Used by the previous localStorage submission logic
} from "../types";

const DRAFT_STORAGE_KEY = "devflow-onboarding-draft";
const DRAFT_ID_KEY = "devflow-onboarding-draft-id";

// Replace 7001 with your actual .NET HTTPS port.
// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://localhost:7294/api/Onboarding";

const API_URL = "https://localhost:7294/api/Onboarding";

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

  // Save draft data in localStorage
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

  // Save final submission in MongoDB through ASP.NET Core API
  async function saveSubmission(): Promise<boolean> {
    try {
      const submissionData = {
        accountData: {
          fullName: state.accountData.fullName,
          email: state.accountData.email,
        },
        businessData: {
          ...state.businessData,
        },
        selectedPlan: state.selectedPlan,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("API Error:", errorMessage);
        return false;
      }

      const result = await response.json();
      console.log("Onboarding submitted successfully:", result);

      // Remove the completed draft after successful API submission.
      // localStorage.removeItem(DRAFT_STORAGE_KEY);
      // localStorage.removeItem(DRAFT_ID_KEY);

      return true;
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      return false;
    }

    /*
    OLD LOCALSTORAGE SUBMISSION CODE
    --------------------------------

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
    */
  }

  return (
    <OnboardingContext.Provider
      value={{ state, dispatch, saveSubmission, saveDraft }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
