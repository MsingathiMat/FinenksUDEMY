"use client";
import Textarea from "react-expanding-textarea";
import React, { useEffect } from "react";
import MttForm, {
  MttSelect,
  MttSubmit,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";

import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import withUtilities from "@/components/mtt/HOC/withUtilities";

import { ItemStatus, ItemTypeEnum } from "@prisma/client";
import useActiveUser from "@/components/mtt/Hooks/useActiveUser";
import { MutationModels } from "@/components/mtt/config/ReactQueryConfig";

const OriginalForm = ({ Utilities,UniqueField,RevalidateKey, UniqueValue,tableName,UpdatedField,UpdatedValue,InputLabel,FormTitle }: { Utilities?: UtilitiesProp,UniqueField:string, UniqueValue:string,tableName:string,UpdatedField:string,UpdatedValue:string,RevalidateKey:string,InputLabel:string,FormTitle?:string }) => {
  // Declare FORM NAME or Table name
  const FormName = "Item";

 
useEffect(()=>{

 
},[])

  // Get(Destructure) all the methods that your form will need from  Utilities
  const {
    Create,
    toast,
    IsLoading,
    QClient,
  } = Utilities;

 
  // Create a FormSchema
  const FormSchema = z
    .object({
      UniqueField: z.string().min(1, "Required"),
      UniqueValue: z.string().min(1, "Required"),
      tableName: z.string().min(1, "Required"),
      UpdatedField: z.string().min(1, "Required"),
      UpdatedValue: z.string().min(1, "Required"),
      
    })
    
  ;

  // Form Type
  type FormType = z.infer<typeof FormSchema>;

  // FormMethods
  const FormMethods = useForm<FormType>({
    defaultValues: {
      UniqueField,
      UniqueValue,
      UpdatedField,
    UpdatedValue,
    tableName,
    
    },
    resolver: zodResolver(FormSchema),
    mode: "all",
  });

  //Form Submit Method
  const FormSubmit: SubmitHandler<FormType> = (data) => {
   
    FormMutation.mutate(data);
  };

  const FormMutation = useMutation({
    mutationKey: [MutationModels.FieldUpdater.MutationKey],
    mutationFn: async (data:FormType) => {
      //Create has been supplied by HOC. It comes from MttFetch
      return await Create(MutationModels.FieldUpdater.ApiEndpoint, data);
    },
    onError: () => {
      //toast has been supplied by HOC. It comes from Shadcn
      toast({
        title: "ERROR",
        description: `Failed to create ${FormName}`,
      });
    },
    onSuccess: () => {
      //QClient has been supplied by HOC. It comes from Shadcn
      QClient.invalidateQueries({ queryKey: [RevalidateKey] });

      //Reset form fields
      FormMethods.reset();


      //toast has been supplied by HOC. It comes from Shadcn
      // toast({
      //   title: "SUCCESS",
      //   description: `${FormName} updated`,
      // });
    },
  });

  // BOOLEAN CONDITIONALS - Booleans that are responsible for CONDITIONAL RENDERING

  const readOnly = FormMutation.isPending;
  const FormIsloading = FormMutation.isPending;


    
  return (
    <div className=" mtt-Alpha p-4 w-fit rounded-md">
      <MttForm
title={FormTitle}
        onSubmit={FormSubmit}
        Methods={FormMethods}
        className="  mtt-center gap-6 mt-2 !flex-col w-fit "
      >
        <div className="  mtt-center gap-6 mt-2 !flex-row w-fit  ">
          <div className=" mtt-center gap-4 !flex-col">
            <MttTextField
              readOnly={readOnly}
              
              name="UpdatedValue"
              label={InputLabel}
              className=""
            />

            <IsLoading className="w-full mtt-center" isLoading={FormIsloading}>
              <MttSubmit>Update</MttSubmit>
            </IsLoading>
          </div>
        </div>
      </MttForm>
    </div>
  );
};

const MttFieldUpdater = withUtilities(OriginalForm);
export default MttFieldUpdater;
