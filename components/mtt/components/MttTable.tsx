"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useState } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import MttSearchField from "./MttSearchField"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function MttTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>("")
  const [selectedRowIds, setSelectedRowIds] = useState<{ [key: string]: boolean }>({}) // Selected rows state

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  })

  // Toggle individual row selection
  const toggleRowSelection = (rowId: string) => {
    setSelectedRowIds((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  // Toggle select all
  const toggleSelectAll = () => {
    const isAllSelected = table.getRowModel().rows.every(
      (row) => selectedRowIds[row.id]
    )
    const newSelectedRowIds = table.getRowModel().rows.reduce(
      (acc: { [key: string]: boolean }, row) => {
        acc[row.id] = !isAllSelected
        return acc
      },
      {}
    )
    setSelectedRowIds(newSelectedRowIds)
  }

  // Collect data of selected rows
  const getSelectedRowData = () => {
    const selectedRows = table.getRowModel().rows.filter(
      (row) => selectedRowIds[row.id]
    )
    const selectedData = selectedRows.map((row) => row.original) // Original data of the selected rows
    return selectedData
  }

  return (
    <div className=" border-none sm:BORDER w-fit sm:w-full px-4 py-2 h-auto sm:h-[490px] CENTER !items-start !justify-start !flex-col">
      {/* Global filter input that applies to all columns */}
     
        <div className=" w-full CENTER !justify-start gap-4 mb-4 sm:mb-0">
        <MttSearchField className='bg-gray-700' onTextChange={(val)=>setGlobalFilter(val)} />
        <div className="py-4">
        <Button
        className="hidden sm:block"
          onClick={() => {
            const selectedData = getSelectedRowData()
            alert(JSON.stringify(selectedData, null, 2))
          }}
          disabled={Object.keys(selectedRowIds).length === 0} // Disable button if no rows are selected
        >
          Alert Selected Rows
        </Button>
      </div>
        </div>
     <div className=" w-full flex-1">

     <Table >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {/* Checkbox in header for "Select All" */}
              <TableHead>
                <input
                className="hover:cursor-pointer"
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={table.getRowModel().rows.every(
                    (row) => selectedRowIds[row.id]
                 
                  )}
                />
              </TableHead>
              {headerGroup.headers.map((header) => {
                const className = header.column.columnDef.meta as string
                return (
                  <TableHead key={header.id} className={className}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {/* Checkbox for selecting individual row */}
                <TableCell>
                  <input
                   className="hover:cursor-pointer bg-red-400"
                    type="checkbox"
                    checked={!!selectedRowIds[row.id]}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </TableCell>
                {row.getVisibleCells().map((cell) => {
                  const className = cell.column.columnDef.meta as string
                  return (
                    <TableCell key={cell.id} className={className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
     </div>

      {/* Button for alerting selected row data */}
    

      {/* Pagination Controls */}
      <div className="flex justify-start gap-4 items-center ">


        <ChevronLeft size={30} className={cn("", table.getCanPreviousPage()?"text-orange-400 hover:cursor-pointer":"text-slate-500 opacity-0 ")} onClick={() =>table.previousPage()}/>
       
      
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <ChevronRight size={30} className={cn("", table.getCanNextPage()?"text-orange-400 hover:cursor-pointer":"text-slate-500 opacity-0")} onClick={() => table.nextPage()}/>
       
      
      </div>
    </div>
  )
}

export { MttTable }
