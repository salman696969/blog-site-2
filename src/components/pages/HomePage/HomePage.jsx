import React, { Component, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet , useParams} from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getAllBlogs } from '../../../redux/actions/blogs.action'
import StyledButton from '../../atoms/Button/StyledButton'
import BlogList from '../../organisms/BlogList/BlogList'
import Navbar from '../../organisms/Navbar/Navbar'

export default function HomePage() {
  let dispatch = useDispatch()
  let {id}=useParams()
  let userId=sessionStorage.getItem("user-id")
  useEffect(()=>{
    dispatch(getAllBlogs(id,userId))
},[id])
  let contextData= useContext(AuthContext)
  console.log(contextData.loggedIn)
  return (
    <div>
      <BlogList/>
      <Outlet/>
    </div>
  )
}

///Homepage



//login
