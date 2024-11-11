"use client"
import { useAtom } from 'jotai'
import { NavHeading } from '../Atoms/MtNavAtom'


const MttNavHeading = () => {

    const [PageHeading,] = useAtom(NavHeading)
 
 if(!PageHeading){

    return <>{"...."}</>
 }
    return <>{ PageHeading}</>
}

export default MttNavHeading
