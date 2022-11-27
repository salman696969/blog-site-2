import React, { useContext, useState } from "react";
import StyledButton from "../../atoms/Button/StyledButton";
import Form from "../../atoms/Form/Form";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import HomePage from "../../pages/HomePage/HomePage";
import { useNavigate, Navigate, Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function Login() {
  let navigate = useNavigate();
  let [loginForm, setLoginForm] = useState({});
  let contextData = useContext(AuthContext);
  let [validate, setValidate] = useState(false);
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  const onSubmitHandler = (e) => {
    // alert("clicked");
    checkLogin(loginForm).then((data) => {
      // console.log(data);
      if (data.length) {
        toast.success("Loggedin Succefullly!");
        contextData.setLoggedIn(true);
        sessionStorage.setItem("login", true);
        sessionStorage.setItem("user-id", data[0].id);
        sessionStorage.setItem("username", data[0].username);
        sessionStorage.setItem("email", data[0].email);
        navigate("/allBlogs");
      } else {
        toast.error("Incorrect email or password!");
      }
    });
  };

  const formIk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmitHandler,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not in proper format")
        .required("Email is not entered"),
      password: Yup.string().required("Password is not entered"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "Doesnt Match the required password"
      // ),
    }),
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
    // console.log(loginForm);
  };
  const checkLogin = async (email, password) => {
    try {
      let response = await fetch(
        `http://localhost:3000/users/?email=${formIk.values.email}&password=${formIk.values.password}`
      );
      let data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="text-white h-full flex flex-col justify-center items-center border border-indigo-200 rounded-md p-4 font-serif max-mobile:mr-14 max-mobile:ml-14">
      <h2 className="text-3xl pt-5 text-indigo-200">Login Page</h2>
      <Form
        className="flex flex-col justify-center items-center w-full h-full pt-20"
        onSubmitHandler={formIk.handleSubmit}
      >
        <div className="flex flex-col w-80 pb-6">
          <Label HTMLfor="email" className="text-xl pb-2">
            Email
          </Label>
          <input
            id="email"
            // required={true}
            className="border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            name="email"
            type="email"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.email}
            // onBlur={(e) => validateInput(e)}
            // onInput={(e) => validateInput(e)}
          />
          {formIk.touched.email && formIk.errors.email && (
            <span className="text-red-500 text-md">{formIk.errors.email}</span>
          )}
        </div>
        <div className="flex flex-col w-80 pb-8">
          <Label className="text-xl pb-2">Password</Label>
          <input
            // required={true}

            // onChangeHandler={(e) => {
            //   onChangeHandler(e);
            // }}
            name="password"
            type="password"
            onChange={formIk.handleChange}
            onBlur={formIk.handleBlur}
            value={formIk.values.password}
            // onBlur={(e) => validateInput(e)}
            // onInput={(e) => validateInput(e)}
            className="border border-black border-b-indigo-200 focus:outline-none py-1 bg-inherit border-b-2 focus:bg-inherit focus:border-b-4 text-lg"
          />
          {formIk.touched.password && formIk.errors.password && (
            <span className="text-red-500 text-md">
              {formIk.errors.password}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="my-3 text-md font-bold bg-white text-black px-6 rounded-md py-1 hover:bg-green-500 hover:-translate-y-2 transition-all duration-200"
        >
          Login
        </button>
      </Form>
      <Link
        to="/auth/signup"
        className="hover:scale-125 hover:text-green-500 transition-all duration-500"
      >
        <span>Dont have an account? Register Here</span>
      </Link>
    </div>
  );
}
