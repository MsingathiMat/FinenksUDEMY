import React from 'react'


import Logo from '@/components/AppComponents/Logo'
import FormSignin from './(auth)/signin/FormSignin'

const page = () => {
  return (


<div className=' mtt-center gap-24 text-center mtt-xy-screen'>

<div className='w-[400px] mtt-center !flex-col gap-4'>
<Logo/>

<h6 className=' mt-4 text-textSec'>Invoicing made simple</h6>


</div>
<FormSignin/>
</div>

  )
}

export default page
