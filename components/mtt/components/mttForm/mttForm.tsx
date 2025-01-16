"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as RadixSelect from '@radix-ui/react-select';
import * as RadixPopover from '@radix-ui/react-popover';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

import {
  FormProvider,
  useFormContext,
  FieldValues,
  UseFormReturn,
  Controller,
} from "react-hook-form";

import { addDays, format, parse } from "date-fns";
import {
  CalendarCheck,
  Calendar as CalendarIcon,
  CalendarPlus2,
  Check,
  CheckIcon,
  ChevronDown,
  CircleCheckBig,

  Clock,

  House,
  Lock,
  Mail,
  Phone,
  ShieldAlert,
  Smartphone,
  TextCursorInput,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Checkbox as CHK } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";



import Link from "next/link";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import LabelWrapper from "./LabelWrapper";
import { MttSearchCombo } from "../mttSearchCombo";
import IsLoading from "../Isloading";


type ChildClass = {
  children: React.ReactNode;
  className?: string;
};

type OptionType = { value: string; label: string };

export default function MttForm<T extends FieldValues>({
  Methods,
  isLoading,
  children,
  className,
  title,
  indicator,
  onSubmit,
  debugMode
}: {
  Methods: UseFormReturn<T, any, undefined>;
  children: React.ReactNode;
  debugMode?:boolean;
  onSubmit: (data: T) => void;
  className?: string;
  title?: string;
  indicator?: boolean;
  isLoading?:boolean;
}) {

  const [position, setPosition] = useState({ x: 607, y: -300 });

  const [watchVals, setWatchVals] = useState(false)
  const [errors, setWatchErros] = useState(false)



  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const [position2, setPosition2] = useState({ x: 607, y: 90 });
  const [isDragging2, setIsDragging2] = useState(false);
  const [offset2, setOffset2] = useState({ x: 0, y: 0 });

  const [position3, setPosition3] = useState({ x: 400, y: 90 });
  const [isDragging3, setIsDragging3] = useState(false);
  const [offset3, setOffset3] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseDown2 = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging2(true);
    setOffset2({
      x: e.clientX - position2.x,
      y: e.clientY - position2.y,
    });
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging2) {
      setPosition2({
        x: e.clientX - offset2.x,
        y: e.clientY - offset2.y,
      });
    }
  };

  const handleMouseUp2 = () => {
    setIsDragging2(false);
  };



  const handleMouseDown3 = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging3(true);
    setOffset3({
      x: e.clientX - position3.x,
      y: e.clientY - position3.y,
    });
  };

  const handleMouseMove3 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging3) {
      setPosition3({
        x: e.clientX - offset3.x,
        y: e.clientY - offset3.y,
      });
    }
  };

  const handleMouseUp3 = () => {
    setIsDragging3(false);
  };

  const countMttComponents = (children: React.ReactNode): number => {
    let count = 0;

    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        typeof child.type === 'function' &&
        child.type.name.startsWith('Mtt') &&
        child.type.name !== 'MttSubmit' &&
           child.type.name !== 'MttImageDisplay'
      ) {
        count += 1;
      }
      
      // Recursively check nested children
      if (React.isValidElement(child) && child.props.children) {
        count += countMttComponents(child.props.children);
      }
    });

    return count;
  };

  const totalMttComponents = countMttComponents(children);

  return (
   <IsLoading isLoading={!!isLoading} className="w-full ">

<FormProvider {...Methods}>
      <form
        onSubmit={Methods.handleSubmit(onSubmit)}
        autoComplete="off"
        className={cn(
          " relative flex-col w-[300px]  p-6 px-8   flex items-center justify-center ",
          className
        )}
      >

     
        {indicator ? (
          Object.keys(Methods.formState.errors).length > 0 ? (
            <ShieldAlert size={25} className="  absolute top-5 left-3" />
          ) : (
            <CircleCheckBig
              size={25}
              className=" text-gree-400 absolute top-5 left-3"
            />
          )
        ) : null}
        {title && <h1 className={cn(" text-[20px]  mb-4 ")}> {title}</h1>}
        {children}

        {watchVals ? (
      <div 
      className=" z-10 absolute translate-y-1/2 h-[400px] w-[400px] p-2 shadow-lg bg-background border border-input rounded-md"
      
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
     
        userSelect: 'none',
      }}
      >

<div className=" bg-pri text-white p-2 mb-4 mtt-center !justify-start gap-4">
      <TextCursorInput size={20} color="white" />
    
      <p >Watching Values</p>


      <p>{`JSX= ${totalMttComponents}`}</p>
      <p className="ml-auto font-bold mr-4">{Object.values(Methods.watch()).filter((val)=>  val!==undefined && val!==""  ).length}</p>
      </div>

<pre>{JSON.stringify(Methods.watch(), null, 2)}</pre>
      </div>
        ) : null}

        {errors ? (
          Methods.formState.errors ? (

            <div 
            className=" z-10 absolute translate-y-1/2 h-[400px]  w-[400px] p-2 shadow-lg mtt-base rounded-md bg-background border border-input"
            
            onMouseDown={handleMouseDown2}
            onMouseMove={isDragging2 ? handleMouseMove2 : undefined}
            onMouseUp={handleMouseUp2}
            style={{
              position: 'absolute',
              left: `${position2.x}px`,
              top: `${position2.y}px`,
              cursor: isDragging2 ? 'grabbing' : 'grab',
           
              userSelect: 'none',
            }}
            >
      
      <div className=" bg-red-600 text-white p-2 mb-4 mtt-center !justify-start gap-4">
      <ShieldAlert size={20} color="white" />
      <p > Watching Errors</p>

        <p>{`JSX= ${totalMttComponents}`}</p>
      <p className="ml-auto font-bold mr-4">{Object.keys(Methods.formState.errors).length}</p>
      </div>
      
      <pre>
              {JSON.stringify(
                Object.keys(Methods.formState.errors).reduce((acc, key) => {
                  const error = Methods.formState.errors[key];
                  acc[key] =
                    typeof error?.message === "string"
                      ? error.message
                      : "Unknown error";
                  return acc;
                }, {} as Record<string, string | undefined>),
                null,
                2
              )}
            </pre>
            </div>
          
          ) : null
        ) : null}

{

  debugMode?<div className=" absolute mtt-center flex-col mtt-base p-1 z-30 w-[150px] h-[100px] shadow-lg"
  
  
  onMouseDown={handleMouseDown3}
  onMouseMove={isDragging3 ? handleMouseMove3 : undefined}
  onMouseUp={handleMouseUp3}
  style={{
    position: 'absolute',
    left: `${position3.x}px`,
    top: `${position3.y}px`,
    cursor: isDragging3 ? 'grabbing' : 'grab',
 
    userSelect: 'none',
  }}
  
  >

  <p className=" bg-red-500 text-white w-full p-1 px-3">Debug Mode</p>
<div className=" mtt-center !items-start flex-col gap-1">

<div className=" mtt-center gap-1 mt-3">
<CHK onCheckedChange={(val)=>{setWatchVals(val as boolean)}}/>  <p className="text-[13px]">Watch Values</p>
   
    </div>

    <div className=" mtt-center gap-1">
<CHK onCheckedChange={(val)=>{setWatchErros(val as boolean)}}/>  <p className="text-[13px]">Watch Errors</p>
   
    </div>
</div>
</div>:null
}
      </form>
    </FormProvider>
   </IsLoading>
  );
}

type TypeOfInput = "textInput" | "password" | "email" | "number" | "time";
type IconType = "user" | "lock" | "telephone" | "mobile" | "address" | "email";
function MttTextField({
  className,
  type = "textInput",
  step,
  name,
  min,
  label,
  placeholder,
  Icon,
  readOnly,
}: {
  name: string;
  placeholder?: string;
  label: string;
  className?: string;
  type?: TypeOfInput;
  Icon?: IconType;
  readOnly?: boolean;
  min?:string;
  step?:string;
}) {


  const [focus, setFocus] = useState(false);

  const Icons: Record<IconType, React.ReactNode> = {
    user: (
      <UserRound
        className={cn(
          "absolute size-[15px] top-[9px] left-[12px] duration-500",
          focus ? "text-Pri size-[16px]" : "text-gray-500-600 "
        )}
      />
    ),
    lock: (
      <Lock
        className={cn(
          "absolute size-[15px] top-[9px] left-[12px] duration-500",
          focus ? "text-Pri  size-[16px]" : "text-gray-500-600 "
        )}
      />
    ),
    mobile: (
      <Smartphone
        className={cn(
          "absolute size-[15px] top-[9px] left-[12px] duration-500",
          focus ? "text-Pri  size-[16px]" : "text-gray-500-600 "
        )}
      />
    ),
    address: (
      <House
        className={cn(
          "absolute size-[15px] top-[9px] left-[12px] duration-500",
          focus ? "text-Pri  size-[16px]" : "text-gray-500-600 "
        )}
      />
    ),
    telephone: (
      <Phone
        className={cn(
          "absolute size-[15px] top-[9px] left-[12px] duration-500",
          focus ? "text-Pri  size-[16px]" : "text-gray-500-600 "
        )}
      />
    ),
    email: (
      <Mail
        className={cn(
          "absolute size-[15px] top-[9px] left-[12px] duration-500",
          focus ? "text-Pri  size-[16px]" : "text-gray-500-600 "
        )}
      />
    ),
  };

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <div className=" mtt-center flex-col gap-1 w-full">
      <LabelWrapper name={name} error={errors?.[name]?.message} label={label}>
        <div className="relative w-full">
          <Input
            readOnly={readOnly}
            type={type}
            id={name}
          step={step?"0.01":"1"}
          min={min}
            placeholder={placeholder}
            className={cn(
              " placeholder:text-gray-300 w-full  mtt-input mtt-borderFocus mtt-border  h-InputHeight  ",
              `${className} ${Icon ? "pl-10" : ""}`
            )}
            onChange={(e) => {
              if (type == "number" ) {
                setValue(name, parseInt(e.target.value));
              } else {
                setValue(name, e.target.value);
              }
            }}
            ref={(e) => {
              register(name).ref(e);
            }}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => setFocus(false)}
          />

          {Icon ? Icons[Icon] : null}
        </div>
      </LabelWrapper>
    </div>
  );
}

function MttComboSearch({
  className,
  InitialValue,
  name,
  label,
  placeholder,
callBack,
  SelectValues,
}: {
  name: string;
  placeholder: string;
  label: string;
  className?: string;
  InitialValue?:string
  callBack?:(val:string)=>void;
  Icon?: IconType;
  readOnly?: boolean;
  SelectValues: { value: string; label: string; id: string }[];
}) {
  const {
   
    formState: { errors },
    setValue,
  } = useFormContext();

  const OnSelect = (value: string) => {
    setValue(name, value);
  };
  return (
    <div className=" mtt-center flex-col gap-1 w-full">
      <LabelWrapper name={name} error={errors?.[name]?.message} label={label}>
        <div className="relative">
          <MttSearchCombo
        
          InitialValue={InitialValue}
            placeholder={placeholder}
            className={className}
            SelectValues={SelectValues}
            Onselect={callBack?(val)=>{

              OnSelect(val)
              callBack(val)
            }:OnSelect}
          />
        </div>
      </LabelWrapper>
    </div>
  );
}
function MttSubmit({ children, className }: ChildClass) {
  return (
    <Button type="submit" className={cn("  h-InputHeight  text-[12px] w-full  ", className)}>
      {children}
    </Button>
  );
}

function MttSubmitAlternative({
  isSubmit,
  LoginLabel,
  SignUpLabel,
  reverse,
  className,
  signInRoute,
  signUpRoute,
}: {
  LoginLabel: string;
  SignUpLabel: string;
  reverse?: boolean;
  className?: string;
  isSubmit: "login" | "signup";
  signInRoute: string;
  signUpRoute: string;
}) {
  return (
    <div
      className={cn(
        " mtt-center gap-2 w-full",
        `${className}  ${reverse ? " flex-row-reverse" : ""}`
      )}
    >
      {isSubmit === "login" ? (
  <button type="submit" className={cn(" mtt-input  h-InputHeight  text-[12px] w-full mtt-priHover", className)}>
  {LoginLabel}
</button>
      ) : (
        <Link href={signInRoute} className="w-full">
          <button type="submit" className={cn(" mtt-input  h-InputHeight  text-[12px] w-full mtt-border border border-appPri text-appPri hover:bg-appPri hover:text-white", className)}>
      {LoginLabel}
    </button>
        </Link>
      )}

      {isSubmit === "signup" ? (
        <button type="submit" className={cn(" mtt-input  h-InputHeight  text-[12px] w-full mtt-mtt-borderTert mtt-priHover", className)}>
        {SignUpLabel}
      </button>
      ) : (
        <Link href={signUpRoute} className="w-full">
          <button type="submit" className={cn(" mtt-input  h-InputHeight  text-[12px] w-full mtt-mtt-borderTert border border-appPri text-appPri hover:bg-appPri hover:text-white", className)}>
      {SignUpLabel}
    </button>
        </Link>
      )}
    </div>
  );
}



// function MttSelect({
//   readOnly,
//   className,
//   name,
//   label,
//   Options,
//   placeholder,
// }: {
//   name: string;
//   label: string;
//   Options: OptionType[];
//   className?: string;
//   placeholder?: string;
//   readOnly?: boolean;
// }) {
//   const { control } = useFormContext();
//   return (
//     <div className="relative mtt-center flex-col gap-1 w-full">
//       <Controller
//         name={name}
//         control={control}
//         rules={{ required: { value: true, message: "Select required" } }}
//         render={({ field, formState: { errors } }) => (
//           <LabelWrapper
//             name={name}
//             className=" "
//             error={errors?.[name]?.message}
//             label={label}
//           >
//             <RadixSelect.Root
//               onValueChange={readOnly ? undefined : field.onChange} // Disable changing value when readOnly
//               value={field.value}
//             >
//               <RadixSelect.Trigger
//                 className={cn(
//                   " mtt-BaseShadeHover5White group text-textPri rounded-md   h-InputHeight !border-input  w-full border text-[13px] px-3 py-2 flex justify-between items-center",
//                   readOnly ? "cursor-not-allowed opacity-50" : ""
//                 )}
//                 disabled={readOnly} // Disable the trigger if readOnly is true
//               >
//                 <RadixSelect.Value
//                   placeholder={placeholder || "Select an option..."}
//                   className="group-hover:!text-black"
//                 />
//                 <RadixSelect.Icon className="text-textPri ">
//                   <ChevronDown size={15} />
//                 </RadixSelect.Icon>
//               </RadixSelect.Trigger>

//               <RadixSelect.Portal>
//                 <RadixSelect.Content
//                   className=" bg-BaseShadeWhite border-input border rounded-md "
//                   position="popper"
//                   sideOffset={4}
//                 >
//                   <RadixSelect.Viewport className="p-4 w-full">
//                     {Options?.map((value) => (
//                       <RadixSelect.Item
//                         key={value.value}
//                         value={value.value}
//                         className=" text-textPri rounded-md  outline-none px-2 w-full text-[13px] hover:bg-BaseShadeDark focus:bg-Pri focus:text-white h-fit cursor-pointer p-1"
//                       >
//                         <RadixSelect.ItemText>{value.label}</RadixSelect.ItemText>
//                       </RadixSelect.Item>
//                     ))}
//                   </RadixSelect.Viewport>
//                 </RadixSelect.Content>
//               </RadixSelect.Portal>
//             </RadixSelect.Root>
//           </LabelWrapper>
//         )}
//       />
//     </div>
//   );
// }

function MttSelect({
  readOnly,
  className,
  name,
  label,
  Options,
  placeholder,
  InitialValue,
}: {
  name: string;
  label: string;
  Options: OptionType[];
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  InitialValue?: string; // Optional prop for the initial value
}) {
  const { control } = useFormContext();

  return (
    <div className="relative mtt-center flex-col gap-1 w-full">
      <Controller
        name={name}
        control={control}
        rules={{ required: { value: true, message: "Select required" } }}
        defaultValue={InitialValue || ""} // Set the initial value here
        render={({ field, formState: { errors } }) => (
          <LabelWrapper
            name={name}
            className=" "
            error={errors?.[name]?.message}
            label={label}
          >
            <RadixSelect.Root
              onValueChange={readOnly ? undefined : field.onChange} // Disable changing value when readOnly
              value={field.value}
            >
              <RadixSelect.Trigger
                className={cn(
                  "mtt-BaseShadeHover5White group text-textPri rounded-md h-InputHeight !border-input w-full border text-[13px] px-3 py-2 flex justify-between items-center",
                  readOnly ? "cursor-not-allowed opacity-50" : ""
                )}
                disabled={readOnly} // Disable the trigger if readOnly is true
              >
                <RadixSelect.Value
                  placeholder={placeholder || "Select an option..."}
                  className="group-hover:!text-black"
                />
                <RadixSelect.Icon className="text-textPri">
                  <ChevronDown size={15} />
                </RadixSelect.Icon>
              </RadixSelect.Trigger>

              <RadixSelect.Portal>
                <RadixSelect.Content
                  className="bg-BaseShadeWhite border-input border rounded-md"
                  position="popper"
                  sideOffset={4}
                >
                  <RadixSelect.Viewport className="p-4 w-full">
                    {Options?.map((value) => (
                      <RadixSelect.Item
                        key={value.value}
                        value={value.value}
                        className="text-textPri rounded-md outline-none px-2 w-full text-[13px] hover:bg-BaseShadeDark focus:bg-Pri focus:text-white h-fit cursor-pointer p-1"
                      >
                        <RadixSelect.ItemText>{value.label}</RadixSelect.ItemText>
                      </RadixSelect.Item>
                    ))}
                  </RadixSelect.Viewport>
                </RadixSelect.Content>
              </RadixSelect.Portal>
            </RadixSelect.Root>
          </LabelWrapper>
        )}
      />
    </div>
  );
}

type MttRadioGroupProps={

  Options:{value:string, label:string}[],
  className?:string,
  name:string,
  label:string,
  readOnly?:boolean
}

function MttRadioGroup({
  Options,
  className,
  name,
  label,
  readOnly,
}: MttRadioGroupProps & { readOnly?: boolean }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: { value: true, message: "Required" } }}
      render={({ field, formState: { errors } }) => (
        <div className="mtt-center flex-col gap-1 w-full">
          <LabelWrapper
            name={name}
            className="flex-col items-start"
            error={errors?.[name]?.message}
            label={label}
          >
            <RadixRadioGroup.Root
              defaultValue={field.value}
              onValueChange={readOnly ? undefined : field.onChange} // Prevent changes if readOnly
              className={cn("flex flex-col space-y-2", className, {
                "cursor-not-allowed opacity-50": readOnly, // Disable cursor and adjust opacity when readOnly
              })}
            >
              {Options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadixRadioGroup.Item
                    value={option.value}
                    id={option.value}
                    className={cn(
                      "relative w-4 h-4 border border-Pri rounded-full focus:outline-none",
                      {
                        "cursor-pointer": !readOnly, // Enable pointer cursor only when not readOnly
                        "cursor-not-allowed": readOnly, // Disable pointer cursor when readOnly
                      }
                    )}
                    disabled={readOnly} // Disable the radio item if readOnly is true
                  >
                    {/* Tick icon when checked */}
                    {field.value === option.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="size-3 text-Pri" />
                      </div>
                    )}
                  </RadixRadioGroup.Item>
                  <Label
                    className={cn("text-[12px]", {
                      "cursor-not-allowed": readOnly,
                    })}
                    htmlFor={option.value}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadixRadioGroup.Root>
          </LabelWrapper>
        </div>
      )}
    />
  );
}



function MttCheckBox({
  name,
  label,
  sideAction,
  readOnly, // Added the readOnly prop
}: {
  name: string;
  label: string;
  sideAction?: () => void;
  readOnly?: boolean; // Make readOnly prop optional
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <div className="relative mtt-center flex-col gap-1 w-full">
          <LabelWrapper
            name={name}
            className="absolute font-normal text-[11px] mt-[17px] w-full -top-4 pl-6"
            error={errors?.[name]?.message}
            label={label}
          >
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={(e) => {
                if (!readOnly) { // Only allow changes if not readOnly
                  if (sideAction) {
                    sideAction();
                  }
                  field.onChange(e);
                }
              }}
              className={cn(
                "w-4 h-4 border-[1px] rounded-md", // Basic size and shape
                {
                  "border-Pri": !field.value, // Orange outline when not checked
                  "bg-pri text-white border-transparent": field.value, // Orange background with white tick when checked
                  "cursor-not-allowed opacity-50": readOnly, // Disable pointer and adjust opacity when readOnly
                }
              )}
              disabled={readOnly} // Disable the checkbox if readOnly is true
            >
              <CheckboxIndicator className="flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-Pri" /> {/* White tick icon */}
              </CheckboxIndicator>
            </Checkbox>
          </LabelWrapper>
        </div>
      )}
    />
  );
}


interface MttDatePickerProps {
  name: string;
  label: string;
  className?: string;
  RHFdate?: boolean;
  readOnly?:boolean
}

const MttDatePicker: React.FC<MttDatePickerProps> = ({
  name,
  label,
  className,
  RHFdate,
  readOnly,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();

  return (
    <div className="mtt-center flex-col gap-1 w-full ">
      <Controller
        name={name}
        control={control}
        rules={{ required: { value: true, message: 'Select required' } }}
        render={({ field, formState: { errors } }) => (
          <LabelWrapper
            name={name}
            className={cn('w-full mb-1', className)}
            error={errors?.[name]?.message as string}
            label={label}
          >
            <RadixPopover.Root
              open={!readOnly && open} // Prevent opening if readOnly is true
              onOpenChange={setOpen}
            >
              <RadixPopover.Trigger asChild>
                <button
                  className={cn(
                    'w-full group  h-InputHeight mtt-BaseShadeHover5White group text-textPri rounded-md !border-input border justify-start text-left font-normal  px-3 py-2 flex items-center',
                    {
                      'text-muted-foreground': !field.value,
                      'cursor-not-allowed opacity-50': readOnly,
                      'hover:cursor-pointer': !readOnly,
                    }
                  )}
                  disabled={readOnly} // Disable the button if readOnly is true
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-pri " />
                  <span className="text-[13px] mtt-textSec ">
                    {field.value ? (
                      format(new Date(field.value), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </span>
                  <ChevronDown size={15} className="ml-auto " />
                </button>
              </RadixPopover.Trigger>

              <RadixPopover.Portal>
                <RadixPopover.Content className="bg-BaseShadeWhite rounded-md shadow-lg border border-input p-4 w-auto mb-2 flex flex-col space-y-2">
                  <Calendar
                    className="dark:text-white "
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate: Date) => {
                      if (readOnly) return; // Prevent selection if readOnly

                      setDate(selectedDate);

                      // Conditionally set the value based on RHFdate prop
                      if (RHFdate) {
                        field.onChange(selectedDate); // Store as Date object
                      } else {
                        field.onChange(format(selectedDate, 'yyyy-MM-dd')); // Store as string in 'yyyy-MM-dd' format
                      }

                      setOpen(false); // Close the popover on date selection
                    }}
                  />
                </RadixPopover.Content>
              </RadixPopover.Portal>
            </RadixPopover.Root>
          </LabelWrapper>
        )}
      />
    </div>
  );
};


// const MttDatePicker: React.FC<MttDatePickerProps> = ({
//   name,
//   label,
//   className,
//   RHFdate,
// }) => {
//   const [date, setDate] = useState<Date | null>(null);
//   const [open, setOpen] = useState(false);
//   const { control } = useFormContext();

//   return (
//     <div className="mtt-center flex-col gap-1 w-full">
//       <Controller
//         name={name}
//         control={control}
//         rules={{ required: { value: true, message: 'Select required' } }}
//         render={({ field, formState: { errors } }) => (
//           <LabelWrapper
//             name={name}
//             className={cn('w-full mb-1', className)}
//             error={errors?.[name]?.message as string}
//             label={label}
//           >
//             <RadixPopover.Root open={open} onOpenChange={setOpen}>
//               <RadixPopover.Trigger asChild>
//                 <button
//                   className={`w-full group  h-InputHeight  justify-start text-left font-normal mtt-picker mtt-border px-3 py-2 flex items-center ${
//                     !field.value ? 'text-muted-foreground' : ''
//                   }`}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4 text-pri group-hover:text-black" />
//                   <span className="text-[13px] mtt-textSec group-hover:text-black">
//                     {field.value ? (
//                       format(new Date(field.value), 'PPP')
//                     ) : (
//                       <span>Pick a date</span>
//                     )}
//                   </span>
//                   <ChevronDown size={15} className="ml-auto group-hover:text-black" />
//                 </button>
//               </RadixPopover.Trigger>

//               <RadixPopover.Portal>
//                 <RadixPopover.Content className="bg-white mtt-base shadow-lg mtt-border p-4 w-auto mb-2 flex flex-col space-y-2">
//                   <Calendar
//                     className="dark:text-white"
//                     mode="single"
//                     selected={date}
//                     onSelect={(selectedDate: Date) => {
//                       setDate(selectedDate);

//                       // Conditionally set the value based on RHFdate prop
//                       if (RHFdate) {
//                         field.onChange(selectedDate); // Store as Date object
//                       } else {
//                         field.onChange(format(selectedDate, 'yyyy-MM-dd')); // Store as string in 'yyyy-MM-dd' format
//                       }

//                       setOpen(false); // Close the popover on date selection
//                     }}
//                   />
//                 </RadixPopover.Content>
//               </RadixPopover.Portal>
//             </RadixPopover.Root>
//           </LabelWrapper>
//         )}
//       />
//     </div>
//   );
// };
function MttTimePicker({
  name,
  label,
  placeholder,
  RHFdate,
  readOnly,
}: {
  name: string;
  placeholder?: string;
  label: string;
  className?: string;
  type?: TypeOfInput;
  Icon?: IconType;
  readOnly?: boolean;
  RHFdate?: boolean;
}) {
  const TimeRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <div className="mtt-center flex-col gap-1 w-full">
      <LabelWrapper name={name} error={errors?.[name]?.message} label={label}>
        <div className="relative w-full">
          <style>
            {`
              input[type="time"]::-webkit-calendar-picker-indicator {
                display: none;
              }
            `}
          </style>
          <Input
            readOnly={readOnly}
            type="time"
            id={name}
            {...register(name, {
              required: { value: true, message: 'Required' },
            })}
            placeholder={placeholder}
            className={cn(
              'mtt-textSec w-full  h-InputHeight  hover:!cursor-pointer mtt-picker mtt-border mtt-borderFocus group-hover:text-black pl-10'
            )}
            onClick={() => {
              TimeRef.current?.showPicker();
            }}
            onChange={(e) => {
              const timeString = e.target.value;
              if (RHFdate) {
                // Convert the time string into a Date object using date-fns
                const parsedDate = parse(timeString, 'HH:mm', new Date());
                setValue(name, parsedDate);
              } else {
                setValue(name, timeString);
              }
            }}
            ref={TimeRef}
          />
          {/* Custom Lucide Icon positioned absolutely */}
          {true && (
            <Clock className="group-hover:text-black absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pri pointer-events-none" />
          )}
        </div>
      </LabelWrapper>
    </div>
  );
}


function MttTextArea({
  name,
  label,
  className,
  placeholder,
  readOnly,
}: {
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className=" mtt-center flex-col gap-1 w-full">
    <LabelWrapper
      name={name}
      className="  "
      error={errors?.[name]?.message}
      label={label}
    >
      <Textarea
        readOnly={readOnly}
        {...register(name)}
        placeholder={placeholder}
        className={cn(" resize-none  mtt-borderFocus mtt-border", className)}
      />
    </LabelWrapper>
    </div>
  );
}

export type { OptionType };
export {
  MttTextArea,

  MttForm,
  MttTextField,
  MttSubmit,
  MttSelect,
  MttDatePicker,
  MttRadioGroup,
  MttCheckBox,
  MttSubmitAlternative,
  MttComboSearch,
  MttTimePicker,
};
