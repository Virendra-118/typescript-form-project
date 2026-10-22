import {
  Button,
  Text,
  makeStyles,
} from "@fluentui/react-components";
import {
  ArrowLeftRegular,
  ArrowRightRegular,
} from "@fluentui/react-icons";

import FileUpload from "../components/FileUpload";
import WizardStepPanel from "../components/WizardStepPanel";
import { useOnboarding } from "../context/OnboardingContext";

type UploadDocumentsProps = {
  onBack: () => void;
  onNext: () => void;
};

const useStyles = makeStyles({
  heading: {
    display: "block",
    color: "#172554",
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "-0.025em",
  },
  description: {
    display: "block",
    marginTop: "8px",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "24px",
  },
  uploadArea: {
    marginTop: "24px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      marginTop: "12px",
    },
  },
  navigation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #f1f5f9",
    "@media (min-width: 901px) and (max-height: 760px)": {
      marginTop: "12px",
      paddingTop: "12px",
    },
  },
});

function UploadDocuments({ onBack, onNext }: UploadDocumentsProps) {
  const styles = useStyles();
  const { state, dispatch } = useOnboarding();

  function handleFilesChange(updatedFiles: File[]) {
    dispatch({ type: "SET_FILES", payload: updatedFiles });
  }

  return (
    <WizardStepPanel>
      <Text className={styles.heading}>Upload your documents</Text>

      <Text className={styles.description}>
        Securely upload the required documents.
      </Text>

      <div className={styles.uploadArea}>
        <FileUpload
          label="Upload Documents"
          files={state.files}
          onChange={handleFilesChange}
        />
      </div>

      <div className={styles.navigation}>
        <Button
          appearance="secondary"
          icon={<ArrowLeftRegular />}
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          appearance="primary"
          icon={<ArrowRightRegular />}
          iconPosition="after"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </WizardStepPanel>
  );
}

export default UploadDocuments;