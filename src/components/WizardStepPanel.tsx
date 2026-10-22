import type { ReactNode } from "react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  panel: {
    width: "100%",
    minWidth: 0,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "clamp(24px, 4vh, 36px)",

    "@media (min-width: 901px) and (max-height: 760px)": {
      marginTop: "16px",
    },

    "@media (max-width: 900px)": {
      marginTop: "24px",
    },
  },
});

type WizardStepPanelProps = {
  children: ReactNode;
  className?: string;
};

function WizardStepPanel({
  children,
  className = "",
}: WizardStepPanelProps) {
  const styles = useStyles();

  return (
    <section className={`${styles.panel} ${className}`}>
      {children}
    </section>
  );
}

export default WizardStepPanel;
