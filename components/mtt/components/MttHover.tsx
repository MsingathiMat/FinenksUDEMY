"use client";
import { cn } from "@/lib/utils";
import React, { isValidElement } from "react";
import MttAlphaBottom from "./MttAlphaBottom";


export const BaseLayer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

BaseLayer.displayName = "BaseLayer";

export const HoverLaver = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

HoverLaver.displayName = "HoverLaver";

const MttHover = ({
  children,
  className,
  alpha
}: {
  children: React.ReactNode;
  className?: string;
  alpha?:"1"|"2"|"3"
}) => {


 
  // Separate the children into BaseLayer and HoverLaver components
  let baseLayer: React.ReactNode = null;
  let hoverLaver: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    
   
    if (isValidElement(child)) {
      if (child.key === "BaseLayer") {
   
          baseLayer = child;
      
      } else if (child.key?.toString()  === "HoverLaver") {
   
          hoverLaver = child;
    
      }
    }
  });

  return (
    <div className={cn("  relative w-full h-full p-4 ",hoverLaver &&baseLayer?" hover:cursor-pointer ":"")}>
      {baseLayer ? (
        hoverLaver ? (
          <div className="absolute top-0 left-0   group-hover:hidden w-full h-full">
            {baseLayer}
          </div>
        ) : (
          <div className="absolute top-0 left-0   w-full h-full">
            {baseLayer}
          </div>
        )
      ) : null}

      {hoverLaver ? (
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 ",
            className
          )}
        >

          {
            alpha?<MttAlphaBottom alpha={alpha}>  {hoverLaver}</MttAlphaBottom>:<MttAlphaBottom >  {hoverLaver}</MttAlphaBottom>
          }
        
        </div>
      ) : null}
    </div>
  );
};

export default MttHover;
