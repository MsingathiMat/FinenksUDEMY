
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
import { AlertQuoteEdit } from "./edit/AlertQuoteEdit";
import EditQuote from "./edit/editQuote";
import Link from "next/link";
import { MttPopup } from "@/components/mtt/components/MttPopup";
import InvoicePage from "../../(docRender)/pdfQuotation/page";
import { FileMinus } from "lucide-react";


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
      return await Read<TypeEvent[]>("/api/root/dashboard/listOf/quotations/");
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

  console.log(data)
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
        const QID = val.row.original.QuotationId;
        return (

          // <AlertQuoteEdit  title="Quotation Chats" content={<EditQuote QuotationId={IsActive}/>}>

// </AlertQuoteEdit>

<Link href={`/dashboard/quote/edit?QuotationId=${QID}`}>Chat</Link>
          // <Select
          //   onValueChange={() => {
          //     setActive(val.row.original.id);
          //   }}
          // >
          //   <SelectTrigger className="w-auto">
          //     <SelectValue placeholder={IsActive ? "ACTIVE" : "INACTIVE"} />
          //   </SelectTrigger>
          //   <SelectContent>
          //   <SelectItem value="ACTIVE">


          //   </SelectItem>
          //   </SelectContent>
          // </Select>
        );
      },
    },

    {
      accessorKey: "status",
      header: "PDF",
      cell: (Val) => {
       
        return (

         <Link href={`http://localhost:3000/pdfQuotation?QuoteId=${Val.row.original.QuotationId}`}>View</Link>
        //   <MttPopup
        //   title="Quotation"
          
        //   content={
        //     <div className="w-[93VW] h-[600px]">
        //   <InvoicePage/>
        //     </div>
        //   }
        // >
        
        // <FileMinus size={20} className=" hover:text-Pri hover:cursor-pointer" />
        // </MttPopup>  
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

const TableClients = withUtilities(OriginalComponent);
export default TableClients;
    
          
          