"use client";

import MttDashBar from "@/components/mtt/components/MttDashBar";
import { MttStatsCard } from "@/components/mtt/components/MttStatsCard";
import { Wallet2 } from "lucide-react";          

import withUtilities from "@/components/mtt/HOC/withUtilities";
import { useQuery } from "@tanstack/react-query";
import { QueryModels } from "@/components/mtt/config/ReactQueryConfig";
import TableUnconvertedQuotes from "./quote/Components/TableUnconvertedQuotes";
import { useAtom } from "jotai";
import { UserCompany } from "@/components/mtt/Atoms/AtomUserCompany";

const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  
  const [CompanyData,] = useAtom(UserCompany);
  const {
    Create,
    toast,
Read,
    ImageReset,
    ObjectToFormData,
    IsLoading,
    QClient,
  } = Utilities;

  const TotalQuote = useQuery({
    queryKey: [QueryModels.aggregates.TotalQuotes.QueryKey],
    queryFn: async () => {
      return await Read(QueryModels.aggregates.TotalQuotes.ApiEndpoint,{TableName:"Quotations"});
    },
    gcTime: 0,
    staleTime: 0,
  });

  const {data, isLoading}=TotalQuote
  const TotalClients = useQuery({
    queryKey: [QueryModels.aggregates.TotalClients.QueryKey],
    queryFn: async () => {
      return await Read(QueryModels.aggregates.TotalClients.ApiEndpoint,{TableName:"Clients"});
    },
    gcTime: 0,
    staleTime: 0,
  });

  const TotalUsers = useQuery({
    queryKey: [QueryModels.aggregates.TotalUsers.QueryKey],
    queryFn: async () => {
      return await Read(QueryModels.aggregates.TotalUsers.ApiEndpoint,{TableName:"Users"});
    },
    gcTime: 0,
    staleTime: 0,
  });

  const TotalItems = useQuery({
    queryKey: [QueryModels.aggregates.TotalItems.QueryKey],
    queryFn: async () => {
      return await Read(QueryModels.aggregates.TotalItems.ApiEndpoint,{TableName:"Items"});
    },
    gcTime: 0,
    staleTime: 0,
  });

  const Totallnvoices = useQuery({
    queryKey: ["TotalINV"],
    queryFn: async () => {
      return await Read(QueryModels.aggregates.TotalItems.ApiEndpoint,{TableName:"Invoices"});
    },
    gcTime: 0,
    staleTime: 0,
  });


  const TotalInvoiceAmount = useQuery({
    queryKey: ["TotalInvoiceAmount"],
    queryFn: async () => {
      return await Read("/api/root/dashboard/Invoice/AllTotals");
    },
    gcTime: 0,
    staleTime: 0,
  });

  const {data:TotalInvoices, isLoading:TotalInvoiceLoading}=TotalInvoiceAmount
  
  const {isLoading:InvoiceLoading}=Totallnvoices
  const TotalLoading = TotalItems.isLoading==true && TotalClients.isLoading==true && TotalQuote.isLoading==true && TotalUsers.isLoading==true  && InvoiceLoading==true

  return (
    <div className='w-full h-[calc(100vh-210px)] flex-1 mtt-center !flex-col gap-4 !items-start !justify-start'>


<p>Financials</p> 
      <div className='mtt-center gap-4'>
       
        <IsLoading isLoading={TotalInvoiceLoading}>

       {
        TotalInvoiceLoading?null: <MttStatsCard LinkTo="/dashboard/invoice/Invoices" className='' title={`${CompanyData?.Currency + (TotalInvoices.totalAmount).toString()}`} description="Total Income" icon={<Wallet2 />} />
       }

        </IsLoading>
        {

}
      </div>   
     <p>Snapshot</p> 

  
  <MttDashBar 
  isLoading={TotalLoading}
        link="/login" 
        title="Matthew" 
        description="Best Developer" 
        src="/me.jpg" 
        statsItems={[
          { label: "Quotations", value: data as string },
          { label: "Invoices", value: Totallnvoices.data as string },
          { label: "Clients", value: TotalClients.data as string },
          { label: "Users", value: TotalUsers.data as string },
          { label: "Items", value: TotalItems.data as string }
        ]}
      />   
  

    

     <p className=" font-bold">Unconverted Quotations</p>  
      <TableUnconvertedQuotes />
    </div>
  );
};

const Dasboard = withUtilities(OriginalForm);
export default Dasboard;
