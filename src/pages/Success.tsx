
import { Button } from "@fluentui/react-components";
import WizardStepPanel from "../components/WizardStepPanel";

function Success({
  onGoToDashboard,
}: {
  onGoToDashboard: () => void;
}) {
  return (
    <WizardStepPanel className="text-center">
      <div className="mx-auto w-full max-w-md text-center">
        <div className="relative mx-auto mb-6 flex h-36 w-48 items-center justify-center">
          <div className="absolute h-32 w-40 rounded-full bg-blue-50" />
          <div className="absolute h-24 w-28 rounded-full bg-blue-100/60" />

          <span className="absolute left-4 top-5 h-2 w-1 rotate-45 rounded-sm bg-indigo-400" />
          <span className="absolute left-10 top-12 h-2 w-1 rotate-12 rounded-sm bg-amber-400" />
          <span className="absolute left-2 top-20 h-2 w-1 rotate-45 rounded-sm bg-blue-500" />
          <span className="absolute bottom-6 left-8 h-2 w-1 rotate-12 rounded-sm bg-emerald-400" />
          <span className="absolute right-5 top-7 h-2 w-1 rotate-45 rounded-sm bg-blue-400" />
          <span className="absolute right-9 top-14 h-2 w-1 rotate-12 rounded-sm bg-amber-400" />
          <span className="absolute right-2 top-20 h-2 w-1 rotate-45 rounded-sm bg-indigo-400" />
          <span className="absolute bottom-7 right-8 h-2 w-1 rotate-12 rounded-sm bg-emerald-400" />

          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-300 bg-emerald-500 shadow-lg shadow-emerald-200/70">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-12 w-12"
              aria-hidden="true"
            >
              <path
                d="M5 12.5L10 17L19.5 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          You're all set!
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Your account has been created successfully.
          <br />
          Welcome to DevFlow!
        </p>

        <Button
          type="button"
          appearance="primary"
          onClick={onGoToDashboard}
          className="mt-6 [@media(min-width:901px)_and_(max-height:760px)]:mt-3"
          style={{
            minHeight: "48px",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    </WizardStepPanel>
  );
}

export default Success;
