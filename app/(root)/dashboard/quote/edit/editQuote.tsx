"use client";
import React, { useEffect, useState } from "react";
import MttForm, {
  MttComboSearch,
  MttSelect,
  MttSubmit,
  MttTextArea,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mic, Paperclip, Plus, SendHorizontal } from "lucide-react";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import LiftOfitemsSelect from "@/components/AppComponents/ListOfSelects/ListOfItemSelect";
import MttpopulatedSelect from "@/components/mtt/components/mttForm/mttPopulatedSelect";
import GenerateSelectValues from "@/components/mtt/Helpers/GenerateSelectValues";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  MutationModels,
  QueryModels,
} from "@/components/mtt/config/ReactQueryConfig";
import { Items } from "@prisma/client";
import { MttSearchCombo } from "@/components/mtt/components/mttSearchCombo";
import { cn } from "@/lib/utils";
import uuid4 from "uuid4";
import Link from "next/link";
import Textarea from "react-expanding-textarea";
import MttImage from "@/components/mtt/components/MttImage";
import { useParams, useSearchParams } from "next/navigation";
import IsLoading from "@/components/mtt/components/Isloading";
import { format } from "date-fns";
import MttChat from "@/components/mtt/components/MttChat";
const OriginalComponent = ({
  Utilities,

}: {
  Utilities: UtilitiesProp;

}) => {
  const {
    UserId,
    Create,
    toast,
    QClient,

 
    Read,
  } = Utilities;

 

  // Schema for form validation
  const FormSchema = z.object({
    QuotationId: z.string().min(1, "Required"),
    UserId: z.string().min(1, "Required"),
    Message: z.string().min(1, "Required"),
  });

  const path = useSearchParams()

  const QuotationId= path.get("QuotationId")
  const FormName = "Message";
  type FormType = z.infer<typeof FormSchema>;
  const FormMethods = useForm<FormType>({
    defaultValues: {
      QuotationId: QuotationId?QuotationId:"",
      UserId: UserId,
      Message: "",
    },
    resolver: zodResolver(FormSchema),
  });


  const FormQuery = (QuotationId: string | null) => {
    return useQuery({
      queryKey: [QueryModels.QuotationById],
      queryFn: async () => {
        return Read("/api/root/dashboard/listOf/quotations/byId/", {
          QuotationId,
        });
      },
      refetchInterval:5000,
      gcTime:0,
      staleTime:0,
      enabled: !!QuotationId,
    });
  };

  const { data: QuoteData, refetch, isPending } = FormQuery(QuotationId);


  useEffect(() => {
    if (UserId) {
      FormMethods.setValue("UserId", UserId);
    }

    if (QuotationId) {
      FormMethods.setValue("QuotationId", QuotationId);
    }
  }, [UserId]);

  const FormMutation = useMutation({
    mutationKey: [MutationModels.QuotationChat.MutationKey],
    mutationFn: async (data: FormType) => {
      //Create has been supplied by HOC. It comes from MttFetch
      return await Create(
        "/api/root/dashboard/FormChatQuote/",

        data
      );
    },
    onError: () => {
      //toast has been supplied by HOC. It comes from Shadcn
      toast({
        title: "ERROR",
        description: `Failed to create ${FormName}`,
      });
    },
    onSuccess: () => {
    
      QClient.invalidateQueries({
        queryKey: ["QuotationById"],
      });

      refetch()

      //Reset form fields
      FormMethods.reset();

    },
  });
  const FormSubmit: SubmitHandler<FormType> = (data) => {
    FormMutation.mutate(data);
  };

  return (
    <div className="px-8 relative  mtt-Alpha !w-full mtt-center !flex-col !items-start !justify-start pt-2">
     
     <IsLoading isLoading={isPending} className="w-full h-full">
      <div className=" mtt-center  gap-8 py-4">
        {



<div className="text-[25px] font-bold  text-Pri">
R{QuoteData && QuoteData.total}
</div>

        }
        <div className="text-[18px]">
          <span className="font-bold">QID: </span>
          {QuoteData && QuoteData.QuotationId}
        </div>
        <div className="text-[18px]">
          <span className="font-bold">Client: </span>
          {QuoteData && QuoteData.clients.ClientName}
        </div>
        <div className="text-[18px]">
          <span className="font-bold">User: </span>
          {QuoteData && QuoteData.user.name}
        </div>
      </div>
</IsLoading>

{
  QuoteData&&<MttChat ChatData={ QuoteData.QuoteChats} SignedInUserId={UserId}/>
}


      <MttForm
        onSubmit={FormSubmit}
        Methods={FormMethods}
        className="space-y-4 !w-full   "
      >
       

        <div className=" relative mtt-center gap-2 w-full">
          <Textarea
            className=" px-4 pt-2 border border-input bg-Alpha w-full  ring-0 outline-none min-h-InputHeight p-1 text-[13px]"
            maxLength={300}
            {...FormMethods.register("Message")}
            placeholder="Type a Message "
          />

          <IsLoading isLoading={FormMutation.isPending} className="w-[90px]">
            <MttSubmit>
              <SendHorizontal />
            </MttSubmit>
          </IsLoading>
          <Paperclip
            size={24}
            className="hover:cursor-pointer hover:text-Pri "
          />
          <Mic className="hover:cursor-pointer hover:text-Pri " />
        </div>
        
      </MttForm>


      
    </div>
  );
};

const EditQuote = withUtilities(OriginalComponent);
export default EditQuote;
