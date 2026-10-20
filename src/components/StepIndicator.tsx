const steps = [
  "Create your account",
  "Tell us about your business",
  "Choose your plan",
  "Upload documents",
  "Review & submit",
];

function StepIndicator({ currentStep = 0 }: { currentStep?: number }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-2 sm:px-4">
      <div className="relative">
        
        <div className="absolute left-[10%] right-[10%] top-[18px] h-1 -translate-y-1/2 rounded-full bg-slate-200" />
        <div
          className="absolute left-[10%] top-[18px] h-1 -translate-y-1/2 rounded-full bg-blue-600 transition-all duration-300"
          style={{
            width: `${(Math.min(currentStep, 4) / 4) * 80}%`,
          }}
        />        
        <div className="relative grid grid-cols-5">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isHighlighted = isCompleted || isActive;

            return (
              <div
                key={step}
                className="flex min-w-0 flex-col items-center"
              >
                
                <div
                  className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors duration-300 ${
                    isHighlighted
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-600"
                  }`}
                >
                  {index + 1}
                </div>

                
                <span
                  className={`mt-3 w-full px-0.5 text-center text-[10px] leading-tight sm:px-1 sm:text-xs ${
                    isActive
                      ? "font-semibold text-blue-600"
                      : isCompleted
                      ? "font-medium text-slate-700"
                      : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StepIndicator;
