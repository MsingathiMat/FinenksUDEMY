import React from 'react'



import FormSignup from './FormSignup'

import Logo from '@/components/AppComponents/Logo'
import { TvMinimalPlay } from 'lucide-react'
import Link from 'next/link'


const page = () => {
  return (

<div className=' mtt-center gap-24 text-center'>

<div className='w-[400px] mtt-center !flex-col gap-4'>
<Logo/>

<h6 className=' mt-4 text-textSec'>Invoicing made simple</h6>
<div className=" text-yellow-500 mtt-center gap-5 hover:text-red-600 hover:cursor-pointer">

<TvMinimalPlay />

<Link target="_blank" href="https://youtu.be/zZut8kSJ7Ys"><p>Watch a HOW-TO video here</p></Link>
</div>
</div>
  <FormSignup/>
  </div>

  )
}

export default page
