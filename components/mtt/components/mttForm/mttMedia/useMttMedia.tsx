"use client"
import React, { ChangeEvent, useState } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import LabelWrapper from "../LabelWrapper";
import { MttImageFileProps, UploadedImageProps } from "@/components/mtt/Types/MttTypes";


const useMttMedia = () => {
  // const [srcArray, seSrcArray] =useState<Record<string,{src:string,fileName:string} | null>>({})
  const [srcArray, seSrcArray] = useState<
    Record<string, { src: string; fileName: string } | null>
  >({});
  const updateSrcArray = (key: string, src: string, fileName: string) => {
    seSrcArray((prev) => ({ ...prev, [key]: { src, fileName } }));
  };



  const reset = (name:string )=>{

    seSrcArray({...srcArray,[name]:{ src: "", fileName: "" }})
  }
  const MttImageDisplay = ({
    className,
    name,
    wathcedValue
  }:{className?:string, name: string,wathcedValue?:string }) => {
    return (
      <>
        {srcArray[name]?.src ? (
          <img
            src={srcArray[name]?.src}
            alt=""
            className={cn(
              "w-full h-full   object-cover object-left-top  shadow-lg border-[1px] rounded-md border-input  shadow-md",
              className
            )}
          />
        ) :wathcedValue? <img
        src={wathcedValue}
        alt=""
        className={cn(
          "w-full h-full   object-cover object-left-top  shadow-lg border-[1px] rounded-md border-input  shadow-md",
          className
        )}
      /> :(
          <div
            className={cn(
              " mtt-center w-full h-[100px] bg-BaseShade3   object-cover object-center rounded-md ",
              className
            )}
          >
            <ImageUp
              size={34}
              className="text-gray-400 group-hover:text-white"
            />
          </div>
        )}
      </>
    );
  };

  const MttImageFile = ({
    className,
    name,
    label,
    readOnly, // Added the readOnly prop
  }:MttImageFileProps) => {
   
const {control}= useFormContext()
    return (
      <div className="mtt-center flex-col gap-1 w-full">
        <Controller
          name={name}
          control={control}
         
          render={({ field, formState: { errors } }) => (
            <LabelWrapper
              name={name}
              className="flex-col items-start"
              error={errors?.[name]?.message}
              label={label ? label : ""}
            >
              <label
                htmlFor={name}
                className={cn(
                  "relative group gap-2 items-center font-normal hover:cursor-pointer  mtt-BaseShadeHover5White group text-textPri rounded-md   h-InputHeight border !border-input flex w-full pl-1",
                  className
                )}
              >
                {srcArray[name]?.src ? (
                  <MttImageDisplay
                    name={name}
                    className="group-hover:scale-110 duration-500 relative w-[60px] h-[70%] scale-100 shadow-md border-[0.2px]"
                  />
                ) : (
                  <ImageUp
                    size={28}
                    className="text-gray-400 group-hover:text-white"
                  />
                )}
  
                <span className="text-[12px] w-full object-contain text-gray-400 group-hover:text-white overflow-hidden line-clamp-1 whitespace-nowrap pr-4">
                  {srcArray[name]?.fileName
                    ? srcArray[name]?.fileName
                    : "No image chosen"}
                </span>
              </label>
  
              <input
                hidden
                id={name}

              
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (!readOnly && e.target.files && e.target.files.length > 0) {
                    
                    reset(name)
                    field.onChange(e.target.files[0]);
  
                    updateSrcArray(
                      name,
                      URL.createObjectURL(e.target.files[0]),
                      e.target.files[0].name
                    );
                  }
                }}
                accept="image/*"
                type="file"
                disabled={readOnly} // Disable the input if readOnly is true
              />
            </LabelWrapper>
          )}
        />
      </div>

    
    );
  };
  
  return { MttImageDisplay, MttImageFile,reset };
};

export default useMttMedia;
