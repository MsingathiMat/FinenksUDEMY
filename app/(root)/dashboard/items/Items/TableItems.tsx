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

import {
  MutationModels,
  QueryModels,
} from "@/components/mtt/config/ReactQueryConfig";
import MttImage from "@/components/mtt/components/MttImage";
import { MttTable } from "@/components/mtt/components/MttTable";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { Items } from "@prisma/client";
import { FilePenLine } from "lucide-react";
import { MttPopup } from "@/components/mtt/components/MttPopup";
import { Input } from "@/components/ui/input";
import MttForm, {
  MttSubmit,
  MttTextField,
} from "@/components/mtt/components/mttForm/mttForm";
import MttFieldUpdater from "@/components/mtt/components/MttFieldUpdater";
import { z } from "zod";

const OriginalComponent = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  const { Read, Create, toast, QClient, IsLoading } = Utilities;

  const setActive = (ItemId: string,Value:string) => {
    TableMutationActivate.mutate({ EventId });
  };

  const FormSchema = z
      .object({
        UniqueField: z.string().min(1, "Required"),
        UniqueValue: z.string().min(1, "Required"),
        tableName: z.string().min(1, "Required"),
        UpdatedField: z.string().min(1, "Required"),
        UpdatedValue: z.string().min(1, "Required"),
        
      })
      
    ;

    type FormType = z.infer<typeof FormSchema>;
  const TableQuery = useQuery({
    queryKey: [QueryModels.Items.QueryKey],
    queryFn: async () => {
      return await Read<Items[]>(QueryModels.Items.ApiEndpoint);
    },
    gcTime: 0,
    staleTime: 0,
  });

  const {mutate:ChangeItemStatus,isPending:ItemStatusPending} = useMutation({
    mutationKey: ["SetActiveItem"],
    mutationFn: async ({ ItemId,Status }: { ItemId: string, Status:string }) => {

      const Data:FormType = {

        UniqueField: "ItemId",
        UniqueValue: ItemId,
        tableName: "Items",
        UpdatedField: "ItemStatus",
        UpdatedValue: Status
      }

      return await Create("/api/FieldUpdater/", { ...Data });
    },
    onSettled: () => {
      QClient.invalidateQueries({
        queryKey: [QueryModels.Items.QueryKey],
      });
    },
    onSuccess: () => {
      toast({ title: "SUCCESSFUL", description: "Event status updated" });
    },
  });

  const { data, isPending } = TableQuery;

  const columns: ColumnDef<Items>[] = [
    {
      accessorKey: "ItemName",
      header: "name",

      cell: (val) => (
        <div className="mtt-center !justify-start gap-2">
          {val.getValue() as string}
          <MttPopup
            title="Edit Item Name"
            content={
              <div className="w-full">
                <MttFieldUpdater
                  UniqueValue={val.row.original.ItemId}
                  RevalidateKey="Items"
                  UniqueField="ItemId"
                  tableName="Items"
                  UpdatedField="ItemName"
                  UpdatedValue={val.getValue() as string}
                />
              </div>
            }
          >
            <FilePenLine
              className=" hover:cursor-pointer hover:text-Sec"
              size={15}
            />
          </MttPopup>
        </div>
      ),
    },
    {
      accessorKey: "Description",
      header: "Description",
      
      cell: (val) => (
        <div className="mtt-center !justify-start gap-2">
          {val.getValue() as string}
          <MttPopup
            title="Edit Description"
            content={
              <div className="w-full">
                <MttFieldUpdater
                  UniqueValue={val.row.original.ItemId}
                  RevalidateKey="Items"
                  UniqueField="ItemId"
                  tableName="Items"
                  UpdatedField="Description"
                  UpdatedValue={val.getValue() as string}
                />
              </div>
            }
          >
            <FilePenLine
              className=" hover:cursor-pointer hover:text-Sec"
              size={15}
            />
          </MttPopup>
        </div>
      ),
    },
    {
      accessorKey: "ItemStatus",
      header: "Status",
      cell: (val) => {
      
        const ItemId = val.row.original.ItemId
        return (
          
          <IsLoading  isLoading={ItemStatusPending}>
              <Select             onValueChange={(ItemStatus) => {
          
             
          ChangeItemStatus({ItemId,Status:ItemStatus})
         }}
       >
         <SelectTrigger className="w-[140px] border-none">
           <SelectValue placeholder={val.getValue() as string}/>
         </SelectTrigger>
         <SelectContent>
         <SelectItem value="ACTIVE">ACTIVE</SelectItem>
         <SelectItem value="INACTIVE">DEACTIVATE</SelectItem>
         </SelectContent>
       </Select>
          </IsLoading>
        
        );
      },
    },
    {
      accessorKey: "ItemType",
      header: "Type",
    },
    {
      accessorKey: "CompanyId",
      header: "Company ID",
    },
    
  ];

  // return <MtTable data={data ? data : []} columns={columns} />;

  return (
    <IsLoading className="w-full" isLoading={isPending}>
      <MttTable data={data ? data : []} columns={columns} />{" "}
    </IsLoading>
  );
};

const TableItems = withUtilities(OriginalComponent);
export default TableItems;
