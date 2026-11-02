
const API_URL = "http://localhost:5210/api/onboarding";

export async function submitOnboarding(data: unknown) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit onboarding data.");
  }

  return response.json();
}
