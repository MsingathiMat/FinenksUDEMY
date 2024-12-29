import { cn } from '@/lib/utils'
import React from 'react'
import { format } from "date-fns";
const MttChat = ({SignedInUserId, ChatData}:{SignedInUserId:string, ChatData:[{UserId:string,Message:string,createdAt:string,Users:{name:string}}]}) => {

   
  return (
    <>
      
      {
        ChatData ? (
          <div className="mtt-center gap-2 !items-start !flex-col w-full">
            {
              ChatData.map((chat,_) => (
                <div key={chat.UserId} className={cn(
                  chat.UserId === SignedInUserId ? "ml-auto" : "mr-auto"
                )}>
                 
      
                  {/* Chat Bubble */}
                  <div 
                    className={cn(
                      "relative p-3 pr-4 rounded-[14px]  h-fit mtt-center !justify-start !items-start !flex-col gap-2 px-5",
                      chat.UserId === SignedInUserId
                        ? "bg-green-100 dark:bg-green-300 text-right rounded-tr-none"
                        : "bg-blue-100 dark:bg-blue-300 text-left rounded-tl-none"
                    )}
                  >
      
                     {/* User Name */}
                  <div className={cn(
                    "text-sm font-semibold",
                    chat.UserId === SignedInUserId ? "text-right" : "text-left"
                  )}>
                    {chat.Users.name}
                  </div>
      
                   <div className="relative    h-full w-full mtt-center !justify-start gap-4 px-5">
                     {/* Profile Image */}
                     <img
                      src={chat.Users.ProfileImage}
                      className="shadow-md size-[35px] rounded-full"
                    />
                    {/* Message */}
                    <p className="text-gray-700">
                      {chat.Message}
                    </p>
      
                   
                   </div>
                    {/* Timestamp */}
                    <p className="  !text-[11px] ml-auto">
                      {format(new Date(chat.createdAt), "dd MMMM yyyy HH:mm")}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        ) : null
      }
    </>
  )
}

export default MttChat
