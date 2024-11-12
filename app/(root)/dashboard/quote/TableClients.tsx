
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


// const events = [
//   {
//     id: "1",
//     title: "Music Festival 2024",
//     date: new Date("2024-11-01"),
//     time: "18:00",
//     location: "Los Angeles, CA",
//     venue: "LA Concert Hall",
//     poster: "/me.jpg",
//     createdAt: new Date("2024-10-01"),
//     updatedAt: new Date("2024-10-15"),
//     userId: "user123",
//   },
//   {
//     id: "2",
//     title: "Tech Conference",
//     date: new Date("2024-12-15"),
//     time: "09:00",
//     location: "San Francisco, CA",
//     venue: "SF Tech Center",
//     poster: "/me.jpg",
//     createdAt: new Date("2024-10-05"),
//     updatedAt: new Date("2024-10-20"),
//     userId: "user456",
//   },
//   {
//     id: "3",
//     title: "Art Expo",
//     date: new Date("2025-01-10"),
//     time: "14:00",
//     location: "New York, NY",
//     venue: "NY Art Gallery",
//     poster: "/me.jpg",
//     createdAt: new Date("2024-10-10"),
//     updatedAt: new Date("2024-10-22"),
//     userId: "user789",
//   },
//   {
//     id: "4",
//     title: "Startup Pitch Night",
//     date: new Date("2024-11-25"),
//     time: "17:30",
//     location: "Austin, TX",
//     venue: "Austin Innovation Hub",
//     poster: "/me.jpg",
//     createdAt: new Date("2024-09-15"),
//     updatedAt: new Date("2024-10-18"),
//     userId: "user101",
//   },
//   {
//     id: "5",
//     title: "Charity Gala",
//     date: new Date("2024-12-05"),
//     time: "19:00",
//     location: "Miami, FL",
//     venue: "Miami Grand Hotel",
//     poster: "/me.jpg",
//     createdAt: new Date("2024-10-07"),
//     updatedAt: new Date("2024-10-19"),
//     userId: "user102",
//   },
//   {
//     id: "6",
//     title: "Film Screening: Indie Movies",
//     date: new Date("2025-01-25"),
//     time: "20:00",
//     location: "Seattle, WA",
//     venue: "Seattle Film Center",
//     poster: "/me.jpg",
//     createdAt: new Date("2024-10-12"),
//     updatedAt: new Date("2024-10-21"),
//     userId: "user103",
//   }
// ];


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
header: "QT ID"
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
    
          
          