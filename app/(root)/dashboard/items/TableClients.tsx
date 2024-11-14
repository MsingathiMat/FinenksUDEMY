
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


import { MutationModels, QueryModels } from "@/components/mtt/config/ReactQueryConfig";
import MttImage from "@/components/mtt/components/MttImage";
import { MttTable } from "@/components/mtt/components/MttTable";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { Items } from "@prisma/client";






const OriginalComponent = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  
  const { Read, Create, toast, QClient, IsLoading } = Utilities;

  // const setActive = (EventId: string) => {
  //   TableMutationActivate.mutate({ EventId });
  // };

  const TableQuery = useQuery({
    queryKey: [QueryModels.Items.QueryKey],
    queryFn: async () => {
      return await Read<Items[]>(QueryModels.Items.ApiEndpoint);
    },
    gcTime: 0,
    staleTime: 0,
  });

  // const TableMutationActivate = useMutation({
  //   mutationKey: ["TO CHANGE"],
  //   mutationFn: async ({ EventId }: { EventId: string }) => {
  //     return await Create("/api/tables/TableEvents/UpdateStatus/", { EventId });
  //   },
  //   onSettled: () => {
  //     QClient.invalidateQueries({
  //       queryKey: [MutationModels.Event.Dependants],
  //     });
  //   },
  //   onSuccess: () => {
  //     toast({ title: "SUCCESSFUL", description: "Event status updated" });
  //   },
  // });

  const { data, isPending } = TableQuery;



  const columns: ColumnDef<Items>[] = [
    {
      accessorKey: "ItemName",
      header: "name",
    },
    {
      accessorKey: "ItemId",
      header: "Item ID",
    },
    {
      accessorKey: "ItemStatus",
      header: "Status",

    },
    {
      accessorKey: "ItemType",
      header: "Type",
    },
    {
      accessorKey: "CompanyId",
      header: "Company ID",
    },
    {
      accessorKey: "status",
      header: "Action",
      cell: (val) => {
        const IsActive = val.getValue();
        return (
          <Select
            onValueChange={() => {
              // setActive(val.row.original.id);
            }}
          >
            <SelectTrigger className="w-auto">
              <SelectValue placeholder={IsActive ? "ACTIVE" : "INACTIVE"} />
            </SelectTrigger>
            <SelectContent>
              {IsActive ? (
                <SelectItem value="INACTIVE">DEACTIVATE</SelectItem>
              ) : (
                <SelectItem value="ACTIVE">ACTIVATE</SelectItem>
              )}
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

const TableClients = withUtilities(OriginalComponent);
export default TableClients;
    
          
          