
// import welcomeImage from "../assets/Welcome_page_image.jpg";
// import ArrowIcon from "../components/ArrowIcon";
// import CheckIcon from "../components/CheckIcon";

// function Onboarding({ onGetStarted }: { onGetStarted: () => void }) {
//   const steps = [
//     "Create your account",
//     "Tell us about your business",
//     "Choose your plan",
//     "Upload documents",
//     "Review & submit",
//   ];

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-50 p-3 sm:p-5 lg:p-8">
//       <div className="w-full max-w-[760px] rounded-xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6 md:p-7">
        
//         <h1 className="text-xl font-bold tracking-tight text-blue-950">
//           DevFlow
//         </h1>

        
//         <div className="mt-5 grid grid-cols-1 items-center gap-5 sm:mt-6 sm:gap-6 md:grid-cols-[1fr_0.95fr] md:gap-3">
          
//           <section className="order-1 min-w-0">
//             <h2 className="text-2xl font-bold leading-tight text-blue-950">
//               Welcome to DevFlow!
//             </h2>

//             <p className="mt-2 max-w-[300px] text-sm leading-[1.55] text-slate-500">
//               Let's get you set up. It only takes a few minutes
//               to create your account and start your journey.
//             </p>

            
//             <ul className="mt-5 space-y-3">
//               {steps.map((step) => (
//                 <li
//                   key={step}
//                   className="flex items-center gap-2.5 text-md text-slate-700"
//                 >
//                   <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold leading-none text-white">
//                     <CheckIcon />
//                   </span>

//                   <span>{step}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>

          
//           <section className="order-2 flex min-w-0 items-center justify-center md:translate-y-3">
//             <img
//               src={welcomeImage}
//               alt="Person completing an onboarding checklist"
//               className="block h-[350px] w-full max-w-[280px] object-contain sm:max-w-[320px] md:max-w-none"
//             />
//           </section>
//         </div>

        
//         <footer className="mt-6 flex flex-col-reverse items-start justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
//           <p className="text-xs text-slate-500 sm:text-sm">
//             Already have an account?{" "}
//             <a
//               href="#"
//               className="font-medium text-blue-600 hover:underline"
//             >
//               Sign in
//             </a>
//           </p>

//           <button
//             type="button"
//             onClick={onGetStarted}
//             className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-xs font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:text-sm"
//           >
//             Get Started
//             <ArrowIcon direction="right" />
//           </button>
//         </footer>
//       </div>
//     </main>
//   );
// }

// export default Onboarding;
