import React from 'react'
import MttForm, { MttSubmit } from './mttForm/mttForm'
import Textarea from "react-expanding-textarea";
import IsLoading from "@/components/mtt/components/Isloading";
import { SendHorizontal } from 'lucide-react'
import { FieldValue, FieldValues, Path, UseFormReturn } from 'react-hook-form'

const MttChatReply = <T extends FieldValues>({
    onSubmit,
    Methods,
    isLoading,
    MessageField
  }: {
    Methods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    isLoading:boolean;
    MessageField:string
  }) => {
  return (
 
        <MttForm
   
   onSubmit={onSubmit}
   Methods={Methods}
   className="space-y-4 !w-full   "
 >
  

   <div className=" relative mtt-center gap-2 w-full">
     <Textarea
       className=" px-4 pt-2 border border-input bg-Alpha w-full  ring-0 outline-none min-h-InputHeight p-1 text-[13px]"
       maxLength={300}
       {...Methods.register(MessageField as Path<T>)}
       placeholder="Type a Message "
     />

     <IsLoading isLoading={isLoading} className="w-[90px]">
       <MttSubmit>
         <SendHorizontal />
       </MttSubmit>
     </IsLoading>
  
   </div>
   
 </MttForm>

 
  )
}

export default MttChatReply
