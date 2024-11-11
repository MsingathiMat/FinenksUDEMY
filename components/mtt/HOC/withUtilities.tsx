"use client";

import { useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";

import { ActiveUserType, UtilitiesProp } from "../Types/MttTypes";
import { useMttFetch } from "../Api/Mttfetch";
import useMttMedia from "../components/mttForm/mttMedia/useMttMedia";
import useActiveUser from "../Hooks/useActiveUser";
import ConvertToFormData from "../Helpers/ConvertToFormData";
import IsLoading from "../components/Isloading";
import { Prisma } from "@prisma/client";
const withUtilities = <T extends object>(
  OriginalComponent: React.ComponentType<T & { Utilities: UtilitiesProp }>
) => {
  const NewFunction = (props: T) => {
    const { CRUUD } = useMttFetch();
    const QClient = useQueryClient();
    const { toast } = useToast();
    const { MttImageDisplay, MttImageFile, reset: ImageReset } = useMttMedia();
    const { userData } = useActiveUser<ActiveUserType>();
    const UserId = userData?.activeId;
    const ObjectToFormData = ConvertToFormData;
    const PrismaTypes = Prisma;
    const Utilities = {
      ...CRUUD,
      QClient,
      toast,
      UserId,
      MttImageFile,
      MttImageDisplay,
      ImageReset,
      ObjectToFormData,
      IsLoading,
      PrismaTypes,
    };
    return <OriginalComponent {...props} Utilities={Utilities} />;
  };
  return NewFunction;
};

export default withUtilities;
