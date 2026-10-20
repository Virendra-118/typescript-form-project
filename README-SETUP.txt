DEVFLOW ONBOARDING UPDATE

Copy the src files/folders from this package into your project's src folder.
This project uses React + JavaScript and Tailwind CSS v3.

Concepts used:
- useReducer: one reducer manages onboarding state changes.
- Context API + useContext: pages access shared state without passing it through every level.
- useEffect: saves ordinary onboarding data to localStorage when state changes.
- useState: used for local field validation errors.
- Local Storage: persists name, email, business details, selected plan, and current step.

Important storage notes:
- Password is intentionally NOT saved to localStorage because storing passwords there is unsafe.
- Selected File objects are not saved to localStorage. Browsers do not restore file inputs after refresh for security reasons. File names will remain in state while navigating between pages, but selected files are lost after a full page refresh.
- Files are not uploaded to a server. Submit is a demo flow only.
- Client-side validation is for user experience, not a replacement for server-side validation.
