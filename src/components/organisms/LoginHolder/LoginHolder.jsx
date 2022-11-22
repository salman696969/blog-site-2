import React from 'react'
import Login from '../../molecules/Login/Login'
import Signup from '../../molecules/Signup/Signup'

export default function LoginHolder({children}) {
  return (
    <div className='flex justify-center w-72 items-center p-2 mx-auto mt-10 border border-black rounded-lg'>
        {children}
    </div>
  )
}
