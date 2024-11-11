import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className=' mtt-center gap-4'>
      
      <Image  width={60} height={60} src="/assets/logo.svg" alt='Logo'/>

      <p className='text-xl'>Account</p>
    </div>
  )
}

export default Logo
