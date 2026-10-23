// import { useEffect, useState } from "react";
// import {
//   FluentProvider,
//   webLightTheme,
//   Toaster,
//   Toast,
//   ToastTitle,
//   useToastController,
// } from "@fluentui/react-components";

// import AccountInformation from "./pages/AccountInformation";
// import BusinessInformation from "./pages/BusinessInformation";
// import ChoosePlan from "./pages/ChoosePlan";
// import UploadDocuments from "./pages/UploadDocuments";
// import Review from "./pages/Review";
// import Success from "./pages/Success";
// import OnboardingLayout from "./components/OnboardingLayout";

// import { useOnboarding } from "./context/OnboardingContext";
// import type { OnboardingState } from "./types";

// function App() {
//   const { state, dispatch, saveSubmission, saveDraft } = useOnboarding();
//   const { dispatchToast } = useToastController("devflow-toaster");

//   const step = state.step;
//   const [returnToReview, setReturnToReview] = useState(false);
  

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [step]);

//   function goToStep(nextStep: OnboardingState["step"]) {
//     dispatch({ type: "SET_STEP", payload: nextStep });
//   }

//   function handleNext(nextStep: OnboardingState["step"]) {
//     if (!saveDraft()) {
//       dispatchToast(
//         <Toast>
//           <ToastTitle>Unable to save your progress.</ToastTitle>
//         </Toast>,
//         { intent: "error", timeout: 3000 }
//       );
//       return;
//     }

//     if (returnToReview) {
//       setReturnToReview(false);
//       goToStep(5);
//       return;
//     }

//     goToStep(nextStep);
//   }

//   function handleEditStep(editStep: OnboardingState["step"]) {
//     setReturnToReview(true);
//     goToStep(editStep);
//   }

//   function handleSubmit() {
//     if (!saveSubmission()) {
//       dispatchToast(
//         <Toast>
//           <ToastTitle>
//             Unable to submit onboarding. Please try again.
//           </ToastTitle>
//         </Toast>,
//         { intent: "error", timeout: 3000 }
//       );
//       return;
//     }

//     dispatchToast(
//       <Toast>
//         <ToastTitle>Onboarding submitted successfully!</ToastTitle>
//       </Toast>,
//       { intent: "success", timeout: 3000 }
//     );

//     setReturnToReview(false);
//     goToStep(6);
//   }

//   function handleGoToDashboard() {
//     setReturnToReview(false);
//     dispatch({ type: "RESET" });
//   }

//   return (
//     <FluentProvider theme={webLightTheme}>
//       <Toaster
//         toasterId="devflow-toaster"
//         position="top-end"
//         pauseOnHover
//       />

//       {step >= 1 && step <= 5 && (
//         <OnboardingLayout currentStep={step - 1}>
//           {step === 1 && (
//             <AccountInformation onNext={() => handleNext(2)} />
//           )}

//           {step === 2 && (
//             <BusinessInformation
//               onBack={() => goToStep(1)}
//               onNext={() => handleNext(3)}
//             />
//           )}

//           {step === 3 && (
//             <ChoosePlan
//               onBack={() => goToStep(2)}
//               onNext={() => handleNext(4)}
//             />
//           )}

//           {step === 4 && (
//             <UploadDocuments
//               onBack={() => goToStep(3)}
//               onNext={() => handleNext(5)}
//             />
//           )}

//           {step === 5 && (
//             <Review
//               onBack={() => goToStep(4)}
//               onSubmit={handleSubmit}
//               onEditAccount={() => handleEditStep(1)}
//               onEditBusiness={() => handleEditStep(2)}
//               onEditPlan={() => handleEditStep(3)}
//               onEditDocuments={() => handleEditStep(4)}
//             />
//           )}
//         </OnboardingLayout>
//       )}

//       {step === 6 && (
//         <OnboardingLayout currentStep={4}>
//           <Success onGoToDashboard={handleGoToDashboard} />
//         </OnboardingLayout>
//       )}
//     </FluentProvider>
//   );
// }

// export default App;




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

  // Stores the specific step opened from Review for editing
  const [returnToReviewStep, setReturnToReviewStep] =
    useState<OnboardingState["step"] | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function goToStep(nextStep: OnboardingState["step"]) {
    dispatch({ type: "SET_STEP", payload: nextStep });
  }

  function handleNext(nextStep: OnboardingState["step"]) {
    if (!saveDraft()) {
      dispatchToast(
        <Toast>
          <ToastTitle>Unable to save your progress.</ToastTitle>
        </Toast>,
        { intent: "error", timeout: 3000 }
      );
      return;
    }

    // Return to Review only when the edited step's Next button is clicked
    if (returnToReviewStep === step) {
      setReturnToReviewStep(null);
      goToStep(5);
      return;
    }

    // Otherwise, follow the normal onboarding sequence
    goToStep(nextStep);
  }

  function handleEditStep(editStep: OnboardingState["step"]) {
    setReturnToReviewStep(editStep);
    goToStep(editStep);
  }

  function handleSubmit() {
    if (!saveSubmission()) {
      dispatchToast(
        <Toast>
          <ToastTitle>
            Unable to submit onboarding. Please try again.
          </ToastTitle>
        </Toast>,
        { intent: "error", timeout: 3000 }
      );
      return;
    }

    dispatchToast(
      <Toast>
        <ToastTitle>Onboarding submitted successfully!</ToastTitle>
      </Toast>,
      { intent: "success", timeout: 3000 }
    );

    setReturnToReviewStep(null);
    goToStep(6);
  }

  function handleGoToDashboard() {
    setReturnToReviewStep(null);
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
