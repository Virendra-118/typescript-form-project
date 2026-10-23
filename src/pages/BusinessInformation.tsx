
import { useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dropdown,
  Field,
  Input,
  Option,
  Radio,
  RadioGroup,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  ArrowLeftRegular,
  ArrowRightRegular,
} from "@fluentui/react-icons";
import WizardStepPanel from "../components/WizardStepPanel";
import { useOnboarding } from "../context/OnboardingContext";
import type { BusinessData } from "../types";

type BusinessInformationProps = {
  onBack: () => void;
  onNext: () => void;
};

type BusinessFormValues = {
  accountType: BusinessData["accountType"];
  businessName: string;
  companySize: string;
  industry: string;
};
const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];
const industries = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Other",
];
const useStyles = makeStyles({
  heading: {
    color: "#172554",
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "-0.025em",
  },
  description: {
    display: "block",
    marginTop: "8px",
    color: tokens.colorNeutralForeground2,
    fontSize: "14px",
    lineHeight: "24px",
  },
  form: { width: "100%", minWidth: 0 },
  accountTypes: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "24px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      marginTop: "12px",
    },
  },
  radioGroup: { width: "100%" },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "20px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      gap: "12px",
      marginTop: "12px",
    },
  },
  field: { width: "100%", minWidth: 0 },
  input: {
    width: "100%",
    minWidth: 0,
    minHeight: "46px",
    boxSizing: "border-box",
    borderRadius: "8px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      minHeight: "40px",
    },
  },
  dropdown: {
    width: "100%",
    minHeight: "46px",
    borderRadius: "8px",
    "@media (min-width: 901px) and (max-height: 760px)": {
      minHeight: "40px",
    },
  },
  navigation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke3}`,
    "@media (min-width: 901px) and (max-height: 760px)": {
      marginTop: "12px",
      paddingTop: "12px",
    },
    "@media (max-width: 420px)": { gap: "12px" },
  },
  button: {
    minHeight: "42px",
    borderRadius: "8px",
    "@media (max-width: 420px)": {
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
});

function BusinessInformation({
  onBack,
  onNext,
}: BusinessInformationProps) {
  const styles = useStyles();
  const { state, dispatch } = useOnboarding();
  const businessData = state.businessData;

  const formik = useFormik<BusinessFormValues>({
    initialValues: {
      accountType: businessData.accountType,
      businessName: businessData.businessName,
      companySize: businessData.companySize,
      industry: businessData.industry,
    },
    validate(values) {
      const errors: Partial<Record<keyof BusinessFormValues, string>> = {};

      if (!values.businessName.trim()) {
        errors.businessName =
          values.accountType === "Business"
            ? "Please enter your business name."
            : "Please enter your full name.";
      }

      if (values.accountType === "Business") {
        if (!values.companySize) {
          errors.companySize = "Please select your company size.";
        }

        if (!values.industry) {
          errors.industry = "Please select your industry.";
        }
      }

      return errors;
    },
    onSubmit() {
      onNext();
    },
  });

  // Keep the shared onboarding state updated as the user edits this form.
  useEffect(() => {
    dispatch({
      type: "UPDATE_BUSINESS",
      payload: {
        ...formik.values,
      } as Partial<BusinessData>,
    });
  }, [formik.values, dispatch]);

  function handleAccountTypeChange(value: string) {
    const accountType = value as BusinessData["accountType"];

    formik.setFieldValue("accountType", accountType);

    if (accountType === "Individual") {
      formik.setFieldValue("companySize", "");
      formik.setFieldValue("industry", "");
    }
  }

  return (
    <WizardStepPanel>
      <div>
        <Text className={styles.heading}>
          Tell us about your business
        </Text>

        <Text className={styles.description}>
          This helps us tailor the best experience for you.
        </Text>
      </div>

      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className={styles.accountTypes}>
          <RadioGroup
            className={styles.radioGroup}
            layout="horizontal"
            value={formik.values.accountType}
            onChange={(_, data) => handleAccountTypeChange(data.value)}
            aria-label="Account type"
          >
            <Radio value="Business" label="Business" />
            <Radio value="Individual" label="Individual" />
          </RadioGroup>
        </div>

        <div className={styles.fields}>
          <Field
            label={
              formik.values.accountType === "Business"
                ? "Business Name"
                : "Full Name"
            }
            required
            validationState={
              formik.touched.businessName && formik.errors.businessName
                ? "error"
                : "none"
            }
            validationMessage={
              formik.touched.businessName
                ? formik.errors.businessName
                : undefined
            }
          >
            <Input
              className={styles.input}
              id="businessName"
              name="businessName"
              placeholder={
                formik.values.accountType === "Business"
                  ? "Enter business name"
                  : "Enter your full name"
              }
              value={formik.values.businessName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(
                formik.touched.businessName && formik.errors.businessName
              )}
            />
          </Field>

          {formik.values.accountType === "Business" && (
            <>
              <Field
                label="Company Size"
                required
                validationState={
                  formik.touched.companySize && formik.errors.companySize
                    ? "error"
                    : "none"
                }
                validationMessage={
                  formik.touched.companySize
                    ? formik.errors.companySize
                    : undefined
                }
              >
                <Dropdown
                  className={styles.dropdown}
                  placeholder="Select company size"
                  value={formik.values.companySize}
                  selectedOptions={
                    formik.values.companySize
                      ? [formik.values.companySize]
                      : []
                  }
                  onOptionSelect={(_, data) => {
                    formik.setFieldValue("companySize", data.optionValue ?? "");
                  }}
                  onBlur={() => formik.setFieldTouched("companySize", true)}
                  aria-label="Company size"
                >
                  {companySizes.map((size) => (
                    <Option key={size} value={size}>
                      {size}
                    </Option>
                  ))}
                </Dropdown>
              </Field>

              <Field
                label="Industry"
                required
                validationState={
                  formik.touched.industry && formik.errors.industry
                    ? "error"
                    : "none"
                }
                validationMessage={
                  formik.touched.industry
                    ? formik.errors.industry
                    : undefined
                }
              >
                <Dropdown
                  className={styles.dropdown}
                  placeholder="Select industry"
                  value={formik.values.industry}
                  selectedOptions={
                    formik.values.industry
                      ? [formik.values.industry]
                      : []
                  }
                  onOptionSelect={(_, data) => {
                    formik.setFieldValue("industry", data.optionValue ?? "");
                  }}
                  onBlur={() => formik.setFieldTouched("industry", true)}
                  aria-label="Industry"
                >
                  {industries.map((industry) => (
                    <Option key={industry} value={industry}>
                      {industry}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
            </>
          )}
        </div>

        <div className={styles.navigation}>
          <Button
            className={styles.button}
            type="button"
            appearance="secondary"
            icon={<ArrowLeftRegular />}
            onClick={onBack}
          >
            Back
          </Button>

          <Button
            className={styles.button}
            type="submit"
            appearance="primary"
            icon={<ArrowRightRegular />}
            iconPosition="after"
          >
            Next
          </Button>
        </div>
      </form>
    </WizardStepPanel>
  );
}

export default BusinessInformation;
