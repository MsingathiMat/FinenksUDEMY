"use client"
import { useAtom } from 'jotai'
import React from 'react'

import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import useToggler from '../Hooks/useToggler'
import { MttNavIsVisibleAtom } from '../Atoms/MtNavAtom'


const MttNavToggle = () => {

    const [isNavVisible,setIsNavVisible] = useAtom(MttNavIsVisibleAtom)

    const {ToTogleComp}= useToggler({
        trueComponent:<Menu />,
        falseComponent:<X />,
    className:cn('hover:cursor-pointer text-MtTextlight0 dark:text-MtTextDark20  hidden sm:block'),
    setIsTrue:setIsNavVisible,
    isTrue:isNavVisible
    })

  return (
    <div>
      <ToTogleComp/>
    </div>
  )
}

export default MttNavToggle
