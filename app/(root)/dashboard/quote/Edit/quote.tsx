"use client";
import React, { useEffect, useState } from "react";
import MttForm, {
  MttComboSearch,
  MttSelect,
  MttSubmit,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import LiftOfitemsSelect from "@/components/AppComponents/ListOfSelects/ListOfItemSelect";
import MttpopulatedSelect from "@/components/mtt/components/mttForm/mttPopulatedSelect";
import GenerateSelectValues from "@/components/mtt/Helpers/GenerateSelectValues";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationModels, QueryModels } from "@/components/mtt/config/ReactQueryConfig";
import { Items } from "@prisma/client";
import { MttSearchCombo } from "@/components/mtt/components/mttSearchCombo";
import { cn } from "@/lib/utils";
import uuid4 from "uuid4";
import Link from "next/link";
import { useAtom } from "jotai";
import { UserCompany } from "@/components/mtt/Atoms/AtomUserCompany";
import { useSearchParams } from "next/navigation";
import { MttRedirect } from "@/components/mtt/Helpers/MttRedirect";

const Quote = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  const {
    UserId,
    Create,
    toast,
    QClient,

    IsLoading,
    Read,
  } = Utilities;

  // Schema for form validation
  const FormSchema = z.object({
    QuotationId: z.string().min(1, "Required"),
    ClientId: z.string().min(1, "Required"),
    UserId: z.string().min(1, "Required"),
    CompanyId: z.string().min(1, "Required"),
    items: z.array(
      z.object({
        ItemId: z.string(),
        Description: z.string(),
        Quantity: z.number(),
        inputEnabled: z.boolean().optional(),
      })
    ),
  });

  const [CompanyData,] = useAtom(UserCompany);
  const FormName = "Quotation"
  type FormType = z.infer<typeof FormSchema>;
  const FormMethods = useForm<FormType>({
 
    resolver: zodResolver(FormSchema),
  });



  
  const path = useSearchParams()
  useEffect(()=>{

    if (UserId) {
      FormMethods.setValue("UserId", UserId);
    }


 if(!QuotePanding){

  FormMethods.setValue("items",

    QuoteData.QuotationDetails
  )

  FormMethods.setValue("ClientId",

    QuoteData.ClientId
  )

 }

    if (CompanyData) {
      FormMethods.setValue("CompanyId", CompanyData.CompanyId as string);
    }
    if(!path){
      alert("No Quotation Id")
      return
    }

    const QuotationId= path.get("QuoteId")

  FormMethods.setValue("QuotationId",QuotationId as string)
   
  },[path,UserId,CompanyData])
  const TableQuery = (QuotationId: string | null) => {
      return useQuery({
        queryKey: [QueryModels.QuotationById],
        queryFn: async () => {
          return Read("/api/root/dashboard/listOf/quotations/QuoteToEdit", {
            QuotationId,
          });
        },
       
        gcTime:0,
        staleTime:0,
        enabled: !!QuotationId,
      });
    };
const { data:QuoteData, isPending:QuotePanding } = TableQuery(FormMethods.getValues("QuotationId"));


console.log(QuoteData)


  const { control, handleSubmit, watch } = FormMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const ClientQuery = useQuery({
    queryKey: [QueryModels.Clients.QueryKey],
    queryFn: async () => {
      return Read<Items[]>(QueryModels.Clients.ApiEndpoint);
    },
  });

  const CompQuery = useQuery({
    queryKey: [QueryModels.Items.QueryKey],
    queryFn: async () => {
      return Read<Items[]>(QueryModels.Items.ApiEndpoint);
    },
  });

  const { data, isPending } = CompQuery;

  const { data: ClientData, isPending: ClientPending } = ClientQuery;
  const items = watch('items');
  const sumTotal = items?items.filter((val)=>val.Description!=="" && val.Description!==null && val.Description!==undefined ).reduce((sum, item) => sum + (item.Quantity || 0) * item.Amount, 0):0;


  
  const FormMutation = useMutation({
    mutationKey:[MutationModels.Quotations.MutationKey],
    mutationFn: async (data:FormType ) => {
      //Create has been supplied by HOC. It comes from MttFetch
      return await Create("/api/root/dashboard/Quotations/update", data);
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
      QClient.invalidateQueries({ queryKey: MutationModels.Quotations.Dependants });

      //Reset form fields
      FormMethods.reset();

   

      toast({
        title: "SUCCESS",
        description: `${FormName} created successfully`,
      });
      const QuotationId= path.get("QuoteId")
      MttRedirect(`/dashboard/quote/Edit?QuoteId=${QuotationId}`)
    },
  });
  const FormSubmit: SubmitHandler<FormType> = (data) => {

   
  FormMutation.mutate(data)
  };

   
  return (
    <div className="  mtt-Alpha w-full mtt-center !flex-col !items-start !justify-start pt-8">
      <div className=" px-[38px] mtt-center !justify-between w-full">
        <h4 className="text-2xl font-normal mb-4"> {`${CompanyData?.Currency as string} ${sumTotal.toFixed(2)}`}</h4>

        <p className=" "><span className="font-bold mr-4">Quote ID: </span>{FormMethods.getValues("QuotationId")}</p>
      </div>

     
      <MttForm
    
  
isLoading={FormMutation.isPending}
        onSubmit={FormSubmit}
        Methods={FormMethods}
        className="space-y-4 w-full "
      >
        <IsLoading className=" mtt-center mr-auto" isLoading={ClientPending}>
          {ClientData &&  !QuotePanding && (
            <MttComboSearch
           InitialValue={QuoteData.ClientId}
              className=" w-[150px]"
              name="ClientId"
              label="Client"
              placeholder="Choose Client"
              SelectValues={GenerateSelectValues({
                IdColumn: "ClientId",
                NameColumn: "ClientName",
                data: ClientData,
              })}
            />
          )}
        </IsLoading>
        {/* 
<LiftOfitemsSelect IdColumn='ItemId' NameColumn='ItemCode' Placeholder='Select Item' endpoint='/api/root/dashboard/listOf/items/'/> */}

        {/* Invoice Items Table */}
        <div className="overflow-x-auto w-full mtt-Alpha">
          <table className="w-full  shadow rounded-lg">
            <thead className=" bg-BaseShadeDark h-[60px]">
              <tr className="">
                <th className="p-2 text-left">Item Name</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {


if(field.Description!=="" && field.Description!==undefined && field.Description!==null){


  return (
<>
{items? <tr key={field.id}>
    <td className="p-2 w-[200px] ">
      <IsLoading className=" mtt-center" isLoading={isPending}>
        {data && (
          <MttComboSearch
          InitialValue={field.ItemId}
            className=" w-[150px]"
            callBack={(val) => {
              const selectedItem = data.find(
                (item) => item.ItemId === val
              );
              if (selectedItem) {
                FormMethods.setValue(
                  `items.${index}.Description`,
                  selectedItem.Description
                );
                FormMethods.setValue(
                  `items.${index}.Amount`,
                  parseInt(selectedItem.Amount.toString())
                );
                FormMethods.setValue(
                  `items.${index}.Quantity`,
                  1
                );
                FormMethods.setValue(
                  `items.${index}.inputEnabled`,
                  false
                );
              }
            }}
            name={`items.${index}.ItemId`}
            label=""
            placeholder="Choose Client"
            SelectValues={GenerateSelectValues({
              IdColumn: "ItemId",
              NameColumn: "ItemName",
              data: data,
            })}
          />
        )}
      </IsLoading>
    </td>
    <td className="p-2 w-[550px] ">
      <MttTextField
        name={`items.${index}.Description`}
        className=" border-none text-gray-500"
        label=""
        readOnly={true}
      />
    </td>
    <td className="p-2">
      <MttTextField
        className={cn(
          " !w-[60px] ",
          items[index].inputEnabled
            ? " !border-none text-gray-500"
            : ""
        )}
        name={`items.${index}.Quantity`}
        type="number"
        min="1"
        label=""
        readOnly={items[index].inputEnabled}
      />
    </td>
    <td className="p-2  w-[100px] ">
      <MttTextField
        name={`items.${index}.Amount`}
        className={cn(
          " !w-[100px] ",
          items[index].inputEnabled
            ? " !border-none text-gray-500"
            : ""
        )}
        type="number"
        label=""
        readOnly={items[index].inputEnabled}
      />
    </td>
    <td className="p-2  w-[100px] font-bold text-gray-500 text-[18px] ">
      { `${CompanyData?.Currency as string} ${(items[index].Quantity || 1) * items[index].Amount}` }
    </td>
    <td className="p-2 w-[50px]">
      {fields.length > 1 && (
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-Pri hover:text-red-700"
        >
          ✕
        </button>
      )}
    </td>
  </tr>:null}
</>
   
   
                )
}
              
              })}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <div className="flex justify-end mt-4">
          <div
            onClick={() =>
              append({
                ItemId: undefined,
                Description: "No item chosen",
                Quantity: 0,
                Amount: 0,
                inputEnabled: true,
              })
            }
            className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <Plus size={20} />
            <span className="ml-2">Add Item</span>
          </div>
        </div>


        {/* Submit Button */}
        <div className="text-right mt-4 absolute right-10 bottom-5">
          <IsLoading isLoading={false}>
            <MttSubmit>Update </MttSubmit>
          </IsLoading>
        </div>
      </MttForm>
    </div>
  );
};

const QuoteWithUtilities = withUtilities(Quote);
export default QuoteWithUtilities;
