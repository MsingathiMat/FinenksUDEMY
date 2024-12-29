"use client";

import MttDashBar from "@/components/mtt/components/MttDashBar";
import { MttStatsCard } from "@/components/mtt/components/MttStatsCard";
import { Wallet2 } from "lucide-react";          
import TableEvents from '@/components/table';
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { useQuery } from "@tanstack/react-query";
import { QueryModels } from "@/components/mtt/config/ReactQueryConfig";

const OriginalForm = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  
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

  const {data, isLoading}=TotalQuote

  const TotalLoading = TotalItems.isLoading==true && TotalClients.isLoading==true && TotalQuote.isLoading==true && TotalUsers.isLoading==true

  return (
    <div className='w-full h-[calc(100vh-210px)] flex-1 mtt-center !flex-col gap-4 !items-start !justify-start'>

     <p>Snapshot</p> 

  
  <MttDashBar 
  isLoading={TotalLoading}
        link="/login" 
        title="Matthew" 
        description="Best Developer" 
        src="/me.jpg" 
        statsItems={[
          { label: "Quotations", value: data as string },
          { label: "Clients", value: TotalClients.data as string },
          { label: "Users", value: TotalUsers.data as string },
          { label: "Items", value: TotalItems.data as string }
        ]}
      />   
  

<p>Financials</p> 
      <div className='mtt-center gap-4'>
        <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2 />} />
        <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2 />} />
        <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2 />} />
        <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2 />} />
        <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2 />} />
        <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2 />} />
        <MttStatsCard className='' title="R650" description="Monthly earnings" icon={<Wallet2 />} />
      </div>       
      
      <TableEvents />
    </div>
  );
};

const Dasboard = withUtilities(OriginalForm);
export default Dasboard;
