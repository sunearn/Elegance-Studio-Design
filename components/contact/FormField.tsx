'use client';

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

type FieldProps = { id: string; label: string; error?: string; required?: boolean; children: ReactNode };

export function FormField({ id, label, error, required, children }: FieldProps) {
  const errorId = `${id}-error`;
  return <div className={`start-project-field${error ? ' has-error' : ''}`}>
    <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    {children}
    {error && <span className="start-project-field__error" id={errorId}>{error}</span>}
  </div>;
}

type TextInputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & { id: string; label: string; error?: string };
export function TextInputField({ id, label, error, required, ...props }: TextInputFieldProps) {
  return <FormField id={id} label={label} error={error} required={required}><input id={id} name={id} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} /></FormField>;
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & { id: string; label: string; error?: string; options: readonly string[]; placeholder?: string };
export function SelectField({ id, label, error, required, options, placeholder = 'Select an option', ...props }: SelectFieldProps) {
  return <FormField id={id} label={label} error={error} required={required}><select id={id} name={id} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props}><option value="">{placeholder}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></FormField>;
}

type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & { id: string; label: string; error?: string };
export function TextareaField({ id, label, error, required, ...props }: TextareaFieldProps) {
  return <FormField id={id} label={label} error={error} required={required}><textarea id={id} name={id} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} /></FormField>;
}
