
import { useEffect, useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Toaster,
  Toast,
  ToastTitle,
  useToastController,
} from "@fluentui/react-components";

import AccountInformation from "./pages/AccountInformation";
import BusinessInformation from "./pages/BusinessInformation";
import ChoosePlan from "./pages/ChoosePlan";
import UploadDocuments from "./pages/UploadDocuments";
import Review from "./pages/Review";
import Success from "./pages/Success";
import OnboardingLayout from "./components/OnboardingLayout";

import { useOnboarding } from "./context/OnboardingContext";
import type { OnboardingState } from "./types";

function App() {
  const { state, dispatch, saveSubmission, saveDraft } = useOnboarding();
  const { dispatchToast } = useToastController("devflow-toaster");

  const step = state.step;

  // Tracks whether the user opened a step from the Review page.
  const [returnToReview, setReturnToReview] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function goToStep(nextStep: OnboardingState["step"]) {
    dispatch({
      type: "SET_STEP",
      payload: nextStep,
    });
  }

  // Save the current draft before navigating to the next step. 
  function handleNext(normalNextStep: OnboardingState["step"]) {
    const saved = saveDraft();

    if (!saved) {
      dispatchToast(
        <Toast>
          <ToastTitle>Unable to save your progress.</ToastTitle>
        </Toast>,
        {
          intent: "error",
          timeout: 3000,
        },
      );

      return;
    }
    // Return to Review after editing a section.
    if (returnToReview) {
      setReturnToReview(false);
      goToStep(5);
      return;
    }
    goToStep(normalNextStep);
  }

  function handleEditStep(editStep: OnboardingState["step"]) {
    setReturnToReview(true);
    goToStep(editStep);
  }

  function handleSubmit() {
    const saved = saveSubmission();

    if (!saved) {
      dispatchToast(
        <Toast>
          <ToastTitle>Unable to submit onboarding. Please try again.</ToastTitle>
        </Toast>,
        {
          intent: "error",
          timeout: 3000,
        },
      );

      return;
    }

    dispatchToast(
      <Toast>
        <ToastTitle>Onboarding submitted successfully!</ToastTitle>
      </Toast>,
      {
        intent: "success",
        timeout: 3000,
      },
    );

    setReturnToReview(false);
    goToStep(6);
  }

  function handleGoToDashboard() {
    setReturnToReview(false);
    dispatch({ type: "RESET" });
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <Toaster
        toasterId="devflow-toaster"
        position="top-end"
        pauseOnHover
      />

      {step >= 1 && step <= 5 && (
        <OnboardingLayout currentStep={step - 1}>
          {step === 1 && (
            <AccountInformation onNext={() => handleNext(2)} />
          )}

          {step === 2 && (
            <BusinessInformation
              onBack={() => goToStep(1)}
              onNext={() => handleNext(3)}
            />
          )}

          {step === 3 && (
            <ChoosePlan
              onBack={() => goToStep(2)}
              onNext={() => handleNext(4)}
            />
          )}

          {step === 4 && (
            <UploadDocuments
              onBack={() => goToStep(3)}
              onNext={() => handleNext(5)}
            />
          )}

          {step === 5 && (
            <Review
              onBack={() => goToStep(4)}
              onSubmit={handleSubmit}
              onEditAccount={() => handleEditStep(1)}
              onEditBusiness={() => handleEditStep(2)}
              onEditPlan={() => handleEditStep(3)}
              onEditDocuments={() => handleEditStep(4)}
            />
          )}
        </OnboardingLayout>
      )}

      {step === 6 && (
        <OnboardingLayout currentStep={4}>
          <Success onGoToDashboard={handleGoToDashboard} />
        </OnboardingLayout>
      )}
    </FluentProvider>
  );
}

export default App;
