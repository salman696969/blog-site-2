import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageContext from "../../../context/ImageContext";
import { getBlog } from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Img from "../../atoms/Img/Img";
import Input from "../../atoms/Input/Input";
import ImageConverter from "../../ImageConverter";

export default function BlogPage() {
  let { blog } = useSelector((state) => state.allBlogs);
  const [title, setTitle] = useState(blog?.title);
  const [featuredImage, setFeaturedImage] = useState();
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState("");
  const contextData = useContext(ImageContext);
  let { id } = useParams();
  let dispatch = useDispatch();
  let [edit,setEdit] = useState(false)

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
  }, [id,edit,contextData.blogImage]);

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
    // console.log(contextData.blog.blog_img)
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

  return (
   <div>
      {!edit ? <div> <Button onClickHandler={()=>setEdit(true)}>Edit</Button>
      <div className="m-2 w-full h-full">
        <div className="mt-8 flex justify-between">
          <span className="basis-2/3 h-full bg-slate-400">
            <div className="m-4 p-4">
              <h1 className="text-7xl font-semibold">{blog?.title}</h1>
              <Img
                src={blog?.blog_img}
                alt={blog.title}
                width="1050px"
                className="mb-10"
              />
              <span dangerouslySetInnerHTML={{ __html: blog?.content }}></span>
            </div>
          </span>
          <span className="basis-1/3 bg-slate-700 flex flex-col">
            <span>Created By:- {blog?.username}</span>
            <span>Created On:- {blog?.date_created}</span>
          </span>
        </div>
      </div></div>:<div>
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
          <option value="food">food</option>
          <option value="technology">technology</option>
          <option value="nature">nature</option>
        </select>
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
            setEdit(false)
          }}
        >
          Add Blog
        </Button>
      </div>  
      }
  </div>
  );
}
