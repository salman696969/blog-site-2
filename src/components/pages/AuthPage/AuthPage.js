import React from 'react'
import { Link, Outlet, Route,Routes , useParams} from 'react-router-dom'
import Button from '../../atoms/Button'
import Login from '../../molecules/Login/Login'
import Signup from '../../molecules/Signup/Signup'
import LoginHolder from '../../organisms/LoginHolder/LoginHolder'

export default function AuthPage() {  
  let {id} = useParams();
  // console.log(id)
  return (
    <div className='flex flex-col items-center  h-screen'>
        <div>
        {/* <Link to="login">
            <Button className='m-5'>Login</Button>
        </Link>
        <Link to="signup">
            <Button className='m-5'>Signup</Button>
        </Link> */}
        </div>
        <Outlet/>
    </div>
  )
}
