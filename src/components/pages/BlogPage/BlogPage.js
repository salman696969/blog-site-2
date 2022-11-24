import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageContext from "../../../context/ImageContext";
import { getBlog, getComments } from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Img from "../../atoms/Img/Img";
import Input from "../../atoms/Input/Input";
import ImageConverter from "../../ImageConverter";
import CommentSection from "../../organisms/CommentSection/CommentSection";

export default function BlogPage() {
  let { blog } = useSelector((state) => state.allBlogs);
  const [title, setTitle] = useState(blog?.title);
  const [featuredImage, setFeaturedImage] = useState();
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState("");
  const contextData = useContext(ImageContext);
  let { id } = useParams();
  let dispatch = useDispatch();
  let [edit, setEdit] = useState(false);
  let [showComment, setshowComment] = useState(false);
  let { categories } = useSelector((state) => state.allBlogs);
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

  // const imgModules ={
  //   toolbar: [
  //     ['image'],
  //   ]
  // }

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

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id, edit]);

  // useEffect(()=>{
  //   setFeaturedImage(contextData.blogImage)
  // },[contextData.blogImage])
  // useEffect(() => {
  //   setTitle(blog?.title);
  //   console.log(title);
  // }, [blog?.title]);

  useEffect(() => {
    setTitle(blog?.title);
    // console.log(title)
    setValue(blog?.content);
    setFeaturedImage(blog?.blog_img);
    // setSmallDescription(blog.small_description);
    setCategory(blog?.category);
    contextData.setBlogImage(blog?.blog_img);
    // console.log(contextData.blog?.blog_img)
  }, [blog]);

  const saveData = async () => {
    let res = await fetch(`http://localhost:3000/blogs/${blog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: value,
        blog_img: contextData.blogImage,
        category: category,
        blogger_id: parseInt(sessionStorage.getItem("user-id")),
        likes: blog?.likes,
        username: sessionStorage.getItem("username"),
        date_created: new Date(),
      }),
    });
    let data = await res.json();
    console.log(data);
    alert(data);
  };

  const Opencomment = () => {
    setshowComment(true);
    dispatch(getComments(blog.id));
  };
  const Closecomment = () => {
    setshowComment(false);
  };

  return (
    <div>
      {!edit ? (
        <div>
          <div className="w-full h-full">
            <div className="flex justify-between">
              <span className="basis-2/3 h-full bg-slate-400">
                <div className="m-4 p-4">
                  <h1 className="text-7xl font-semibold">{blog?.title}</h1>
                  <Img
                    src={blog?.blog_img}
                    alt={blog.title}
                    width="1050px"
                    className="mb-10"
                  />
                  <span
                    dangerouslySetInnerHTML={{ __html: blog?.content }}
                  ></span>
                </div>
              </span>
              <span className="basis-1/3 bg-slate-700 flex flex-col">
                <span>Created By:- {blog?.username}</span>
                <span>Created On:- {blog?.date_created}</span>
                <span>
                  {sessionStorage.getItem("user-id") == blog?.blogger_id ? (
                    <Button onClickHandler={() => setEdit(true)}>Edit</Button>
                  ) : null}
                </span>
                <span>
                  <Button
                    bg="inherit"
                    className="ml-1"
                    disabled={!sessionStorage.login}
                    onClickHandler={Opencomment}
                    ariaLabel="comment-box"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="blue"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </Button>
                  <div>
                    {showComment ? (
                      <CommentSection
                        blog={blog}
                        Opencomment={Opencomment}
                        Closecomment={Closecomment}
                        showComment={showComment}
                      />
                    ) : null}
                  </div>
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Post Title</h2>
          {/* <input type="text" value={title} onChange={(e)=>{
          setTitle(e.target.value)
      }}/> */}
          <Input
            type="text"
            name="blogTitle"
            value={title}
            onChangeHandler={(e) => {
              setTitle(e.target.value);
            }}
          />
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setCategory([...category, e.target.value]);
              console.log(category);
            }}
            name="categoy"
          >
            <option>Select Your Category</option>
            {categories?.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
            {/* <option value="food">food</option>
        <option value="technology">technology</option>
        <option value="nature">nature</option> */}
          </select>
          <div>
            {category.length === 0
              ? ""
              : category.map((item) => {
                  return (
                    <span className="m-1 p-1 bg-black rounded text-white">
                      {item}
                    </span>
                  );
                })}
          </div>
          <div>
            {/* {category.length === 0
            ? ""
            : category.map((item) => {
                return (
                  <span className="m-1 p-1 bg-black rounded text-white">
                    {item}
                  </span>
                );
              })} */}
          </div>
          <h2>featured Image</h2>
          {/* <Input type="file" name="file" onInput={(e)=>{handleFileInputChange(e)}}>Upload Image</Input> */}
          {/* <Img src={baseURL}/> */}
          <ImageConverter />
          <Img src={contextData.blogImage} />
          <h2>Post Content</h2>
          <ReactQuill
            theme="snow"
            value={value}
            modules={modules}
            onChange={setValue}
            formats={formats}
          />

          <Button
            onClickHandler={() => {
              saveData();
              setEdit(false);
            }}
          >
            Add Blog
          </Button>
        </div>
      )}
    </div>
  );
}
