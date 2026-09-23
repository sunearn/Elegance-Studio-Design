export const PROJECT_TYPES = ['Residential', 'Villa', 'Apartment', 'Penthouse', 'Office', 'Hospitality', 'Renovation'] as const;
export const PROJECT_BUDGETS = ['Under ₹10L', '₹10L–₹25L', '₹25L–₹50L', '₹50L–₹1Cr', '₹1Cr+'] as const;

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  area: string;
  budget: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  name: '', email: '', phone: '', projectType: '', location: '', area: '', budget: '', message: '',
};

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (values.phone.trim() && !/^\+?[\d\s().-]{7,20}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number, including country code if needed.';
  if (!PROJECT_TYPES.some((type) => type === values.projectType)) errors.projectType = 'Choose the type of project you have in mind.';
  if (values.location.trim().length < 2) errors.location = 'Add the project city or location.';
  if (values.area.trim().length > 0 && values.area.trim().length < 2) errors.area = 'Add an approximate area or write “Not sure yet”.';
  if (values.message.trim().length < 10) errors.message = 'Share a little more about what you are planning.';
  return errors;
}
