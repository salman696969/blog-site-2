import React from 'react'
import Login from '../../molecules/Login/Login'
import Signup from '../../molecules/Signup/Signup'

export default function LoginHolder({children}) {
  return (
    <div className='flex justify-center w-full items-center p-2 mx-auto pt-24 rounded-lg'>
        {children}
    </div>
  )
}
