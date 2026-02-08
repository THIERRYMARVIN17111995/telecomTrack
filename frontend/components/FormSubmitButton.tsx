'use client';

import { Button } from 'primereact/button';

interface FormSubmitButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  severity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  loadingIcon?: string;
}

export default function FormSubmitButton({
  label,
  loading = false,
  disabled = false,
  className = '',
  severity = 'success',
  type = 'submit',
  icon = 'pi pi-check',
    loadingIcon = 'pi pi-spin pi-spinner'
}: FormSubmitButtonProps) {
  return (
    <Button
      type={type}
      label={loading ? 'Processing...' : label}
      icon={loading ? loadingIcon : icon}
      disabled={disabled || loading}
      className={`w-full h-10 mt-2 ${className}`}
      severity={severity}
    />
  );
}
