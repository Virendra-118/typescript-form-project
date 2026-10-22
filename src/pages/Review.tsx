import {
  Button,
  Card,
  Text,
  makeStyles,
} from "@fluentui/react-components";
import {
  PersonRegular,
  BuildingRegular,
  StarRegular,
  DocumentRegular,
  ArrowLeftRegular,
  ArrowRightRegular,
} from "@fluentui/react-icons";
import type { ReactNode } from "react";

import { useOnboarding } from "../context/OnboardingContext";
import WizardStepPanel from "../components/WizardStepPanel";
import type { Plan } from "../types";

type ReviewProps = {
  onBack: () => void;
  onSubmit: () => void;
  onEditAccount: () => void;
  onEditBusiness: () => void;
  onEditPlan: () => void;
  onEditDocuments: () => void;
};

const useStyles = makeStyles({
  heading: {
    display: "block",
    color: "#172554",
    fontSize: "24px",
    fontWeight: 700,
  },
  description: {
    display: "block",
    marginTop: "8px",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "24px",
  },
  summary: {
    marginTop: "24px",
    padding: "8px 20px",
    border: "1px solid #dbeafe",
    borderRadius: "12px",
  },
  section: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px 0",
    borderBottom: "1px solid #f1f5f9",
    ":last-child": {
      borderBottom: "none",
    },
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  sectionTitle: {
    display: "block",
    color: "#172554",
    fontWeight: 600,
    fontSize: "14px",
  },
  value: {
    display: "block",
    marginTop: "8px",
    color: "#475569",
    fontSize: "14px",
    overflowWrap: "anywhere",
  },
  secondary: {
    display: "block",
    marginTop: "4px",
    color: "#64748b",
    fontSize: "14px",
    overflowWrap: "anywhere",
  },
  navigation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9",
  },
});

function Review({
  onBack,
  onSubmit,
  onEditAccount,
  onEditBusiness,
  onEditPlan,
  onEditDocuments,
}: ReviewProps) {
  const styles = useStyles();
  const { state } = useOnboarding();
  const { accountData, businessData, selectedPlan, files } = state;

  const planPrices: Record<Plan, string> = {
    Starter: "$0",
    Pro: "$19",
    Enterprise: "$49",
  };

  const sections: {
    title: string;
    icon: ReactNode;
    onEdit: () => void;
    content: ReactNode;
  }[] = [
    {
      title: "Account Information",
      icon: <PersonRegular />,
      onEdit: onEditAccount,
      content: (
        <>
          <Text className={styles.value}>
            {accountData.fullName || "Not provided"}
          </Text>
          <Text className={styles.secondary}>
            {accountData.email || "Not provided"}
          </Text>
        </>
      ),
    },
    {
      title: "Business Details",
      icon: <BuildingRegular />,
      onEdit: onEditBusiness,
      content: (
        <>
          <Text className={styles.value}>
            {businessData.businessName || "Not provided"}
          </Text>
          <Text className={styles.secondary}>
            {businessData.accountType === "Individual"
              ? "Individual"
              : `${businessData.companySize || "Not provided"} / ${
                  businessData.industry || "Not provided"
                }`}
          </Text>
        </>
      ),
    },
    {
      title: "Plan",
      icon: <StarRegular />,
      onEdit: onEditPlan,
      content: (
        <Text className={styles.value}>
          {selectedPlan} Plan / {planPrices[selectedPlan] || "$19"}/month
        </Text>
      ),
    },
    {
      title: "Documents",
      icon: <DocumentRegular />,
      onEdit: onEditDocuments,
      content:
        files.length > 0 ? (
          files.map((file, index) => (
            <Text className={styles.secondary} key={`${file.name}-${index}`}>
              {file.name}
            </Text>
          ))
        ) : (
          <Text className={styles.secondary}>No documents selected</Text>
        ),
    },
  ];

  return (
    <WizardStepPanel>
      <Text className={styles.heading}>Review your information</Text>
      <Text className={styles.description}>
        Please confirm your details before submitting.
      </Text>

      <Card className={styles.summary}>
        {sections.map((section) => (
          <div className={styles.section} key={section.title}>
            <div className={styles.iconBox}>{section.icon}</div>

            <div className={styles.details}>
              <Text className={styles.sectionTitle}>{section.title}</Text>
              {section.content}
            </div>

            <Button
              appearance="subtle"
              size="small"
              onClick={section.onEdit}
            >
              Edit
            </Button>
          </div>
        ))}
      </Card>

      <div className={styles.navigation}>
        <Button
          appearance="subtle"
          icon={<ArrowLeftRegular />}
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          appearance="primary"
          icon={<ArrowRightRegular />}
          iconPosition="after"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </WizardStepPanel>
  );
}

export default Review;