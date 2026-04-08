import { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  htmlFor: string;
  helpText?: string;
  error?: string | null;
  children: ReactNode;
};

export function FormField({
  label,
  htmlFor,
  helpText,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {helpText ? <div className="field-help">{helpText}</div> : null}
      {error ? <div className="error-text">{error}</div> : null}
    </div>
  );
}
