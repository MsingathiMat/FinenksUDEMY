"use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as Tabs from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const MttTabContainer = ({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "  w-full h-full  relative CENTER sm:!justify-start",
        className
      )}
    >
      <Tabs.Root defaultValue={defaultValue} className=" h-full w-full ">
        {children}
      </Tabs.Root>
    </div>
  );
};

const MttTabList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Tabs.List
      aria-label="tabs example"
      className={cn(
        "CENTER gap-5 h-[45px] !justify-start px-1 sm:px-8 w-full  border border-t-0 border-l-0 border-r-0 !border-b-gray-400",
        className
      )}
    >
      {children}
    </Tabs.List>
  );
};

const MttTabTrigger = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => {
  return (
    <Tabs.Trigger
      value={value}
      className={cn(
        "  data-[state=active]:border-b-2 data-[state=active]:border-Sec relative px-4 mtt-textSec  h-[45px]  data-[state=active]:text-Sec",
        className
      )}
    >
      {children}
    </Tabs.Trigger>
  );
};

const MttTabContent = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => {
  return (
    <Tabs.Content
      value={value}
      className={cn("  CENTER !justify-start ", className)}
    >
      {children}
    </Tabs.Content>
  );
};

export { MttTabContainer, MttTabContent, MttTabList, MttTabTrigger };
