import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs, getMyBlogs } from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";

export default function DeleteBlog({ id }) {
  // console.log(id)
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let userId = sessionStorage.getItem("user-id");
  let [count, setCount] = useState(true);
  let [deleteBlog, setDeleteBlog] = useState("");
  const deleteData = async () => {
    let res = await fetch(`http://localhost:3000/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    toast.success("deleted Successfully");
    setDeleteBlog("Deleted Successfully");
    // console.log(data);
  };

  useEffect(() => {
    console.log(deleteBlog);
    dispatch(getMyBlogs(userId));
    dispatch(getAllBlogs(userId));
  }, [deleteBlog]);

  // useEffect(()=>{
  //   dispatch(getMyBlogs(userId));
  // },[userId])

  return (
    <div>
      <Button
        bg="inherit"
        onClickHandler={() => {
          deleteData();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </Button>
    </div>
  );
}
