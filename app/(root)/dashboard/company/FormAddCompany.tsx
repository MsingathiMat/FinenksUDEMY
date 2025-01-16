"use client";

import React, { useEffect } from "react";
import MttForm, {

  MttSelect,
  MttSubmit,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";

import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useMutation } from "@tanstack/react-query";
import withUtilities from "@/components/mtt/HOC/withUtilities";

import useActiveUser from "@/components/mtt/Hooks/useActiveUser";
import { MutationModels } from "@/components/mtt/config/ReactQueryConfig";

import { MttRedirect } from "@/components/mtt/Helpers/MttRedirect";


const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
 


  // Declare FORM NAME or Table name
  const FormName = "Company";

  //Current User ID
  const { userData } = useActiveUser<ActiveUserType>();
  // Get(Destructure) all the methods that your form will need from  Utilities

  useEffect(() => {
    if (userData?.activeId) {
      FormMethods.setValue("UserId", userData.activeId);
     
    }

    
  }, [userData]);
 
  const {
    Create,

    toast,
 
    ObjectToFormData,
    IsLoading,
    QClient,

  } = Utilities;


  // Create a FormSchema
  const FormSchema = z.object({
    UserId: z.string().min(1, "Required"),
  
    CompanyId:z.any().optional(),
    CompanyName: z.string().min(1, "Required"),
    Currency: z.string().min(1, "Required"),
    BankName :z.string().min(1, "Required"),
    BankType :z.string().min(1, "Required"),
    BankAccount :z.string().min(1, "Required"),
    PaymentTerms :z.string().min(1, "Required"),
    Logo :z.string().optional(),
    ContactPerson: z.string().min(1, "Required"),
    Type: z.enum(["Company", "Individual"]),
    ContactNo: z.string().min(1, "Required"),
    TagLine: z.string().min(1, "Required"),
    Email: z.string().email({ message: "Not Valid" }),
  
  })

  
  // Form Type
  type FormType = z.infer<typeof FormSchema>;

  // FormMethods
  const FormMethods = useForm<FormType>({
    defaultValues: {
      CompanyName: "",
      ContactPerson: "",
      Type: undefined,
      ContactNo: "",
      Email: "",
      TagLine: "",
      BankName :"",
      BankType :"",
      BankAccount :"",
      PaymentTerms :"",
      Logo:"",
      
   
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
    mutationKey:[MutationModels.Companies.MutationKey],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      //Create has been supplied by HOC. It comes from MttFetch
      return await Create(
       "/api/root/dashboard/FormAddCompany/saveFormData", 
        
        formData);
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
      QClient.invalidateQueries({ queryKey: MutationModels.Companies.Dependants });

      //Reset form fields
      FormMethods.reset();

      // Resert MttImage - This clears input images on the UI
   
    

      toast({
        title: "SUCCESS",
        description: `${FormName} created successfully`,
      });

      MttRedirect("/api/signout")
    },
  });

  // BOOLEAN CONDITIONALS - Booleans that are responsible for CONDITIONAL RENDERING
  const readOnly = FormMutation.isPending;
  const FormIsloading = FormMutation.isPending;


   
  return (

    <div>


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
              name="CompanyName"
              label="Company Name"
              className=""
            />

<MttTextField
              readOnly={readOnly}
              name="Logo"
              label="Logo Link"
              className=""
            />
           <MttSelect
             
                readOnly={readOnly}
                name="Type"
                label="Select Type"
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
              name="TagLine"
              label="Tagline"
              className=""
            />
            <MttTextField
              readOnly={readOnly}
              name="ContactNo"
              label="Contact Number"
              className=""
            />

            <MttTextField
              readOnly={readOnly}
              name="Email"
              label="Company Email"
              className=""
            />
          </div>


          <div className=" mtt-center gap-4 !flex-col">
            <MttTextField
              readOnly={readOnly}
              name="Currency"
              label="Currency"
              className=""
            />
            <MttTextField
              readOnly={readOnly}
              name="BankName"
              label="Bank Name"
              className=""
            />

            <MttTextField
              readOnly={readOnly}
              name="BankType"
              label="Account Type"
              className=""
            />

<MttTextField
              readOnly={readOnly}
              name="PaymentTerms"
              label="Payment Terms"
              className=""
            />

<MttTextField
              readOnly={readOnly}
              name="BankAccount"
              label="Bank Account"
              className=""
            />
          </div>
      
        </div>
        <IsLoading className="w-full mtt-center" isLoading={FormIsloading}>
          <MttSubmit>{"Save "}</MttSubmit>
        </IsLoading>
      </MttForm>
    </div>
    </div>
   
  );
};

const FormAddCompany = withUtilities(OriginalForm);
export default FormAddCompany;
