import { cn } from "@/lib/utils";
import React from "react";

const MttIconTitle = ({
  icon,
  title,
  className,
  leftAligned,
}: IconText & { leftAligned?: boolean }) => {
  if (leftAligned) {
    return (
      <div className=" mtt-center  gap-3  w-full ">
        {icon}
        <h1 className={cn(" font-semibold text-lg", className)}>{title}</h1>

        <hr className="border mt-3 border-slate-200 dark:border-input flex-1" />
      </div>
    );
  }

  return (
    <div className=" mtt-center  gap-3  w-full ">
      {icon}
      <h1 className={cn(" font-semibold text-lg mr-auto", className)}>{title}</h1>

     
    </div>
  );
};

export default MttIconTitle;
