    
    "use client";

    import React from "react";
    import MttForm, {
    
      MttComboSearch,
        MttSelect,
      MttSubmit,
    
      MttTextField,
  
    } from "@/components/mtt/components/mttForm/mttForm";
    
    import { SubmitHandler, useForm } from "react-hook-form";
    import z from "zod";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { useMutation } from "@tanstack/react-query";
    import withUtilities from "@/components/mtt/HOC/withUtilities";
    import { UtilitiesProp } from "@/components/mtt/Types/MttTypes";
import LiftOfitemsSelect from "@/components/AppComponents/ListOfSelects/ListOfItemSelect";

    
    const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
      // Declare FORM NAME or Table name
      const FormName = "User";
    

      const newObg =[
        {
          value:"One Dime",
          label:"One Dime",
          id:"1"
        },
        {
          value:"Vula Media",
          label:"Fasi Funeral",
          id:"2"
        },
        {
          value:"Vula Media",
          label:"Bright Star",
          id:"3"
        }
      ]
      // Get(Destructure) all the methods that your form will need from  Utilities
      const {
        Create,
        toast,
      
        ImageReset,
        ObjectToFormData,
        IsLoading,
        QClient,
      } = Utilities;
    
      // Create a FormSchema
      const FormSchema = z.object({
        itemName: z.string().min(1, "Required"),
        itemType: z.enum(["Product", "Service"]),
        quantity: z.number().optional(),
        amount: z.number(),
   
      
      })  .superRefine((data, ctx) => {
        // Check if itemType is "Product" and validate quantity accordingly
        if (data.itemType === "Product") {
          if (data.quantity === undefined || data.quantity <= 0) {
            ctx.addIssue({
              code: "custom",
              path: ["quantity"],
              message: "Required CTX",
            });
          }
        } else {
         
            FormMethods.setValue("quantity",undefined)
        }
      });
    
      // Form Type
      type FormType = z.infer<typeof FormSchema>;
    
      // FormMethods
      const FormMethods = useForm<FormType>({
        defaultValues: {
          itemName: "",
          itemType: undefined,
          quantity:0,
          amount:0.0,
       
          
        },
        resolver: zodResolver(FormSchema),
        mode: "all",
      });
    
      //Form Submit Method
      const FormSubmit: SubmitHandler<FormType> = (data) => {
        const ConvertedFormData = ObjectToFormData(data);
        FormMutation.mutate({ formData: ConvertedFormData });
      };
    
      const FormMutation = useMutation({
        mutationKey: ["mtUsers"],
        mutationFn: async ({ formData }: { formData: FormData }) => {
          //Create has been supplied by HOC. It comes from MttFetch
          return await Create("/api/auth/signup", formData);
        },
        onError: () => {
          //toast has been supplied by HOC. It comes from Shadcn
          toast({
            title: "ERROR",
            description: `Failed to create ${FormName}`,
          });
        },
        onSuccess: () => {
          //QClient has been supplied by HOC. It comes from Shadcn
          QClient.invalidateQueries({ queryKey: ["getUsers"] });
    
          //Reset form fields
          // FormMethods.reset();
    
          // Resert MttImage - This clears input images on the UI
          ImageReset("imageUrl");
    
          //toast has been supplied by HOC. It comes from Shadcn
          toast({
            title: "SUCCESS",
            description: `${FormName} created successfully`,
          });
        },
      });
    
      // BOOLEAN CONDITIONALS - Booleans that are responsible for CONDITIONAL RENDERING
    
      const readOnly = FormMutation.isPending;
      const FormIsloading = FormMutation.isPending;
      const ItemType = FormMethods.watch("itemType")
      return (
        <div className=" mtt-Alpha p-4 w-fit rounded-md">
         
            <MttForm
         
          debugMode
       
              onSubmit={FormSubmit}
              Methods={FormMethods}
              className="  mtt-center gap-6 mt-2 !flex-col w-fit "
            >
              <div className="  mtt-center gap-6 mt-2 !flex-row w-fit  ">
                <div className=" mtt-center gap-4 !flex-col">
                  <MttTextField
                    readOnly={readOnly}
                    Icon="user"
                    name="itemName"
                    label="Item Name"
                    className=""
                  />

<MttSelect
                readOnly={readOnly}
                name="itemType"
                label="Select Type"
                Options={[
                  { value: "Product", label: "Product" },
                  { value: "Service", label: "Service" },
                ]}
              />
              
              {

                ItemType=="Product"?    <MttTextField
                readOnly={readOnly}
           type="number"
                name="quantity"
                label="Quantity"
                className=""
              />:null
              }
               

               <MttComboSearch name="artistId" label="Artist" placeholder="Select Client" SelectValues={newObg as {value:string,label:string,id:string} []}/>
  

               <MttTextField
                    readOnly={readOnly}
               type="number"
                    name="amount"
                    label="Amount"
                    className=""
                  />
           

              <IsLoading
                className="w-full mtt-center"
                isLoading={FormIsloading}
              >
                <MttSubmit>Add</MttSubmit>
              </IsLoading>
                </div>
    
                

              </div>

       
            </MttForm>
       
        </div>
      );
    };
    
    const FormAddItem = withUtilities(OriginalForm);
    export default FormAddItem;
    
        