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
import { ActiveUserType, UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import { CompanyType, ItemStatus, ItemTypeEnum } from "@prisma/client";
import useActiveUser from "@/components/mtt/Hooks/useActiveUser";
import { MutationModels } from "@/components/mtt/config/ReactQueryConfig";

const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  // Declare FORM NAME or Table name
  const FormName = "User";

  const {userData} = useActiveUser<ActiveUserType>()

 
  // Get(Destructure) all the methods that your form will need from  Utilities
  const {
    Create,
    toast,
    UserId,
    ImageReset,
    ObjectToFormData,
    IsLoading,
    QClient,
  } = Utilities;



  // Create a FormSchema
  const FormSchema = z
    .object({
      ClientName: z.string().min(1, "Required"),
      UserId: z.string().min(1, "Required"),
      ContactNumber: z.string().min(1, "Required"),
      ClientType: z.nativeEnum(CompanyType),
      ContactPerson: z.string().min(1, "Required"),
      CompanyEmail: z.string().min(1, "Required"),
     
    })
    
  ;

  // Form Type
  type FormType = z.infer<typeof FormSchema>;

  // FormMethods
  const FormMethods = useForm<FormType>({
    defaultValues: {
      ClientName: "",
      UserId: UserId,
      ContactPerson: "",
      ContactNumber: "",
      ClientType: undefined,
      CompanyEmail:""
    },
    resolver: zodResolver(FormSchema),
    mode: "all",
  });

  //Form Submit Method
  const FormSubmit: SubmitHandler<FormType> = (data) => {
    const ConvertedFormData = ObjectToFormData(data);
    FormMutation.mutate({ formData: ConvertedFormData });
  };

  const FormMutation = useMutation({
    mutationKey: [MutationModels.Items.MutationKey],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      //Create has been supplied by HOC. It comes from MttFetch
      return await Create("/api/root/dashboard/FormAddClient/", formData);
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
      QClient.invalidateQueries({ queryKey: ["getUsers"] });

      //Reset form fields
      // FormMethods.reset();

      // Resert MttImage - This clears input images on the UI
      ImageReset("imageUrl");

      //toast has been supplied by HOC. It comes from Shadcn
      toast({
        title: "SUCCESS",
        description: `${FormName} created successfully`,
      });
    },
  });

  // BOOLEAN CONDITIONALS - Booleans that are responsible for CONDITIONAL RENDERING

  const readOnly = FormMutation.isPending;
  const FormIsloading = FormMutation.isPending;
  const ItemType = FormMethods.watch("ItemType");

  useEffect(()=>{
FormMethods.setValue("Quantity",-1)

  },[ItemType])

  useEffect(()=>{
  if(userData){
    FormMethods.setValue("UserId",userData.activeId)
  }
    
      },[userData])
    
  
    
    
      return (
    <div className=" mtt-Alpha p-4 w-fit rounded-md">
      <MttForm

        onSubmit={FormSubmit}
        Methods={FormMethods}
        className="  mtt-center gap-6 mt-2 !flex-col w-fit "
      >
        <div className="  mtt-center gap-6 mt-2 !flex-row w-fit  ">
          <div className=" mtt-center gap-4 !flex-col">
           


        
          <MttTextField
              readOnly={readOnly}
              name="ClientName"
              label="Client Name"
              className=""
            />
            <MttSelect
              readOnly={readOnly}
              name="ClientType"
              label="Client Type"
              Options={[
                { value: "Company", label: "Company" },
                { value: "Individual", label: "Individual" },
              ]}
            />
            <MttTextField
              readOnly={readOnly}
              name="ContactPerson"
              label="Contact Person"
              className=""
            />
          </div>

          <div className=" mtt-center gap-4 !flex-col">
       
            <MttTextField
              readOnly={readOnly}
              name="ContactNumber"
              label="Contact Number"
              className=""
            />

            <MttTextField
              readOnly={readOnly}
              name="CompanyEmail"
              label="Company Email"
              className=""
            />
           
          </div>
          
        </div>
        <IsLoading className="w-full mtt-center" isLoading={FormIsloading}>
              <MttSubmit>Add</MttSubmit>
            </IsLoading>
      </MttForm>
    </div>
  );
};

const FormAddItem = withUtilities(OriginalForm);
export default FormAddItem;
