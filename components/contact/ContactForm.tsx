'use client';

import { useState, type FormEvent } from 'react';
import { EMPTY_CONTACT_FORM, PROJECT_BUDGETS, PROJECT_TYPES, validateContactForm, type ContactFormErrors, type ContactFormValues } from '@/lib/contact-form';
import { SelectField, TextareaField, TextInputField } from './FormField';

type ContactFormProps = { onSubmit?: (values: ContactFormValues) => Promise<void> };
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitError, setSubmitError] = useState('');

  const updateField = (name: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status === 'error') { setStatus('idle'); setSubmitError(''); }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') return;
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      setSubmitError('A few details need your attention before your brief is ready.');
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    setStatus('loading');
    setSubmitError('');
    try {
      if (onSubmit) await onSubmit(values);
      else await new Promise((resolve) => window.setTimeout(resolve, 650));
      setStatus('success');
    } catch {
      setStatus('error');
      setSubmitError('We could not prepare your brief just now. Please try again.');
    }
  };

  if (status === 'success') return <div className="start-project-success" role="status" aria-live="polite">
    <span className="start-project-success__mark" aria-hidden="true">✓</span>
    <span className="eyebrow">Your brief is ready</span>
    <h3 className="display">Thank you, {values.name.trim().split(/\s+/)[0]}.</h3>
    <p>Your project details are ready. We appreciate you sharing what you have in mind.</p>
    <button className="start-project-success__edit" type="button" onClick={() => setStatus('idle')}>Review or edit your brief</button>
  </div>;

  return <form className="start-project-form" onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'}>
    {submitError && <div className={`start-project-form__message${status === 'error' ? ' is-error' : ''}`} role="alert">{submitError}</div>}
    <div className="start-project-form__grid">
      <TextInputField id="name" label="Name" autoComplete="name" placeholder="Your name" required value={values.name} error={errors.name} onChange={(event) => updateField('name', event.target.value)} />
      <TextInputField id="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" required value={values.email} error={errors.email} onChange={(event) => updateField('email', event.target.value)} />
      <TextInputField id="phone" label="Phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" value={values.phone} error={errors.phone} onChange={(event) => updateField('phone', event.target.value)} />
      <SelectField id="projectType" label="Project type" options={PROJECT_TYPES} placeholder="Choose a project type" required value={values.projectType} error={errors.projectType} onChange={(event) => updateField('projectType', event.target.value)} />
      <TextInputField id="location" label="Location" autoComplete="address-level2" placeholder="City or neighbourhood" required value={values.location} error={errors.location} onChange={(event) => updateField('location', event.target.value)} />
      <TextInputField id="area" label="Approximate area" placeholder="e.g. 1,800 sq ft" value={values.area} error={errors.area} onChange={(event) => updateField('area', event.target.value)} />
      <SelectField id="budget" label="Indicative budget" options={PROJECT_BUDGETS} placeholder="Choose a range" value={values.budget} error={errors.budget} onChange={(event) => updateField('budget', event.target.value)} />
      <TextareaField id="message" label="Tell us about your project" placeholder="The space, what you hope to change, and what home means to you…" required rows={4} value={values.message} error={errors.message} onChange={(event) => updateField('message', event.target.value)} />
    </div>
    <div className="start-project-form__footer"><p><span>*</span> Required fields</p><button className="start-project-submit" type="submit" disabled={status === 'loading'}><span>{status === 'loading' ? 'PREPARING YOUR BRIEF' : 'PREPARE MY PROJECT BRIEF'}</span><span aria-hidden="true">{status === 'loading' ? '···' : '↗'}</span></button></div>
    {status === 'loading' && <p className="start-project-form__loading" role="status"><i aria-hidden="true" /> Preparing your project brief…</p>}
  </form>;
}
