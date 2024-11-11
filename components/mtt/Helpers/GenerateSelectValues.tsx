
import { Items } from '@prisma/client';
import { SelectValueTypes } from '../Types/MttTypes';

const GenerateSelectValues = ({ data,NameColumn,IdColumn }: { NameColumn:string,IdColumn:string, data:Items[]}):SelectValueTypes[] => {
 
 type ItemUnion = keyof Items
    const GeneratedSelectValues = data.map((ItemData) => ({
        value: ItemData[NameColumn as ItemUnion] as string,
        label: ItemData[NameColumn as ItemUnion] as string,
        id: ItemData[IdColumn as ItemUnion] as string,
      }));
  
    return GeneratedSelectValues
}

export default GenerateSelectValues
