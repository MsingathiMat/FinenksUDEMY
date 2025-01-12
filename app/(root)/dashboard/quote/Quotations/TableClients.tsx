
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import { MutationModels, QueryModels } from "@/components/mtt/config/ReactQueryConfig";
import MttImage from "@/components/mtt/components/MttImage";
import { MttTable } from "@/components/mtt/components/MttTable";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { Quotations } from "@prisma/client";
import { AlertQuoteEdit } from "../Create/edit/AlertQuoteEdit";
import EditQuote from "../Create/edit/editQuote";
import Link from "next/link";
import { MttPopup } from "@/components/mtt/components/MttPopup";
import InvoicePage from "../../(docRender)/pdfQuotation/page";
import { FileMinus } from "lucide-react";
import { MttRedirect } from "@/components/mtt/Helpers/MttRedirect";


type TypeEvent = {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  venue: string;
  poster: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};



const OriginalComponent = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  
  const { Read, Create, toast, QClient, IsLoading } = Utilities;

  const setActive = (EventId: string) => {
    TableMutationActivate.mutate({ EventId });
  };

 
  const TableQuery = useQuery({
    queryKey: [QueryModels.Quotations.QueryKey],
    queryFn: async () => {
      return await Read("/api/root/dashboard/listOf/quotations/");
    },
    gcTime: 0,
    staleTime: 0,
  });

  const TableMutationActivate = useMutation({
    mutationKey: [MutationModels.Clients.MutationKey],
    mutationFn: async ({ EventId }: { EventId: string }) => {
      return await Create("/api/tables/TableEvents/UpdateStatus/", { EventId });
    },
    onSettled: () => {
      QClient.invalidateQueries({
        queryKey: [MutationModels.Clients.Dependants],
      });
    },
    onSuccess: () => {
      toast({ title: "SUCCESSFUL", description: "Event status updated" });
    },
  });

  const { data, isPending } = TableQuery;


  const columns: ColumnDef<Quotations>[] = [

    {
      accessorFn: row=>row.clients.ClientName,
      header: "Client Name",
    },
    {
      accessorKey:"user",
      header: "User Name",
   cell:row=>row.getValue().name
    },
   {
accessorKey: "QuotationId",
header: "QT ID",
cell:(val)=><p>{val.getValue().slice(0,6)}...</p>
   },
   
  
 
    {
      accessorKey: "status",
      header: "Status",
  
    },
    {
      accessorKey: "total",
      header: "total",
    },
    

  

      {
          accessorKey: "status",
          header: "Action",
          cell: (val) => {
            const IsActive = val.getValue();
            return (
              <Select
                onValueChange={(SelectedItem) => {
                
                  if(SelectedItem=="pdf"){
                    MttRedirect(`/dashboard/quote/quotePdf?QuoteId=${val.row.original.QuotationId}`)

                  }

                  if(SelectedItem=="chat"){
                    MttRedirect(`/dashboard/quote/Chat?QuoteId=${val.row.original.QuotationId}`)

                  }

                  if(SelectedItem=="edit"){
                    MttRedirect(`/dashboard/quote/Edit?QuoteId=${val.row.original.QuotationId}`)

                  }

                
                }}
              >
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="pdf">

<p className="hover:text-Pri hover:cursor-pointer">   View Pdf</p>
       
                </SelectItem>
               
                <SelectItem   value="chat">

                <p className="hover:text-Pri hover:cursor-pointer"> Chats</p>
                </SelectItem>

                <SelectItem value="edit">

<p className="hover:text-Pri hover:cursor-pointer">   Edit</p>
       
                </SelectItem>
                </SelectContent>

                
                
              </Select>
            );
          },
        },
  ];



 
  // return <MtTable data={data ? data : []} columns={columns} />;

  return (
    <IsLoading className="w-full" isLoading={isPending}>
      <MttTable data={data ? data : []} columns={columns} />{" "}
    </IsLoading>
  );
};

const TableQuotations = withUtilities(OriginalComponent);
export default TableQuotations;
    
          
          