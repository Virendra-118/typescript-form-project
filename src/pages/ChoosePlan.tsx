
import ArrowIcon from "../components/ArrowIcon";
import CheckIcon from "../components/CheckIcon";
import WizardStepPanel from "../components/WizardStepPanel";
import { useOnboarding } from "../context/OnboardingContext";
import type { Plan } from "../types";

type ChoosePlanProps = {
  onBack: () => void;
  onNext: () => void;
};

function ChoosePlan({ onBack, onNext }: ChoosePlanProps) {
  const { state, dispatch } = useOnboarding();
  const selectedPlan = state.selectedPlan;

  const plans: { name: Plan; price: string; features: string[] }[] = [
    {
      name: "Starter",
      price: "$0",
      features: ["Basic features", "1 team member", "5 projects"],
    },
    {
      name: "Pro",
      price: "$19",
      features: [
        "Advanced features",
        "10 team members",
        "Unlimited projects",
      ],
    },
    {
      name: "Enterprise",
      price: "$49",
      features: [
        "All features",
        "Unlimited members",
        "Priority support",
      ],
    },
  ];

  function handleSelectPlan(planName: Plan) {
    dispatch({
      type: "SET_PLAN",
      payload: planName,
    });
  }

  return (
    <WizardStepPanel>

        
        
        <div className="mt-0">
          <h1 className="text-2xl font-bold tracking-[-0.025em] text-blue-950">
            Select your plan
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Choose the plan that fits your needs.
          </p>
        </div>

        
        <div className="mt-6 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 [@media(min-width:901px)_and_(max-height:760px)]:mt-3">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            const isPopular = plan.name === "Pro";

            return (
              <div
                key={plan.name}
                onClick={() => handleSelectPlan(plan.name)}
                className={`relative flex min-w-0 cursor-pointer flex-col rounded-xl border-2 p-4 transition-all duration-200 sm:p-4 lg:p-5 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                
                {isPopular && (
                  <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                    Most Popular
                  </span>
                )}

                
                <h2 className="text-base font-semibold text-blue-950 lg:text-lg">
                  {plan.name}
                </h2>

                
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-blue-950">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500">
                    /month
                  </span>
                </div>

                
                <ul className="mt-5 flex-1 space-y-3 [@media(min-width:901px)_and_(max-height:760px)]:mt-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm leading-5 text-slate-600"
                    >
                      <span className="shrink-0 font-semibold text-emerald-500">
                        <CheckIcon />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                
                <button
                  type="button"
            onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan.name);
                  }}
                  aria-pressed={isSelected}
                  className={`mt-6 w-full rounded-lg px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-100 [@media(min-width:901px)_and_(max-height:760px)]:mt-3 ${
                    isSelected
                      ? "border border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-200 bg-white text-blue-600 hover:border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Plan"}
                </button>
              </div>
            );
          })}
        </div>

        
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5 [@media(min-width:901px)_and_(max-height:760px)]:mt-3 [@media(min-width:901px)_and_(max-height:760px)]:pt-3 max-[420px]:gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-medium text-blue-600 transition hover:text-blue-800 max-[420px]:px-4"
          >
            <ArrowIcon direction="left" />
            Back
          </button>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 max-[420px]:px-4"
          >
            Next
            <ArrowIcon direction="right" />
          </button>
        </div>
    </WizardStepPanel>
  );
}

export default ChoosePlan;
