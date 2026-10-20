
import ArrowIcon from "../components/ArrowIcon";
import FileUpload from "../components/FileUpload";
import WizardStepPanel from "../components/WizardStepPanel";
import { useOnboarding } from "../context/OnboardingContext";

type UploadDocumentsProps = {
  onBack: () => void;
  onNext: () => void;
};

function UploadDocuments({ onBack, onNext }: UploadDocumentsProps) {
  const { state, dispatch } = useOnboarding();
  const files = state.files;

  function handleFilesChange(updatedFiles: File[]) {
    dispatch({
      type: "SET_FILES",
      payload: updatedFiles,
    });
  }

  function handleSubmit() {
    onNext();
  }

  return (
    <WizardStepPanel>

        
        
        <div className="mt-0">
          <h1 className="text-2xl font-bold tracking-[-0.025em] text-blue-950">
            Upload your documents
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Securely upload the required documents.
          </p>
        </div>

        
        <div className="mt-6 [@media(min-width:901px)_and_(max-height:760px)]:mt-3">
          <FileUpload
            label="Upload Documents"
            files={files}
            onChange={handleFilesChange}
          />
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
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 max-[420px]:px-4"
          >
            Next
            <ArrowIcon direction="right" />
          </button>
        </div>
    </WizardStepPanel>
  );
}

export default UploadDocuments;
