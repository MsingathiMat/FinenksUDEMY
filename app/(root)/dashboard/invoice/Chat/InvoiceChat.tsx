"use client";
import React, { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import withUtilities from "@/components/mtt/HOC/withUtilities";


import { useMutation, useQuery } from "@tanstack/react-query";
import {
  MutationModels,
  QueryModels,
} from "@/components/mtt/config/ReactQueryConfig";


import uuid4 from "uuid4";

import { useSearchParams } from "next/navigation";
import IsLoading from "@/components/mtt/components/Isloading";

import MttChat from "@/components/mtt/components/MttChat";
import MttChatReply from "@/components/mtt/components/MttChatReply";
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
  type FormType = z.infer<typeof FormSchema>;

  const [QuotationId, SetQuotationId] = useState<string | null>(null)
  const path = useSearchParams()


  const FormName = "Message";

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
  
  useEffect(()=>{
    if(!path){
      alert("No Quotation Id")
      return
    }

    const QuotationId= path.get("QuoteId")

    SetQuotationId(QuotationId)
  },[path])
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
      // Create has been supplied by HOC. It comes from MttFetch
      return await Create(
        "/api/root/dashboard/FormChatQuote/",
        data
      );
    },
    onMutate: async (data: FormType) => {
      // Cancel any outgoing refetches to prevent overwriting optimistic updates
      await QClient.cancelQueries({
        queryKey: ["QuotationById"],
      });
  
      // Snapshot the previous value
      const previousQuoteData = QClient.getQueryData(["QuotationById"]);
  
      // Optimistically update the chat list
      QClient.setQueryData(["QuotationById"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          QuoteChats: [
            ...old.QuoteChats,
            {
              id: uuid4(), // Generate a temporary ID
              Message: data.Message,
              UserId: data.UserId,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });
  
      // Return a context object with the snapshotted value
      return { previousQuoteData };
    },
    onError: (error, data, context) => {
      // Rollback to the previous state if mutation fails
      if (context?.previousQuoteData) {
        QClient.setQueryData(["QuotationById"], context.previousQuoteData);
      }
      toast({
        title: "ERROR",
        description: `Failed to create ${FormName}`,
      });
    },
    onSettled: () => {
      // Refetch the data to ensure the UI matches the server state
      QClient.invalidateQueries({
        queryKey: ["QuotationById"],
      });
      refetch();
    },
    onSuccess: () => {
      // Reset the form fields
      FormMethods.reset();
      FormMethods.setValue("UserId", UserId as string);
      FormMethods.setValue("QuotationId", QuotationId as string);
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


<MttChatReply 

isLoading={FormMutation.isPending}
MessageField="Message"
onSubmit={FormSubmit}
        Methods={FormMethods}
/>
      
    </div>
  );
};

const InvoiceChat = withUtilities(OriginalComponent);
export default InvoiceChat;
