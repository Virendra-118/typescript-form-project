
import { Badge, ProgressBar, makeStyles } from "@fluentui/react-components";

const steps = [
  "Create your account",
  "Tell us about your business",
  "Choose your plan",
  "Upload documents",
  "Review & submit",
];

const useStyles = makeStyles({
  container: {
    width: "100%",
    maxWidth: "768px",
    margin: "0 auto",
    padding: "0 8px",
    boxSizing: "border-box",
    "@media (min-width: 640px)": { padding: "0 16px" },
  },
  stepList: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  },
  track: {
    position: "absolute",
    top: "17px",
    left: "10%",
    right: "10%",
    zIndex: 0,
  },
  progress: {
    width: "100%",
    "& .fui-ProgressBar__progressBar": {
      backgroundColor: "#e2e8f0",
    },
    "& .fui-ProgressBar__bar": {
      backgroundColor: "#2563eb",
      transition: "transform 300ms ease",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 0,
  },
  circle: {
    zIndex: 1,
    width: "36px",
    minWidth: "36px",
    height: "36px",
    boxSizing: "border-box",
    fontSize: "14px",
    fontWeight: 500,
  },
  label: {
    width: "100%",
    marginTop: "12px",
    padding: "0 2px",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "10px",
    lineHeight: 1.25,
    overflowWrap: "break-word",
    "@media (min-width: 640px)": {
      padding: "0 4px",
      fontSize: "12px",
    },
  },
  activeLabel: { color: "#2563eb", fontWeight: 600 },
  completedLabel: { color: "#334155", fontWeight: 500 },
  upcomingLabel: { color: "#64748b" },
});

type StepIndicatorProps = {
  currentStep?: number;
};

function StepIndicator({ currentStep = 0 }: StepIndicatorProps) {
  const styles = useStyles();
  const activeStep = Math.max(0, Math.min(currentStep, steps.length - 1));
  const progress = (activeStep / (steps.length - 1)) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.stepList}>
        <div className={styles.track}>
          <ProgressBar
            value={progress}
            max={100}
            thickness="medium"
            color="brand"
            className={styles.progress}
            aria-label="Onboarding progress"
          />
        </div>

        {steps.map((step, index) => {
          const completed = index < activeStep;
          const active = index === activeStep;

          return (
            <div className={styles.item} key={step}>
              <Badge
                appearance={completed || active ? "filled" : "outline"}
                color={completed || active ? "brand" : "informative"}
                shape="circular"
                size="large"
                className={styles.circle}
                aria-label={`Step ${index + 1}: ${step}${
                  active
                    ? ", current step"
                    : completed
                      ? ", completed"
                      : ""
                }`}
              >
                {index + 1}
              </Badge>

              <span
                className={`${styles.label} ${
                  active
                    ? styles.activeLabel
                    : completed
                      ? styles.completedLabel
                      : styles.upcomingLabel
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepIndicator;
