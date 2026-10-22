
import {
  Badge,
  Button,
  Card,
  Text,
  makeStyles,
} from "@fluentui/react-components";
import {
  CheckmarkCircleRegular,
  ArrowLeftRegular,
  ArrowRightRegular,
} from "@fluentui/react-icons";

import WizardStepPanel from "../components/WizardStepPanel";
import { useOnboarding } from "../context/OnboardingContext";
import type { Plan } from "../types";

type ChoosePlanProps = {
  onBack: () => void;
  onNext: () => void;
};

const plans: { name: Plan; price: string; features: string[] }[] = [
  {
    name: "Starter",
    price: "$0",
    features: ["Basic features", "1 team member", "5 projects"],
  },
  {
    name: "Pro",
    price: "$19",
    features: ["Advanced features", "10 team members", "Unlimited projects"],
  },
  {
    name: "Enterprise",
    price: "$49",
    features: ["All features", "Unlimited members", "Priority support"],
  },
];

const useStyles = makeStyles({
  heading: {
    display: "block",
    color: "#172554",
    fontSize: "24px",
    fontWeight: 700,
  },
  description: {
    display: "block",
    marginTop: "6px",
    color: "#64748b",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "24px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
    },
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
    padding: "18px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    overflow: "visible",
    cursor: "pointer",
    "&:hover": {
      // borderColor: "#93c5fd",
    },
  },
  selected: {
    // borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  popular: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    backgroundColor: "#2563eb",
    color: "#ffffff",
    whiteSpace: "nowrap",
    fontSize: "11px",
  },
  planName: {
    color: "#172554",
    fontSize: "16px",
    fontWeight: 600,
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
  },
  price: {
    color: "#172554",
    fontSize: "28px",
    fontWeight: 700,
  },
  muted: {
    color: "#64748b",
    fontSize: "12px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
    padding: 0,
    margin: "8px 0 16px",
    listStyleType: "none",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#475569",
    fontSize: "13px",
  },
  check: {
    color: "#10b981",
    flexShrink: 0,
  },
  selectButton: {
    width: "100%",
    marginTop: "auto",
  },
  navigation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #f1f5f9",
  },
});

function ChoosePlan({ onBack, onNext }: ChoosePlanProps) {
  const styles = useStyles();
  const { state, dispatch } = useOnboarding();

  function selectPlan(plan: Plan) {
    dispatch({ type: "SET_PLAN", payload: plan });
  }

  return (
    <WizardStepPanel>
      <div>
        <Text className={styles.heading}>Select your plan</Text>
        <Text className={styles.description}>
          Choose the plan that fits your needs.
        </Text>
      </div>

      <div className={styles.grid}>
        {plans.map((plan) => {
          const selected = state.selectedPlan === plan.name;

          return (
            <Card
              key={plan.name}
              className={`${styles.card} ${selected ? styles.selected : ""}`}
              onClick={() => selectPlan(plan.name)}
            >
              {plan.name === "Pro" && (
                <Badge className={styles.popular} appearance="filled">
                  Most Popular
                </Badge>
              )}

              <Text className={styles.planName}>{plan.name}</Text>

              <div className={styles.priceRow}>
                <Text className={styles.price}>{plan.price}</Text>
                <Text className={styles.muted}>/month</Text>
              </div>

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li className={styles.feature} key={feature}>
                    <CheckmarkCircleRegular
                      className={styles.check}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={styles.selectButton}
                appearance={selected ? "primary" : "outline"}
                onClick={(event) => {
                  event.stopPropagation();
                  selectPlan(plan.name);
                }}
              >
                {selected ? "Selected" : "Select Plan"}
              </Button>
            </Card>
          );
        })}
      </div>

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
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </WizardStepPanel>
  );
}

export default ChoosePlan;
