import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import clsx from 'clsx';
import Image from 'next/image';
import invalidInfo from '../assets/alert-triangle.svg'
export default function ValidatedInput({
    label,
    pattern = /^[A-Za-zÀ-ÿ0-9 \-\/'",.%'"“”$]+$/,
    isTheValueValid = (e) => e ? /^[A-Za-zÀ-ÿ0-9 \-\/'",.%'"“”$]+$/.test(e) : true,
    value,
    onChange,
    mandatoryField = false,
    isDisabled = false,
    aditionalClasses = '',
    placeholder = '',
    id = null,
    errorMessage = 'The field cannot be empty.',
    ...props
}){
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (isTheValueValid(inputValue)) {
            onChange(inputValue);
            setError(!pattern.test(inputValue));
        }
    };

    return (
        <div className="w-full flex flex-col justify-between min-w-min">
            <div className="flex w-full relative items-center">
                <Input
                    isDisabled={isDisabled}
                    label={label}
                    onChange={handleChange}
                    value={value}
                    variant='bordered'
                    type={props.type || "text"}
                    id={id}
                    className={clsx(
                        ((mandatoryField && value === "") || error) && 
                        "border-red-500 text-red-500 placeholder-red-500 focus:outline-red-500",
                        aditionalClasses
                    )}
                    classNames={{
                        inputWrapper: clsx(
                            isDisabled ? "group-data-[disabled=true]:bg-grey-200" : "bg-white"
                        ),
                        input: "remove-arrow bg-transparent",
                        label: "font-medium",
                    }}
                    fullWidth
                    isRequired={mandatoryField}
                    {...props}
                />
            </div>
            <div className={clsx(
                "ml-0.5 text-sm text-red-500",
                ((mandatoryField && value === "") || error) ? "visible" : "invisible"
            )}>
                {error && (
                    <span className="flex items-center gap-1">
                        <Image width={15} height={15} src={invalidInfo} alt="invalid value" />
                        {errorMessage}
                    </span>
                )}
            </div>
        </div>
    );
};

