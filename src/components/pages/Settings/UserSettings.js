import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageContext from "../../../context/ImageContext";
import { getUser } from "../../../redux/actions/blogs.action";
import Button from "../../atoms/Button";
import Form from "../../atoms/Form/Form";
import Img from "../../atoms/Img/Img";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";

export default function UserSettings() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state.users);

  const contextData = useContext(ImageContext);
  let [featuredImage, setFeaturedImage] = useState();
  let [signupForm, setSignupForm] = useState({});
  let [imageUrl, setImageUrl] = useState();
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [avatar, setAvatar] = useState();

  useEffect(() => {
    console.log(featuredImage);
  }, [featuredImage]);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPassword(user?.password);
    setAvatar(user?.avatarImg);
  }, [user]);

  const convert = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImageUrl(reader.result);
      setAvatar(reader.result); //base64encoded string
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const updateUserData = async () => {
    let res = await fetch(`http://localhost:3000/users/${user?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        avatarImg: avatar,
      }),
    });
    let data = await res.json();
    console.log(data);
    alert(data);
  };

  return (
    <div>
      <Form className="flex flex-col" onSubmitHandler={() => updateUserData()}>
        <Label HTMLfor="name">name</Label>
        <Input
          required={true}
          className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
          name="name"
          onChangeHandler={(e) => {
            setName(e.target.value);
          }}
          type="text"
          value={name}
        />
        <Label>username</Label>
        <Input
          //   required={true}
          disabled={true}
          className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
          name="username"
          value={user?.username}
          type="text"
        />
        <Label>email</Label>
        <Input
          required={true}
          className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
          name="email"
          onChangeHandler={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
        />
        <Label>Profile Picture</Label>
        <input
          accept="image/*"
          id="button-file"
          type="file"
          onChange={convert}
        />
        <Img src={avatar} height="100px" width="100px"/>
        <Label>password</Label>
        <Input
          required={true}
          className="border border-white border-b-black focus:outline-none focus:bg-slate-200 my-3"
          name="password"
          onChangeHandler={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          value={password}
        />

        <Button disabled={false} className="bg-black text-white my-3">
          Update Blog
        </Button>
      </Form>
    </div>
  );
}
