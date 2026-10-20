
import type { PlanDetails } from "../types";
import CheckIcon from "./CheckIcon";

type PlanCardProps = {
  plan: PlanDetails;
  selected: boolean;
  onSelect: () => void;
};

function PlanCard({ plan, selected, onSelect }: PlanCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${plan.name} plan, $${plan.price} per month`}
      className={`flex h-full w-full flex-col rounded-xl border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
        selected
          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
          : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      {plan.name === "Pro" && (
        <span className="mb-2 self-start rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          MOST POPULAR
        </span>
      )}

      <span className="text-lg font-semibold text-blue-950">
        {plan.name}
      </span>

      <span className="mt-1 text-sm text-slate-500">
        {plan.description}
      </span>

      <span className="mt-4 text-3xl font-bold text-blue-950">
        ${plan.price}
        <span className="text-sm font-normal text-slate-500">
          /month
        </span>
      </span>

      <ul className="mt-5 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start text-sm text-slate-600"
          >
            <span
              aria-hidden="true"
              className="mr-2 font-semibold text-emerald-500"
            >
              <CheckIcon />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <span
        className={`mt-6 rounded-lg px-4 py-2 text-center text-sm font-semibold transition-colors ${
          selected
            ? "bg-blue-600 text-white"
            : "border border-slate-200 text-blue-600"
        }`}
      >
        {selected ? "Selected" : "Select Plan"}
      </span>
    </button>
  );
}

export default PlanCard;
