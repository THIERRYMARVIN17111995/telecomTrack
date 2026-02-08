'use client';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';

interface FormCalendarProps {
  name: string;
  control: Control<any>;
  errors?: FieldErrors;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

export default function FormCalendar({
  name,
  control,
  errors,
  label,
  placeholder,
  disabled = false,
  id,
}: FormCalendarProps) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id || name} className="font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={null as Nullable<Date>}
        render={({ field }) => (
          <Calendar
            {...field}
            id={id || name}
            value={field.value}
            onChange={(e) => field.onChange(e.value)}
            placeholder={placeholder}
            disabled={disabled}
            showIcon
            className={`w-full h-10 ${errorMessage ? 'p-invalid' : ''}`}
          />
        )}
      />

      {errorMessage && (
        <small className="text-red-500">{errorMessage}</small>
      )}
    </div>
  );
}
