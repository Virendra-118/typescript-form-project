
// import type { AccountData } from "../types";

// export function validateAccountForm(
//   formData: AccountData,
// ): Partial<Record<keyof AccountData, string>> {
//   const errors: Partial<Record<keyof AccountData, string>> = {};

//   if (!formData.fullName.trim()) {
//     errors.fullName = "Please enter your full name.";
//   }

//   if (!formData.email.trim()) {
//     errors.email = "Please enter your email address.";
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//     errors.email = "Please enter a valid email address";
//   }

//   if (!formData.password) {
//     errors.password = "Please set a password.";
//   } else if (formData.password.length < 8) {
//     errors.password = "Password must be at least 8 characters";
//   }

//   return errors;
// }
