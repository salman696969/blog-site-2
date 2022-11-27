import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button";
import useBase64 from "../../../utils/useBase64";
import Img from "../../atoms/Img/Img";
import ImageConverter from "../../ImageConverter";
import ImageContext from "../../../context/ImageContext";
import { useSelector } from "react-redux";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Label from "../../atoms/Label/Label";

export default function AddBlog() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState();
  const [category, setCategory] = useState([]);
  const contextData = useContext(ImageContext);
  let { categories } = useSelector((state) => state.allBlogs);
  let [contentError, setContentError] = useState(false);
  // contextData.setBlogImage("")
  useEffect(() => {
    // console.log(featuredImage);
  }, [featuredImage]);

  const saveData = async (inputform) => {
    let res = await fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputform),
    });
    let data = await res.json();
    // console.log(data);
    toast.success("Blog added successfully");
  };

  const formIk = useFormik({
    initialValues: {
      content: "",
      title: "",
      blogger_id: parseInt(sessionStorage.getItem("user-id")),
      likes: [],
      username: sessionStorage.getItem("username"),
      date_created: new Date(),
    },
    onSubmit: function () {
      let data = {
        title: formIk.values.title,
        content: value,
        blog_img: contextData.blogImage,
        category: category,
        blogger_id: formIk.values.blogger_id,
        likes: formIk.values.likes,
        username: formIk.values.username,
        date_created: formIk.values.date_created,
      };
      if (data.content === "") {
        setContentError(true);
      } else {
        setContentError(false);
        saveData(data);
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
  });

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  let modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="m-8 text-white font-serif">
      <h2 className="text-4xl text-indigo-200">Add Blog</h2>
      <form onSubmit={formIk.handleSubmit} className="p-4 pt-10">
        <div className="flex flex-col">
          <Label className="text-3xl">Blog Title</Label>
          <input
            type="text"
            name="title"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.title}
            className="focus:outline-none focus:bg-slate-200 py-1 bg-inherit border-b-2 border-b-indigo-200 focus:bg-opacity-0 focus:border-b-4 text-xl"
          />
          {formIk.touched.title && formIk.errors.title && (
            <span className="text-red-500 text-sm">{formIk.errors.title}</span>
          )}
        </div>
        <div className="flex flex-col py-4">
          <Label className="text-3xl">Category</Label>
          <select
            onChange={(e) => {
              // console.log(e.target.value);
              setCategory([...category, e.target.value]);
              // console.log(category);
            }}
            className="text-white focus:outline-none focus:bg-slate-200 py-1 bg-inherit border-b-2 border-b-indigo-200 focus:bg-opacity-0 focus:border-b-4 text-xl"
          >
            <option>Select Your Category</option>
            {categories?.map((category) => {
              return (
                <option key={category} value={category} className="bg-black">
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        {formIk.touched.category && formIk.errors.category && (
          <span className="text-red-500 text-sm">{formIk.errors.category}</span>
        )}
        <div className="py-4">
          {category.length === 0
            ? ""
            : category.map((item) => {
                return (
                  <span className="m-1 py-1 px-1 bg-white rounded text-black font-bold">
                    {item}
                  </span>
                );
              })}
        </div>
        <div className="flex flex-col">
          <Label className="text-3xl">Featured Image</Label>

          <ImageConverter />
          {formIk.touched.blog_img && formIk.errors.blog_img && (
            <span className="text-red-500 text-sm">
              {formIk.errors.blog_img}
            </span>
          )}
          <Img src={contextData.blogImage} />
        </div>
        <div className="flex flex-col py-4">
          <Label className="text-3xl pb-2">Post Content</Label>
          <ReactQuill
            theme="snow"
            value={value}
            modules={modules}
            onChange={setValue}
            formats={formats}
          />
          {contentError == true ? (
            <span className="text-red-500 text-sm">Add a proper content</span>
          ) : null}
        </div>
        <button type="submit" className="my-3 text-md font-bold bg-white text-black px-6 rounded-md py-1 hover:bg-green-500 hover:-translate-y-2 transition-all duration-200">
          Add Blog
        </button>
      </form>
    </div>
  );
}
