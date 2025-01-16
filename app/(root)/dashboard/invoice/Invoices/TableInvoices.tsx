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
import React, { useEffect, useState } from "react";

import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import { MutationModels, QueryModels } from "@/components/mtt/config/ReactQueryConfig";
import { MttTable } from "@/components/mtt/components/MttTable";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { Invoices } from "@prisma/client";
import { MttRedirect } from "@/components/mtt/Helpers/MttRedirect";

const OriginalComponent = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  const { Read, Create, toast, QClient, IsLoading } = Utilities;

  const setActive = (EventId: string) => {
    TableMutationActivate.mutate({ EventId });
  };

  const TableQuery = useQuery({
    queryKey: [QueryModels.Quotations.QueryKey],
    queryFn: async () => {
      return await Read("/api/root/dashboard/Invoice/all/");
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

  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(null);

  const { data: quoteData } = useQuery({
    queryKey: ["quotationById", selectedQuotationId],
    queryFn: async () => {
      return Read("/api/root/dashboard/listOf/quotations/QuoteToEdit", {
        QuotationId: selectedQuotationId,
      });
    },
    enabled: !!selectedQuotationId,
  });

  const Mut = useMutation({
    mutationKey: ["CreateInvoice"],
    mutationFn: async () => {
      return await Create(`/api/root/dashboard/Invoice/create`, quoteData);
    },
    onError: () => {
      toast({
        title: "ERROR",
        description: `Failed to create Invoice`,
      });
    },
    onSuccess: () => {
      QClient.invalidateQueries({ queryKey: MutationModels.Quotations.Dependants });
      toast({
        title: "SUCCESS",
        description: `Invoice created successfully`,
      });
    },
  });

  useEffect(() => {
    if (selectedQuotationId && quoteData) {
      Mut.mutate();
    }
  }, [quoteData]);

  const columns: ColumnDef<Invoices>[] = [
    {
      accessorFn: (row) => row.clients?.ClientName || "N/A",
      header: "Client Name",
      meta: { Class: "", ConditionalClass: "text-red-500" },
    },
    {
      accessorKey: "user",
      header: "User Name",
      cell: (val) => <p>{val.getValue()?.name || "N/A"}</p>,
      meta: { Class: "", ConditionalClass: "text-red-500" },
    },
    {
      accessorKey: "InvoiceId",
      header: "Invoice ID",
      cell: (val) => {
        const value = val.getValue();
        return <p>{value ? value.slice(0, 6) : "N/A"}...</p>;
      },
      meta: { Class: "", ConditionalClass: "text-red-500" },
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: { Class: "", ConditionalClass: "text-red-500" },
    },
    {
      accessorKey: "total",
      header: "Total",
      meta: { Class: "", ConditionalClass: "text-red-500" },
    },
    {
      accessorKey: "status",
      header: "Action",
      cell: (val) => {
        const IsActive = val.getValue();
        return (
          <Select
            onValueChange={(SelectedItem) => {
              const InvoiceId = val.row.original.InvoiceId;

              if (SelectedItem === "pdf") {
                MttRedirect(`/dashboard/invoice/invoicePdf?InvoiceId=${InvoiceId}`);
              }

              if (SelectedItem === "chat") {
                MttRedirect(`/dashboard/quote/Chat?QuoteId=${InvoiceId}`);
              }

              if (SelectedItem === "edit") {
                MttRedirect(`/dashboard/quote/Edit?QuoteId=${InvoiceId}`);
              }

              if (SelectedItem === "convert") {
                setSelectedQuotationId(val.row.original.QuotationId);
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
      meta: { Class: "", ConditionalClass: "text-red-500" },
    },
  ];

  return (
    <IsLoading className="w-full" isLoading={isPending}>
      <MttTable data={data || []} columns={columns} />
    </IsLoading>
  );
};

const TableInvoices = withUtilities(OriginalComponent);
export default TableInvoices;
