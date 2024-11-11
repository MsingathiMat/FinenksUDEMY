"use client"
import IsLoading from '@/components/mtt/components/Isloading';
import { MttComboSearch } from '@/components/mtt/components/mttForm/mttForm';
import { MttSearchCombo } from '@/components/mtt/components/mttSearchCombo';
import { QueryModels } from '@/components/mtt/config/ReactQueryConfig';
import withUtilities from '@/components/mtt/HOC/withUtilities';
import { UtilitiesProp } from '@/components/mtt/Types/MttTypes';
import { Items } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const OriginalComp = ({ Utilities,NameColumn,IdColumn, Placeholder,endpoint }: { Utilities: UtilitiesProp,Placeholder:string, endpoint:string ,NameColumn:string,IdColumn:string}) => {
 
    const [SelectValues, SetSelectValues] = useState([{}])
 const {Read} = Utilities

 const CompQuery = useQuery({
    queryKey:[QueryModels.Items.QueryKey],
    queryFn: async ()=>{

        return Read<Items[]>(endpoint)
    }
 })

 const {data, isPending} = CompQuery

 console.log(data)


 useEffect(()=>{



    if(data){
  
    
      data.map((ItemData)=>{
    console.log(NameColumn)
      
          SetSelectValues([...SelectValues,{value:ItemData[NameColumn],label:ItemData[NameColumn],id:ItemData.IdColumn}])
  
      })
     
    }
  },[data])
    return (
    <div>
   <IsLoading isLoading={isPending} className='mtt-center'>

   <MttSearchCombo
     
         Onselect={(val)=>{alert(val)}}
          placeholder={Placeholder}
          SelectValues={SelectValues as { value: string; label: string; id: string }[]}
          className='w-[250px]'
        />
   </IsLoading>
    </div>
  )
}
const LiftOfitemsSelect = withUtilities(OriginalComp);
export default LiftOfitemsSelect
