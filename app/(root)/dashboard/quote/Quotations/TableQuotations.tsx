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
import React, { useState } from "react";

import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import { MutationModels, QueryModels } from "@/components/mtt/config/ReactQueryConfig";
import { MttTable } from "@/components/mtt/components/MttTable";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { Quotations } from "@prisma/client";
import { MttRedirect } from "@/components/mtt/Helpers/MttRedirect";

const OriginalComponent = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  const { Read, Create, toast, QClient, IsLoading } = Utilities;

  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(null);

  const TableQuery = useQuery({
    queryKey: [QueryModels.Quotations.QueryKey],
    queryFn: async () => {
      return await Read("/api/root/dashboard/listOf/quotations/");
    },
    gcTime: 0,
    staleTime: 0,
  });



  

  const Mut = useMutation({
    mutationKey: ["CreateInvoice"],
    mutationFn: async (quoteData) => {
      return await Create(`/api/root/dashboard/Invoice/create`, quoteData);
    },
    onError: () => {
      toast({
        title: "ERROR",
        description: `Failed to create Invoice`,
      });
    },
    onSuccess: () => {
    
      TableQuery.refetch()
      toast({
        title: "SUCCESS",
        description: `Invoice created successfully`,
      });
    },
  });

  const { data, isPending } = TableQuery;

  const columns: ColumnDef<Quotations>[] = [
    {
      accessorFn: (row) => row.clients.ClientName,
      header: "Client Name",
      meta: { Class: "", ConditionalClass: " text-green-500" },
    },
    {
      accessorKey: "user",
      header: "User Name",
      cell: (row) => row.getValue().name,
      meta: { Class: "", ConditionalClass: " !text-green-500" },
    },
    {
      accessorKey: "QuotationId",
      header: "QT ID",
      cell: (val) => <p>{val.getValue().slice(0, 6)}...</p>,
      meta: { Class: "", ConditionalClass: " text-green-500" },
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: { Class: "", ConditionalClass: " text-green-500" },
    },
    {
      accessorKey: "total",
      header: "Total",
      meta: { Class: "", ConditionalClass: " text-green-500" },
    },
    {
      accessorKey: "status",
      header: "Action",
      cell: (val) => {
        return (
          <Select
            onValueChange={async (SelectedItem) => {
              if (SelectedItem === "pdf") {
                MttRedirect(`/dashboard/quote/quotePdf?QuoteId=${val.row.original.QuotationId}`);
              }

              if (SelectedItem === "chat") {
                MttRedirect(`/dashboard/quote/Chat?QuoteId=${val.row.original.QuotationId}`);
              }

              if (SelectedItem === "edit") {
                MttRedirect(`/dashboard/quote/Edit?QuoteId=${val.row.original.QuotationId}`);
              }

              if (SelectedItem === "convert") {
             

                // Trigger mutation directly after selecting "convert"
                const quoteDataResult = await Read(
                  "/api/root/dashboard/listOf/quotations/byId",
                  { QuotationId: val.row.original.QuotationId }
                );

                if (quoteDataResult) {
                  Mut.mutate(quoteDataResult);

                
                }
              }
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">
                <p className="hover:text-Pri hover:cursor-pointer">View Pdf</p>
              </SelectItem>
              <SelectItem value="chat">
                <p className="hover:text-Pri hover:cursor-pointer">Chats</p>
              </SelectItem>
              <SelectItem value="edit">
                <p className="hover:text-Pri hover:cursor-pointer">Edit</p>
              </SelectItem>
              <SelectItem value="convert">
                <p className="hover:text-Pri hover:cursor-pointer">Convert</p>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
      meta: { Class: "", ConditionalClass: " text-green-500" },
    },
  ];

  return (
    <IsLoading className="w-full" isLoading={isPending}>
   <IsLoading className="w-full" isLoading={Mut.isPending}>

   <MttTable data={data ? data : []} columns={columns} />
   </IsLoading>
    </IsLoading>
  );
};

const TableQuotations = withUtilities(OriginalComponent);
export default TableQuotations;


