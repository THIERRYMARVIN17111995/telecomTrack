'use client';

import React from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface DropdownFieldProps<T> {
  name: string;
  control: Control<any>;
  options: T[];
  optionLabel: keyof T;
  placeholder?: string;
  errors?: FieldErrors;
  disabled?: boolean;
  optionValue?: keyof T;
  className?: string;
}

export function DropdownField<T>({
  name,
  control,
  options,
  optionLabel,
  optionValue,
  placeholder = 'Select...',
  errors,
  disabled = false,
  className = '',
}: DropdownFieldProps<T>) {
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            value={field.value}
            onChange={(e: DropdownChangeEvent) => field.onChange(e.value)}
            options={options}
            optionLabel={optionLabel as string}
            placeholder={placeholder}
            disabled={disabled}
            optionValue={optionValue ? (optionValue as string) : undefined}
            className={`w-full  h-10 dropdown-small  ${errorMessage ? 'p-invalid' : ''}`}

          />
        )}
      />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
}
