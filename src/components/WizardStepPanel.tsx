import type { ReactNode } from "react";

type WizardStepPanelProps = {
  children: ReactNode;
  className?: string;
};

function WizardStepPanel({ children, className = "" }: WizardStepPanelProps) {
  return (
    <section className={`mx-auto mt-[clamp(24px,4vh,36px)] w-full min-w-0 [@media(min-width:901px)_and_(max-height:760px)]:mt-4 max-[900px]:mt-6 ${className}`}>
      {children}
    </section>
  );
}

export default WizardStepPanel;
