import { cn } from '@/lib/utils';
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

const LabelWrapper = ({
    name,
    className,
    classLabel,
    label,
    error,
    children,
  }: {
    name?: string;
    className?: string;
    label?: string;
    error:
      | string
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<any>> 
      | undefined;
    children: React.ReactNode;
    classLabel?: string;
  }) => {
    return (
      <>
        <label   htmlFor={`${name}`} className={cn(" w-full flex gap-1  items-center hover:cursor-pointer", className)}>
          {label ? (
            <label
              htmlFor={`${name}`}
              className={cn(" mtt-center !justify-start !text-[13px] flex-1 ", classLabel)}
            >
              {label}
            </label>
          ) : null}
          <p className=" text-red-600 !text-[12px] ">{error as string}</p>
        </label>
        <label className=" w-full" htmlFor={`${name}`}>
          {children}
        </label>
      </>
    );
  };
  

export default LabelWrapper
