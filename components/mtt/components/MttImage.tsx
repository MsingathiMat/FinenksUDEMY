import Image from "next/image";
import React from "react";
import MttHover from "./MttHover";

const MttImage = ({
  src,
  width,
  height,
  fill,
  children,
  alpha,
}: {
  src: string;
  width?: number;
  height?: number;
  fill?: boolean;
  label?: string;
  children?: React.ReactNode;
  alpha?: "1" | "2" | "3";
}) => {
  return (
    <>
      {fill ? (
        <div className="group relative w-full h-full border-input rounded-md overflow-hidden">
          <Image
            fill
            src={src}
            alt=""
            className=" object-cover object-center -z-0 "
          />

          {children ? <MttHover alpha={alpha}>{children}</MttHover> : null}
        </div>
      ) : (
        <Image
          width={width ? width : 120}
          height={height ? height : 120}
          src={src}
          alt=""
          className="  "
        />
      )}
    </>
  );
};

export default MttImage;
