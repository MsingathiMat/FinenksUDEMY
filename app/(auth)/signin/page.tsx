import React from 'react'



import FormSignin from './FormSignin'
import Logo from '@/components/AppComponents/Logo'
import Link from 'next/link'
import { TvMinimalPlay } from 'lucide-react'

const page = () => {
  return (


<div className=' mtt-center gap-24 text-center'>

<div className='w-[400px] mtt-center !flex-col gap-4'>
<Logo/>

<h6 className=' mt-4 text-textSec'>Invoicing made simple


  
</h6>


</div>
<FormSignin/>
</div>

  )
}

export default page
