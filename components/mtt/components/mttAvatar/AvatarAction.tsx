import React from "react";

import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

const AvatarAction = ({
  actionMethod,
  label,
}: {
  actionMethod: () => void;
  label: string;
}) => {
  return (
    <DropdownMenuRadioItem
      onClick={() => {
        actionMethod();
      }}
      className=" text-[12px] hover:!bg-BaseShadeDark"
      value="bottom"
    >
      {label}
    </DropdownMenuRadioItem>
  );
};

export default AvatarAction;
