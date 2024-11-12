import React from 'react'



import FormSignup from './FormSignup'

import Logo from '@/components/AppComponents/Logo'


const page = () => {
  return (

<div className=' mtt-center gap-24 text-center'>

<div className='w-[400px] mtt-center !flex-col gap-4'>
<Logo/>

<h6 className=' mt-4 text-textSec'>Empowering Growth Through Precision Finance</h6>


</div>
  <FormSignup/>
  </div>

  )
}

export default page
