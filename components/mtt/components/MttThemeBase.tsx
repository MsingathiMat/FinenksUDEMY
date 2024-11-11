import React from "react";
import { MttModeToggler } from "./MttModeToggler";

const MttThemeBase = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div className=" relative flex-1 mtt-center !flex-col h-full w-full   ">
      <div className=" w-full h-[50px] mtt-center  mt-8">
        <div className=" ml-auto">
          <MttModeToggler />
        </div>
      </div>
      <div className="w-full min-h-[calc(100vh-90px)] flex-1 mtt-center ">{children}</div>
    </div>
  );
};

export default MttThemeBase;
