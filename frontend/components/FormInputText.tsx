'use client';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';

interface FormInputTextProps {
    name: string;
    control: Control<any>;
    errors?: FieldErrors;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
}

export default function FormInputText({
    name,
    control,
    errors,
    label,
    placeholder,
    disabled = false,
    id,
}: FormInputTextProps) {
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
                defaultValue=""
                render={({ field }) => (
                    <InputText
                        {...field}
                        value={field.value ?? ''}
                        id={id || name}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`w-full h-10 ${errorMessage ? 'p-invalid' : ''} `}
                    />
                )}
            />


            {errorMessage && (
                <small className="text-red-500">{errorMessage}</small>
            )}
        </div>
    );
}
