"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SelectValues {
  value: string
  label: string
  id: string
}

export function MttSearchCombo({placeholder,className,SelectValues, Onselect, returnAValue  }: {placeholder:string,className?:string, SelectValues: SelectValues[],Onselect:(value:string)=>void,returnAValue?:boolean }) {
  const [open, setOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState<string>("")


  const frameworks = SelectValues
  const selectedLabel = frameworks.find((framework) => framework.id === selectedId)?.label || placeholder

  // Filter frameworks by the label for searching, ensuring the label is defined
  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Popover  open={open} onOpenChange={setOpen}>
      <PopoverTrigger className=" data-[state=selected]:!bg-red-700" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full text-[13px] font-normal justify-between mtt-BaseShadeHover5White group text-textPri rounded-md   h-InputHeight !border-input ",className)}
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className=" bg-BaseShadeWhite  rounded-md">
          <CommandInput 
            placeholder={"Search"}
            value={searchQuery}
            onValueChange={setSearchQuery}
           
          />
          <CommandList>
            <CommandEmpty   >No value found</CommandEmpty>
            <CommandGroup >
              {filteredFrameworks.map((framework) => (
                <CommandItem

            className={cn(selectedId === framework.id ? "text-Pri" : "")}
                  key={framework.id}
                  value={framework.label} // Search by label, but use id for selection
                  onSelect={() => {
                    setSelectedId(framework.id) // Use id as selected value
                    setOpen(false)

                    if(returnAValue){

                      Onselect(framework.label)
                    }else{
                      Onselect(framework.id)

                    }
                  
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedId === framework.id ? "opacity-100 text-Pri" : "opacity-0"
                    )}
                  />
                  {framework.label} 
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
