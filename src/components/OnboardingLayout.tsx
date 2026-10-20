import type { ReactNode } from "react";
import leftImage from "../assets/leftimg.jpg";
import StepIndicator from "./StepIndicator";

type OnboardingLayoutProps = {
  currentStep: number;
  children: ReactNode;
};

const benefits = [
  { title: "Build faster", description: "Bring your ideas to life with ease.", icon: "bolt" },
  { title: "Stay secure", description: "Your data is always protected.", icon: "shield" },
  { title: "Grow together", description: "Join a community of creators and teams.", icon: "people" },
] as const;

function BenefitIcon({ name }: { name: (typeof benefits)[number]["icon"] }) {
  if (name === "bolt") {
    return <path d="M13.2 2.5 5.8 13h5l-.7 8.5L18.2 11h-5.1l.1-8.5Z" />;
  }

  if (name === "shield") {
    return <path d="M12 2.8 19 5.5v5.3c0 4.4-2.8 8.1-7 10.4-4.2-2.3-7-6-7-10.4V5.5l7-2.7Zm-3 9.1 2 2 4-4" />;
  }

  return <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.8 19v-1.2c0-2.1 2.2-3.8 5.2-3.8s5.2 1.7 5.2 3.8V19H2.8Zm10 0v-1.2c0-1.1-.4-2.1-1.2-2.9 1-.6 2.3-.9 3.8-.9 3 0 5.2 1.7 5.2 3.8V19h-7.8Z" />;
}

function OnboardingLayout({ currentStep, children }: OnboardingLayoutProps) {
  return (
    <div className="grid min-h-screen w-full max-w-full grid-cols-[minmax(340px,0.82fr)_minmax(0,1.18fr)] overflow-x-clip bg-white p-[clamp(12px,2vw,24px)] text-[#172554] [@media(min-width:901px)_and_(max-height:760px)]:py-3 max-[900px]:grid-cols-1 max-[900px]:p-0">
      <aside className="relative isolate min-w-0 overflow-hidden bg-[#edf4ff] max-[900px]:min-h-[340px] max-[420px]:min-h-[320px]">
        <img
          className="absolute inset-0 z-[-2] h-full w-full object-cover object-bottom max-[900px]:object-[center_76%]"
          src={leftImage}
          alt=""
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-[#f2f7ff]/40 via-[#f2f7ff]/10 to-[#dee7ff]/10"
        />

        <div className="relative z-10 w-full max-w-[600px] px-[clamp(24px,5vw,56px)] py-[clamp(32px,5vh,56px)] [@media(min-width:901px)_and_(max-height:760px)]:pt-6 max-[900px]:min-h-[340px] max-[900px]:px-[clamp(22px,6vw,36px)] max-[900px]:pt-6 max-[900px]:pb-[30px] max-[420px]:min-h-[320px]">
          <a
            className="inline-flex items-center gap-3 text-[22px] font-[750] tracking-[-0.04em] text-[#172554] no-underline max-[900px]:gap-[9px] max-[900px]:text-lg"
            href="#"
            aria-label="DevFlow home"
          >
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-[11px] bg-[linear-gradient(145deg,#5332e8_0%,#316df4_72%)] shadow-[0_5px_15px_rgba(59,84,236,0.2)] max-[900px]:h-7 max-[900px]:w-7">
              <span className="h-[22px] w-[17px] rounded-[2px_12px_12px_2px] bg-[#dce8ff] [clip-path:polygon(0_0,64%_0,100%_50%,64%_100%,0_100%,39%_50%)]" />
            </span>
            <span>Dev<span className="text-[#2563eb]">Flow</span></span>
          </a>

          <div className="mt-[clamp(38px,6vh,72px)] max-w-[410px] [@media(min-width:901px)_and_(max-height:760px)]:mt-6 max-[900px]:mt-7 max-[900px]:max-w-[340px]">
            <h1 className="m-0 max-w-none text-[clamp(34px,3.25vw,48px)] font-[760] leading-[1.12] tracking-[-0.045em] text-[#172554] max-[900px]:max-w-[300px] max-[900px]:text-[clamp(28px,7vw,36px)]">
              Welcome to <span className="block text-[#3566ed] max-[900px]:inline">DevFlow!</span>
            </h1>
            <p className="mt-[15px] max-w-[390px] text-[15px] leading-[1.65] text-[#64748b] max-[900px]:mt-[9px] max-[900px]:max-w-[320px] max-[900px]:text-[13px]">
              Let&apos;s get you set up. It only takes a few minutes to create your account and start your journey.
            </p>
          </div>

          <ul className="mt-7 grid list-none gap-4 p-0 [@media(min-width:901px)_and_(max-height:760px)]:mt-4 [@media(min-width:901px)_and_(max-height:760px)]:gap-2 max-[900px]:hidden">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-center gap-3">
                <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#e2ebff]/85 text-[#315fe0]">
                  <svg
                    className="h-[17px] w-[17px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <BenefitIcon name={benefit.icon} />
                  </svg>
                </span>
                <span className="grid gap-0.5">
                  <strong className="text-sm font-[650] text-[#1e2e50]">{benefit.title}</strong>
                  <small className="text-xs leading-[1.4] text-[#64748b]">{benefit.description}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex min-w-0 items-stretch justify-center overflow-x-clip px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vh,40px)] [@media(min-width:901px)_and_(max-height:760px)]:px-[clamp(24px,4vw,56px)] [@media(min-width:901px)_and_(max-height:760px)]:py-3 max-[900px]:px-[clamp(18px,5vw,32px)] max-[900px]:pt-6 max-[900px]:pb-8 max-[420px]:px-4">
        <div className="mx-auto flex w-full min-w-0 max-w-[880px] flex-col">
          <StepIndicator currentStep={currentStep} />
          {children}
        </div>
      </main>
    </div>
  );
}

export default OnboardingLayout;
