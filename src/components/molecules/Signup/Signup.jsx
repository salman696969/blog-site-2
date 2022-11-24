import React, { useContext, useEffect, useState } from "react";
import StyledButton from "../../atoms/Button/StyledButton";
import Form from "../../atoms/Form/Form";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import ImageContext from "../../../context/ImageContext";
import Img from "../../atoms/Img/Img";

export default function Signup() {
  let [signupForm, setSignupForm] = useState({});

  const contextData = useContext(ImageContext);

  let [featuredImage, setFeaturedImage] = useState();

  let [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    console.log(featuredImage);
  }, [featuredImage]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupForm({
      ...signupForm,
      [name]: value,
      avatarImg: contextData.avatar,
    });
    console.log(signupForm);
  };

  const postUser = async (signupForm) => {
    try {
      let response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(signupForm),
      });
      let message = await response.json();
      return message;
    } catch (error) {
      return error;
    }
  };

  const onSubmitHandler = () => {
    postUser(signupForm).then((data) => {
      console.log(data);
    });
  };

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
      console.log(reader.result);
      setImageUrl(reader.result);
      // contextData.setBlogImage(reader.result); //base64encoded string
      contextData.setAvatar(reader.result); //base64encoded string
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <Form className="flex flex-col" onSubmitHandler={onSubmitHandler}>
      <Label HTMLfor="name">name</Label>
      <Input
        required={true}
        className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
        name="name"
        onChangeHandler={(e) => {
          onChangeHandler(e);
        }}
        type="text"
      />
      <Label>username</Label>
      <Input
        required={true}
        className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
        name="username"
        onChangeHandler={(e) => {
          onChangeHandler(e);
        }}
        type="text"
      />
      <Label>email</Label>
      <Input
        required={true}
        className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
        name="email"
        onChangeHandler={(e) => {
          onChangeHandler(e);
        }}
        type="email"
      />
      <Label>Profile Picture</Label>
      <input accept="image/*" id="button-file" type="file" onChange={convert} />
      <Img src={contextData.avatar} />
      <Label>password</Label>
      <Input
        required={true}
        className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
        name="password"
        onChangeHandler={(e) => {
          onChangeHandler(e);
        }}
        type="password"
      />

      <Button disabled={false} className="bg-black text-white my-3">
        Signup
      </Button>
    </Form>
  );
}
