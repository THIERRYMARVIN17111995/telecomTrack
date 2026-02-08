import React from "react";
import { Controller, Control, RegisterOptions, FieldValues, Path } from "react-hook-form";
import { Calendar } from "primereact/calendar";

interface RHFCustomCalendarProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    timeOnly?: boolean;
    showIcon?: boolean;
    icon?: React.ReactNode | (() => React.ReactNode);
    rules?: RegisterOptions<T, Path<T>>;
}

export default function RHFCustomCalendar<T extends FieldValues>({
    name,
    control,
    label,
    timeOnly = false,
    showIcon = true,
    icon = null,
    rules = {},
}: RHFCustomCalendarProps<T>) {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className="font-bold block mb-1">{label}</label>}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <>
                        <Calendar
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            showIcon={showIcon}
                            timeOnly={timeOnly}
                            icon={icon}
                            className="w-full  h-10"
                        />
                        {fieldState?.error && (
                            <small className="text-red-600">{fieldState.error.message}</small>
                        )}
                    </>
                )}
            />
        </div>
    );
}
