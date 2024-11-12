

import MttThemeBase from '@/components/mtt/components/MttThemeBase'
import React from 'react'

const layout = ({children}:{children:Readonly<React.ReactNode>}) => {
  return (
    <div className='relative mtt-padding-md mtt-x-screen min-h-[100vh] mtt-center '>
    <MttThemeBase>

    {children}
    </MttThemeBase>
    </div>
  )
}

export default layout
