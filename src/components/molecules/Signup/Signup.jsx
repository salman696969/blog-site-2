import React, { useContext, useEffect, useState } from "react";
import StyledButton from "../../atoms/Button/StyledButton";
import Form from "../../atoms/Form/Form";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import ImageContext from "../../../context/ImageContext";
import Img from "../../atoms/Img/Img";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  let navigate = useNavigate();
  let [signupForm, setSignupForm] = useState({});

  const contextData = useContext(ImageContext);

  let [featuredImage, setFeaturedImage] = useState();

  let [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    // console.log(featuredImage);
  }, [featuredImage]);

  // const onChangeHandler = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setSignupForm({
  //     ...signupForm,
  //     [name]: value,
  //     avatarImg: contextData.avatar,
  //   });
  //   console.log(signupForm);
  // };

  const postUser = async (signupForm) => {
    try {
      let emailresponse = await fetch(
        `http://localhost:3000/users?email=${formIk.values.email}`,
        {
          method: "GET",
          headers: { "Content-type": "Application/json" },
        }
      );
      let user_exist = await emailresponse.json();
      if (user_exist.length == 0) {
        let response = await fetch(`http://localhost:3000/users`, {
          method: "POST",
          headers: { "Content-type": "Application/json" },
          body: JSON.stringify(signupForm),
        });
        let message = await response.json();
        toast.success("User Registered");
        navigate("/auth/login");
        return message;
      } else {
        toast.error("User with same email exist");
      }
    } catch (error) {
      return error;
    }
  };

  const formIk = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: function () {
      let data = {
        name: formIk.values.name,
        username: formIk.values.username,
        email: formIk.values.email,
        password: formIk.values.password,
        avatarImg: contextData.avatar,
      };
      // console.log(signupForm)
      postUser(data);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      username: Yup.string().required("username is not entered"),
      email: Yup.string()
        .email("Not in proper format")
        .required("Email is not entered"),
      password: Yup.string()
        .required("Enter secure password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Doesnt Match the required password"
        ),
      confirm_password: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password doesnt match"
      ),
    }),
  });

  const convert = (e) => {
    // check max. file size is not exceeded

    // size is in bytes

    //   if (files[0].size > 2000000) {

    //     console.log("File too large");

    //     return;

    //   }

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImageUrl(reader.result);
      // contextData.setBlogImage(reader.result); //base64encoded string
      contextData.setAvatar(reader.result); //base64encoded string
    };

    reader.onerror = (error) => {
      // console.log("Error: ", error);
    };
  };

  return (
    <div className="text-white h-full flex flex-col justify-center items-center border border-indigo-200 rounded-md p-4 px-14 font-serif max-mobile:w-96 max-mobile:mr-14 max-mobile:ml-14">
      <h2 className="text-3xl pt-5 text-indigo-200">Signup Page</h2>
      <Form
        className="flex flex-col justify-center items-center w-full h-full pt-20"
        onSubmitHandler={formIk.handleSubmit}
      >
        <div className="flex flex-col w-80 pb-6">
          <Label HTMLfor="name" className="text-xl pb-2">
            Name
          </Label>
          <input
            //  required={true}
            className="border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
            name="name"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="text"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.name}
          />
          {formIk.touched.name && formIk.errors.name && (
            <span className="text-red-500 text-md">{formIk.errors.name}</span>
          )}
        </div>
        <div className="flex flex-col w-80 pb-6">
          <Label className="text-xl pb-2">Username</Label>
          <input
            // required={true}
            className="border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
            name="username"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="text"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.username}
          />
          {formIk.touched.username && formIk.errors.username && (
            <span className="text-red-500 text-md">
              {formIk.errors.username}
            </span>
          )}
        </div>
        <div className="flex flex-col w-80 pb-6">
          <Label className="text-xl pb-2">Email</Label>
          <input
            // required={true}
            className="border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
            name="email"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="email"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.email}
          />
          {formIk.touched.email && formIk.errors.email && (
            <span className="text-red-500 text-md">{formIk.errors.email}</span>
          )}
        </div>
        <div className="flex flex-col w-80 pb-6">
          <Label className="text-xl pb-2">Profile Picture</Label>
          <input
            accept="image/*"
            id="button-file"
            type="file"
            onChange={convert}
          />
          <Img src={contextData.avatar} />
        </div>
        <div className="flex flex-col w-80 pb-6">
          <Label className="text-xl pb-2">Password</Label>
          <input
            // required={true}
            className="border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
            name="password"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="password"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.password}
          />
          {formIk.touched.password && formIk.errors.password && (
            <span className="text-red-500 text-md">
              {formIk.errors.password}
            </span>
          )}
        </div>
        <div className="flex flex-col w-80 pb-6">
          <Label className="text-xl pb-2">Confirm Password</Label>
          <input
            // required={true}
            className="border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
            name="confirm_password"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            type="password"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.confirm_password}
          />
          {formIk.touched.confirm_password &&
            formIk.errors.confirm_password && (
              <span className="text-red-500 text-md">
                {formIk.errors.confirm_password}
              </span>
            )}
        </div>

        <button
          type="submit"
          disabled={false}
          className="my-3 text-md font-bold bg-white text-black px-6 rounded-md py-1 hover:bg-green-500 hover:-translate-y-2 transition-all duration-200"
        >
          Signup
        </button>
      </Form>
      <Link
        to="/auth/login"
        className="hover:scale-125 hover:text-green-500 transition-all duration-500"
      >
        <span className="">Already have an account? Login Here</span>
      </Link>
    </div>
  );
}
