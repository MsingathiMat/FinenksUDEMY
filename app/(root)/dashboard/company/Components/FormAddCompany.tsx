"use client";

import React, { useEffect } from "react";
import MttForm, {

  MttComboSearch,
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
import GenerateSelectValues from "@/components/mtt/Helpers/GenerateSelectValues";


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
         
          <MttComboSearch
              className=" w-auto"
             name="Currency"
             label="Select Currency"
              placeholder="Choose Client"
              SelectValues={
                [
                  { id: "$", value: "$", label: "USD: US Dollar ($)" },
                  { id: "€", value: "€", label: "EUR: Euro (€)" },
                  { id: "₹", value: "₹", label: "INR: Indian Rupee (₹)" },
                  { id: "£", value: "£", label: "GBP: British Pound (£)" },
                  { id: "¥", value: "¥", label: "JPY: Japanese Yen (¥)" },
                  { id: "₩", value: "₩", label: "KRW: South Korean Won (₩)" },
                  { id: "₱", value: "₱", label: "PHP: Philippine Peso (₱)" },
                  { id: "฿", value: "฿", label: "THB: Thai Baht (฿)" },
                  { id: "R$", value: "R$", label: "BRL: Brazilian Real (R$)" },
                  { id: "₽", value: "₽", label: "RUB: Russian Ruble (₽)" },
                  { id: "A$", value: "A$", label: "AUD: Australian Dollar (A$)" },
                  { id: "C$", value: "C$", label: "CAD: Canadian Dollar (C$)" },
                  { id: "NZ$", value: "NZ$", label: "NZD: New Zealand Dollar (NZ$)" },
                  { id: "HK$", value: "HK$", label: "HKD: Hong Kong Dollar (HK$)" },
                  { id: "CHF", value: "CHF", label: "CHF: Swiss Franc (CHF)" },
                  { id: "CN¥", value: "CN¥", label: "CNY: Chinese Yuan (CN¥)" },
                  { id: "SGD", value: "SGD", label: "SGD: Singapore Dollar (S$)" },
                  { id: "ZAR", value: "ZAR", label: "ZAR: South African Rand (R)" },
                  { id: "MX$", value: "MX$", label: "MXN: Mexican Peso (MX$)" },
                  { id: "₪", value: "₪", label: "ILS: Israeli New Shekel (₪)" },
                  { id: "AED", value: "AED", label: "AED: United Arab Emirates Dirham (د.إ)" },
                  { id: "SAR", value: "SAR", label: "SAR: Saudi Riyal (﷼)" },
                  { id: "MYR", value: "MYR", label: "MYR: Malaysian Ringgit (RM)" },
                  { id: "IDR", value: "IDR", label: "IDR: Indonesian Rupiah (Rp)" },
                  { id: "₦", value: "₦", label: "NGN: Nigerian Naira (₦)" },
                  { id: "₵", value: "₵", label: "GHS: Ghanaian Cedi (₵)" },
                  { id: "KSh", value: "KSh", label: "KES: Kenyan Shilling (KSh)" },
                  { id: "৳", value: "৳", label: "BDT: Bangladeshi Taka (৳)" },
                  { id: "R", value: "R", label: "ZAR: South African Rand (R)" },
                  { id: "₡", value: "₡", label: "CRC: Costa Rican Colón (₡)" },
                  { id: "Ft", value: "Ft", label: "HUF: Hungarian Forint (Ft)" },
                  { id: "₴", value: "₴", label: "UAH: Ukrainian Hryvnia (₴)" },
                  { id: "₫", value: "₫", label: "VND: Vietnamese Dong (₫)" },
                  { id: "Q", value: "Q", label: "GTQ: Guatemalan Quetzal (Q)" },
                  { id: "B/.", value: "B/.", label: "PAB: Panamanian Balboa (B/.)" },
                  { id: "L", value: "L", label: "HNL: Honduran Lempira (L)" },
                  { id: "zł", value: "zł", label: "PLN: Polish Złoty (zł)" },
                  { id: "kr", value: "kr", label: "SEK: Swedish Krona (kr)" },
                  { id: "N$", value: "N$", label: "NAD: Namibian Dollar (N$)" },
                  { id: "₨", value: "₨", label: "PKR: Pakistani Rupee (₨)" },
                  { id: "Kz", value: "Kz", label: "AOA: Angolan Kwanza (Kz)" },
                  { id: "Bs.", value: "Bs.", label: "VEF: Venezuelan Bolívar (Bs.)" },
                  { id: "₭", value: "₭", label: "LAK: Lao Kip (₭)" },
                ]
              }
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
