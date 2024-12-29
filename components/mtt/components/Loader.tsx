"use client"
import React from 'react'
import { PuffLoader, PulseLoader } from 'react-spinners'
import { mttJsStyle } from '../styles/funcCss'

function Loader({IsLoading, size,color}:{IsLoading:boolean, size?:number, color?:string}) {
  return (
    <div>
      <PuffLoader

    color={color?color:mttJsStyle.Pri}
    loading={IsLoading}
  
    size={size?size:40}
  
  />
    </div>
  )
}

export default Loader
