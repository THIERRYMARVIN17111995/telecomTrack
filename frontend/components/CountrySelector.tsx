'use client';

import React, { useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface CountrySelectorProps {
  name: string;
  control: Control<any>;
  errors?: FieldErrors;
  placeholder?: string;
  isDisabled?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  name,
  control,
  errors,
  placeholder = "Sélectionnez un pays...",
  isDisabled = false,
}) => {
  // Génère la liste des pays une seule fois
  const options = useMemo(() => countryList().getData(), []);

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            value={field.value ? options.find(opt => opt.value === field.value) : null}
            onChange={(val) => field.onChange(val?.value)}
            placeholder={placeholder}
            isDisabled={isDisabled}
          />
        )}
      />
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
};

export default CountrySelector;
