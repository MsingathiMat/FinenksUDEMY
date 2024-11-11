    
"use client";

import React from "react";
import MttForm, {
  MttCheckBox,
  MttDatePicker,
  MttRadioGroup,
  MttSelect,
  MttSubmit,
  MttTextArea,
  MttTextField,
  MttTimePicker,
} from "@/components/mtt/components/mttForm/mttForm";

import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UtilitiesProp } from "./mtt/Types/MttTypes";
import withUtilities from "./mtt/HOC/withUtilities";

// OriginalForm is expecting FormHelpers of type FormHelperProps which it will get from a Higher Order Component
// which is withFormHelpers
const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp })=>{
  // Declare FORM NAME or Table name
  const FormName = "User";

  // Get(Destructure) all the methods that your form will need from  FormHelpers
  const {
    Create,
    toast,
    MttImageFile,
    MttImageDisplay,
    ImageReset,
    ObjectToFormData,
    IsLoading,
    QClient,
  } = Utilities;

  // Create a FormSchema
  const FormSchema = z.object({
    userName: z.string().min(1, "Required"),
    email: z.string().email({ message: "Not Valid" }),
    codingLanguage: z.enum(["php", "javascript"], { message: "Required" }),
    bio: z.string().min(1, "Required"),
    availabilityDate: z.date({ message: "Required" }),
    availabilityTime: z.date({ message: "Required" }),
    agree: z.boolean().refine((val) => val === true, { message: "Required" }),
    profileImage1: z.instanceof(File, { message: "Required" }),
    profileImage2: z.instanceof(File, { message: "Required" }),
    gender: z.enum(["male", "female"]),
  });

  // Form Type
  type FormType = z.infer<typeof FormSchema>;

  // FormMethods
  const FormMethods = useForm<FormType>({
    defaultValues: {
      userName: "",
      bio: "",
      email: "",
      availabilityDate: undefined,
      availabilityTime: undefined,
      agree: undefined,
      profileImage1: undefined,
      profileImage2: undefined,
      gender: undefined,
    },
    resolver: zodResolver(FormSchema),
    mode: "all",
  });

  // Form Submit Method
  const FormSubmit: SubmitHandler<FormType> = (data) => {
    const ConvertedFormData = ObjectToFormData(data);

    FormMutation.mutate({ formData: ConvertedFormData });
  };

  const FormMutation = useMutation({
    mutationKey: ["mtUsers"],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      // Create has been supplied by HOC. It comes from MttFetch
      return await Create("/api/register", formData);
    },
    onError: () => {
      // toast has been supplied by HOC. It comes from Shadcn
      toast({
        title: "ERROR",
        description: `Failed to create ${FormName}`,
      });
    },
    onSuccess: () => {
      // QClient has been supplied by HOC. It comes from Shadcn
      QClient.invalidateQueries({ queryKey: ["getUsers"] });

      // Reset form fields
      // FormMethods.reset();

      // Reset MttImage - This clears input images on the UI
      ImageReset("imageUrl");

      // toast has been supplied by HOC. It comes from Shadcn
      toast({
        title: "SUCCESS",
        description: `${FormName} created successfully`,
      });
    },
  });

  // BOOLEAN CONDITIONALS - Booleans that are responsible for CONDITIONAL RENDERING
  const readOnly = FormMutation.isPending;
  const FormIsloading = FormMutation.isPending;

  return (
    <div className=" bg-BaseShadeWhite p-4 w-fit">
      <div className=" bg-BaseShadeWhite  p-2 w-fit">
        <MttForm
          title="Register"
          debugMode
          onSubmit={FormSubmit}
          Methods={FormMethods}
          className="mtt-center gap-6 mt-2 !flex-col w-fit"
        >
          <div className="mtt-center gap-6 mt-2 !flex-row w-fit">
            <div className="mtt-center gap-4  !flex-col">
              <MttTextField
                readOnly={readOnly}
                Icon="user"
                name="userName"
                label="User Name"
                className=""
              />
              <MttTextField
                readOnly={readOnly}
                Icon="email"
                name="email"
                label="Email"
                className=""
              />
              <MttSelect
                readOnly={readOnly}
                name="codingLanguage"
                label="Select Language"
                Options={[
                  { value: "php", label: "PHP" },
                  { value: "javascript", label: "Javascript" },
                ]}
              />
              <MttDatePicker
                readOnly={readOnly}
                RHFdate
                name="availabilityDate"
                label="Event Date"
                className=""
              />
              <MttRadioGroup
                readOnly={readOnly}
                className=""
                name="gender"
                label="Gender"
                Options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />
              <MttTextArea
                readOnly={readOnly}
                name="bio"
                label="Your Bio"
                className=""
              />
            </div>
            <div className="mtt-center gap-4 !flex-col w-[250px]">
              <MttImageDisplay name="profileImage1" />
              <MttImageDisplay
                name="profileImage2"
                className="absolute -top-16 -right-20 rounded-full"
              />
              <MttTimePicker
                readOnly={readOnly}
                RHFdate
                name="availabilityTime"
                label="Time"
                className=""
              />
              <MttCheckBox
                readOnly={readOnly}
                name="agree"
                label="Accept Terms"
              />
              <MttImageFile
                readOnly={readOnly}
                name="profileImage1"
                label="Profile Image"
              />
              <MttImageFile
                readOnly={readOnly}
                name="profileImage2"
                label="Profile Image"
              />
              <IsLoading
                className="w-full mtt-center"
                isLoading={FormIsloading}
              >
                <MttSubmit>Submit</MttSubmit>
              </IsLoading>
            </div>
          </div>
        </MttForm>
      </div>
    </div>
  );
};

const FormRegister = withUtilities(OriginalForm);
export default FormRegister;
    