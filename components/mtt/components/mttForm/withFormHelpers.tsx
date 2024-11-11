"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useMttFetch } from "../../Api/Mttfetch";
import { useToast } from "@/hooks/use-toast";
import useActiveUser from "../../Hooks/useActiveUser";

import ConvertToFormData from "../../Helpers/ConvertToFormData";

import { ActiveUserType, FormHelperProps } from "../../Types/MttTypes";
import useMttMedia from "./mttMedia/useMttMedia";
import IsLoading from "../Isloading";

const withFormHelpers = <T extends object>(
  OriginalComponent: React.ComponentType<T & { FormHelpers: FormHelperProps }>
) => {
  const NewFunction = (props: T) => {
    const { CRUUD } = useMttFetch();
    const QClient = useQueryClient();
    const { toast } = useToast();
    const { MttImageDisplay, MttImageFile, reset: ImageReset } = useMttMedia();
    const { userData } = useActiveUser<ActiveUserType>();
    const UserId = userData?.activeId;
    const ObjectToFormData = ConvertToFormData;
    const FormHelpers = {
      ...CRUUD,
      QClient,
      toast,
      UserId,
      MttImageFile,
      MttImageDisplay,
      ImageReset,
      ObjectToFormData,
      IsLoading,
    };
    return <OriginalComponent {...props} FormHelpers={FormHelpers} />;
  };
  return NewFunction;
};

export default withFormHelpers;
