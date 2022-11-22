import React, { useContext } from 'react'
import StyledButton from '../../atoms/Button/StyledButton'
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import Button from '../../atoms/Button';
import AppContext from '../../../context/AppContext';
import { clear } from '@testing-library/user-event/dist/clear';

export default function Navbar() {
    let contextData= useContext(AuthContext)
    let contextAppData = useContext(AppContext)
    let navigate = useNavigate()
    console.log(contextData.loggedIn)

    const onClickHandler=()=>{
        contextData.setLoggedIn(false)
        sessionStorage.clear()
        localStorage.clear()
        alert("logged out")
    }
    const showAllBlogs=()=>{
      contextAppData.setMyBlogs(false)
    }
    const showMyBlogs=()=>{
      contextAppData.setMyBlogs(true)
    }
    const addBlog=()=>{
      navigate("/addBlog")
    }
    return (
      <div className='bg-slate-300 px-10 flex min-w-screen justify-between py-2'>
        <div className=''>
          <Link to="/allBlogs">
            <Button bg="inherit" text='black' onClickHandler={showAllBlogs}>All Blogs</Button>
          </Link>
          <Link to='myBlogs'>
            <Button bg="inherit" text='black' disabled={!sessionStorage.getItem("login")} onClickHandler={showMyBlogs}>My Blogs</Button>
          </Link>
          <Link to='addBlog'>
            <Button bg="inherit" text='black' disabled={!sessionStorage.getItem("login")} onClickHandler={addBlog}>Add Blog</Button>
          </Link>
          
        </div>
        <div>
          {
            sessionStorage.getItem("login")? <Link to="/"><Button onClickHandler={()=>{onClickHandler()}}>Logout</Button></Link>: <Link to="/auth">
            <Button bg="#404040" className='text-white'>Login or Signup</Button>
            </Link>
          }
        </div>
      </div>
  
  )
}
