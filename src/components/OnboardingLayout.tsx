import type { ReactNode } from "react";
import { makeStyles } from "@fluentui/react-components";
import leftImage from "../assets/leftimg.jpg";
import StepIndicator from "./StepIndicator";

type OnboardingLayoutProps = {
  currentStep: number;
  children: ReactNode;
};

const benefits = [
  { title: "Build faster", description: "Bring your ideas to life with ease.", icon: "" },
  { title: "Stay secure", description: "Your data is always protected.", icon: "🛡" },
  { title: "Grow together", description: "Join a community of creators and teams.", icon: "👥" },
];

const useStyles = makeStyles({
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(340px, 0.82fr) minmax(0, 1.18fr)",
    minHeight: "100vh",
    padding: "clamp(12px, 2vw, 24px)",
    boxSizing: "border-box",
    overflowX: "clip",
    color: "#172554",
    background: "#fff",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      padding: 0,
    },
    "@media (min-width: 901px) and (max-height: 760px)": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  },
  left: {
    position: "relative",
    isolation: "isolate",
    minWidth: 0,
    overflow: "hidden",
    background: "#edf4ff",
    "@media (max-width: 900px)": { minHeight: "340px" },
    "@media (max-width: 420px)": { minHeight: "320px" },
  },
  image: {
    position: "absolute",
    inset: 0,
    zIndex: -2,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "bottom",
    "@media (max-width: 900px)": { objectPosition: "center 76%" },
  },
  overlay: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    pointerEvents: "none",
    background: "linear-gradient(to bottom, #f2f7ff66, #f2f7ff1a, #dee7ff1a)",
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "600px",
    padding: "clamp(32px, 5vh, 56px) clamp(24px, 5vw, 56px)",
    "@media (max-width: 900px)": {
      minHeight: "340px",
      boxSizing: "border-box",
      padding: "24px clamp(22px, 6vw, 36px) 30px",
    },
    "@media (max-width: 420px)": { minHeight: "320px" },
    "@media (min-width: 901px) and (max-height: 760px)": {
      paddingTop: "24px",
    },
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "22px",
    fontWeight: 750,
    letterSpacing: "-0.04em",
    color: "#172554",
    textDecoration: "none",
    "@media (max-width: 900px)": { gap: "9px", fontSize: "18px" },
  },
  mark: {
    display: "grid",
    placeItems: "center",
    width: "32px",
    height: "32px",
    borderRadius: "11px",
    background: "linear-gradient(145deg, #5332e8, #316df4)",
    boxShadow: "0 5px 15px #3b54ec33",
    "@media (max-width: 900px)": { width: "28px", height: "28px" },
  },
  markShape: {
    width: "17px",
    height: "22px",
    borderRadius: "2px 12px 12px 2px",
    background: "#dce8ff",
    clipPath: "polygon(0 0,64% 0,100% 50%,64% 100%,0 100%,39% 50%)",
  },
  welcome: {
    maxWidth: "410px",
    marginTop: "clamp(38px, 6vh, 72px)",
    "@media (min-width: 901px) and (max-height: 760px)": { marginTop: "24px" },
    "@media (max-width: 900px)": { maxWidth: "340px", marginTop: "28px" },
  },
  heading: {
    margin: 0,
    fontSize: "clamp(34px, 3.25vw, 48px)",
    fontWeight: 760,
    lineHeight: 1.12,
    letterSpacing: "-0.045em",
    "@media (max-width: 900px)": { maxWidth: "300px", fontSize: "clamp(28px, 7vw, 36px)" },
  },
  accent: {
    display: "block",
    color: "#3566ed",
    "@media (max-width: 900px)": { display: "inline" },
  },
  description: {
    maxWidth: "390px",
    marginTop: "15px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.65,
    "@media (max-width: 900px)": {
      maxWidth: "320px",
      marginTop: "9px",
      fontSize: "13px",
    },
  },
  benefits: {
    display: "grid",
    gap: "16px",
    marginTop: "28px",
    padding: 0,
    listStyle: "none",
    "@media (min-width: 901px) and (max-height: 760px)": { gap: "8px", marginTop: "16px" },
    "@media (max-width: 900px)": { display: "none" },
  },
  benefit: { display: "flex", alignItems: "center", gap: "12px" },
  benefitIcon: {
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#e2ebffd9",
    color: "#315fe0",
  },
  benefitText: { display: "grid", gap: "2px" },
  benefitTitle: { color: "#1e2e50", fontSize: "14px", fontWeight: 650 },
  benefitDescription: { color: "#64748b", fontSize: "12px", lineHeight: 1.4 },
  right: {
    display: "flex",
    justifyContent: "center",
    minWidth: 0,
    overflowX: "clip",
    padding: "clamp(24px, 4vh, 40px) clamp(24px, 4vw, 56px)",
    "@media (min-width: 901px) and (max-height: 760px)": { paddingTop: "12px", paddingBottom: "12px" },
    "@media (max-width: 900px)": { padding: "24px clamp(18px, 5vw, 32px) 32px" },
    "@media (max-width: 420px)": { paddingLeft: "16px", paddingRight: "16px" },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "880px",
    minWidth: 0,
  },
});

function OnboardingLayout({ currentStep, children }: OnboardingLayoutProps) {
  const s = useStyles();

  return (
    <div className={s.layout}>
      <aside className={s.left}>
        <img className={s.image} src={leftImage} alt="" />
        <div className={s.overlay} />

        <div className={s.content}>
          <a className={s.logo} href="#" aria-label="DevFlow home">
            <span className={s.mark}><span className={s.markShape} /></span>
            <span>Dev<span style={{ color: "#2563eb" }}>Flow</span></span>
          </a>

          <div className={s.welcome}>
            <h1 className={s.heading}>
              Welcome to <span className={s.accent}>DevFlow!</span>
            </h1>
            <p className={s.description}>
              Let&apos;s get you set up. It only takes a few minutes to create
              your account and start your journey.
            </p>
          </div>

          <ul className={s.benefits}>
            {benefits.map((item) => (
              <li className={s.benefit} key={item.title}>
                <span className={s.benefitIcon}>{item.icon}</span>
                <span className={s.benefitText}>
                  <strong className={s.benefitTitle}>{item.title}</strong>
                  <small className={s.benefitDescription}>{item.description}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={s.right}>
        <div className={s.form}>
          <StepIndicator currentStep={currentStep} />
          {children}
        </div>
      </main>
    </div>
  );
}

export default OnboardingLayout;
