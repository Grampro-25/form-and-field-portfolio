export const scopes = ["Website Design", "UI/UX", "E-commerce", "Development", "Not sure yet"] as const;
export const formats = ["Project", "Freelance", "Retainer"] as const;
export const budgets = ["€3k–€5k", "€5k–€10k", "€10k–€20k", "€20k+", "Let's chat first"] as const;
export interface ContactData { mode: string; scope: string[]; format: string; budget: string; name: string; email: string; company: string; timeline: string; note: string; website: string }
export type ContactErrors = Partial<Record<keyof ContactData, string>>;
export function validateContact(data: ContactData): ContactErrors {
  const errors: ContactErrors = {};
  if (!["project", "collaborate"].includes(data.mode)) errors.mode = "Choose a contact mode.";
  if (!data.name?.trim() || data.name.length > 120) errors.name = "Enter your name (up to 120 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "") || data.email.length > 254) errors.email = "Enter an email like name@company.com.";
  if (!Array.isArray(data.scope) || !data.scope.length || data.scope.some(v => !scopes.includes(v as typeof scopes[number]))) errors.scope = "Choose at least one scope.";
  if (!formats.includes(data.format as typeof formats[number])) errors.format = "Choose a format.";
  if (!budgets.includes(data.budget as typeof budgets[number])) errors.budget = "Choose a budget, or let’s chat first.";
  if ((data.note?.length || 0) > 5000) errors.note = "Keep your note under 5,000 characters.";
  if ((data.company?.length || 0) > 200) errors.company = "Keep the company name under 200 characters.";
  if ((data.timeline?.length || 0) > 200) errors.timeline = "Keep the timeline under 200 characters.";
  return errors;
}
