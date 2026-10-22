
import {
  Badge,
  Button,
  Card,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { CheckmarkCircleRegular } from "@fluentui/react-icons";
import type { PlanDetails } from "../types";

type PlanCardProps = {
  plan: PlanDetails;
  selected: boolean;
  onSelect: () => void;
};

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    minWidth: 0,
    padding: "20px",
    boxSizing: "border-box",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    textAlign: "left",
    cursor: "pointer",
    transition: "transform 200ms, border-color 200ms, box-shadow 200ms",
    ":hover": {
      transform: "translateY(-4px)",
      // borderColor: tokens.colorBrandStroke1,
      boxShadow: tokens.shadow8,
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "2px",
    },
  },
  selected: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: "#eff6ff",
    boxShadow: `0 0 0 2px ${tokens.colorBrandBackground2}`,
  },
  popularBadge: {
    alignSelf: "flex-start",
    marginBottom: "8px",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: 600,
  },
  name: {
    color: "#172554",
    fontSize: "18px",
    fontWeight: 600,
  },
  description: {
    marginTop: "4px",
    color: tokens.colorNeutralForeground2,
    fontSize: "14px",
  },
  price: {
    display: "flex",
    alignItems: "baseline",
    gap: "5px",
    marginTop: "16px",
    color: "#172554",
    fontSize: "30px",
    fontWeight: 700,
  },
  period: {
    color: tokens.colorNeutralForeground2,
    fontSize: "14px",
    fontWeight: 400,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
    marginTop: "20px",
    marginBottom: "24px",
    padding: 0,
    listStyleType: "none",
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    color: tokens.colorNeutralForeground2,
    fontSize: "14px",
  },
  checkIcon: {
    flexShrink: 0,
    color: "#10b981",
    fontSize: "18px",
  },
  selectButton: {
    width: "100%",
    marginTop: "auto",
  },
});

function PlanCard({ plan, selected, onSelect }: PlanCardProps) {
  const styles = useStyles();

  return (
    <Card
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onSelect}
      aria-label={`${plan.name} plan, $${plan.price} per month`}
      aria-pressed={selected}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      {plan.name === "Pro" && (
        <Badge appearance="filled" className={styles.popularBadge}>
          MOST POPULAR
        </Badge>
      )}

      <Text className={styles.name}>{plan.name}</Text>

      <Text className={styles.description}>{plan.description}</Text>

      <Text className={styles.price}>
        ${plan.price}
        <Text className={styles.period}>/month</Text>
      </Text>

      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li className={styles.feature} key={feature}>
            <CheckmarkCircleRegular
              className={styles.checkIcon}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={styles.selectButton}
        appearance={selected ? "primary" : "secondary"}
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        {selected ? "Selected" : "Select Plan"}
      </Button>
    </Card>
  );
}

export default PlanCard;
