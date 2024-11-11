"use client"
import IsLoading from '@/components/mtt/components/Isloading';
import { MttComboSearch } from '@/components/mtt/components/mttForm/mttForm';

import { QueryModels } from '@/components/mtt/config/ReactQueryConfig';
import withUtilities from '@/components/mtt/HOC/withUtilities';
import { UtilitiesProp } from '@/components/mtt/Types/MttTypes';
import { Items } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const OriginalComp = ({ Utilities,NameColumn,IdColumn,name, Placeholder,endpoint, label, className, onSelected }: { Utilities: UtilitiesProp,Placeholder:string, endpoint:string ,NameColumn:string,IdColumn:string,name:string, label:string,className?:string,onSelected:(val:any)=>void}) => {
 
    const [SelectValues, SetSelectValues] = useState([{}])
 const {Read} = Utilities

 const CompQuery = useQuery({
    queryKey:[QueryModels.Items.QueryKey],
    queryFn: async ()=>{

        return Read<Items[]>(endpoint)
    }
 })

 const {data, isPending} = CompQuery




 useEffect(()=>{



    if(data){
  
    
     // Construct the new array first
     const newSelectValues = data.map((ItemData) => ({
        value: ItemData[NameColumn],
        label: ItemData[NameColumn],
        id: ItemData[IdColumn],
      }));
  
      // Update the state only once
      SetSelectValues(newSelectValues);
     
    }
  },[data])

  console.log(SelectValues)
    return (
    <div>
   <IsLoading isLoading={isPending} className='mtt-center'>



<MttComboSearch
className={className}
           name={name}
                      label={label}
          placeholder={Placeholder}
          SelectValues={SelectValues as { value: string; label: string; id: string }[]}
        />
   </IsLoading>
    </div>
  )
}
const MttpopulatedSelect = withUtilities(OriginalComp);
export default MttpopulatedSelect
