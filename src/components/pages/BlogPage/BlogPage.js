import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlog } from "../../../redux/actions/blogs.action";
import Img from "../../atoms/Img/Img";

export default function BlogPage() {
  let { blog } = useSelector((state) => state.allBlogs);
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlog(id));
  }, [id]);
  return (
    <div className="m-2 w-full h-full">
      
      <div className="mt-8 flex justify-between">
        <span className="basis-2/3 h-full bg-slate-400">
            <div className="m-4 p-4">
            <h1 className="text-7xl font-semibold">{blog?.title}</h1>
          <Img src={blog?.blog_img} alt={blog.title} width="1050px" className="mb-10"/>
          <span dangerouslySetInnerHTML={{ __html: blog?.content }} ></span>
          </div>
        </span>
        <span className="basis-1/3 bg-slate-700 flex flex-col">
            <span>Created By:- {blog?.username}</span>
            <span>Created On:- {blog?.date_created}</span>
        </span>
      </div>
    </div>
  );
}
