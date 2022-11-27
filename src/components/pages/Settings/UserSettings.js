import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  let [validatePassword, setValidatePassword] = useState(true);
  useEffect(() => {
    // console.log(featuredImage);
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
      // console.log(reader.result);
      setImageUrl(reader.result);
      setAvatar(reader.result); //base64encoded string
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const updateUserData = async () => {
    if (name == "") {
      toast.error("Cannot Keep Name Empty");
    } else {
      let emailresponse = await fetch(
        `http://localhost:3000/users?email=${email}`,
        {
          method: "GET",
          headers: { "Content-type": "Application/json" },
        }
      );
      let user_exist = await emailresponse.json();
      // console.log(user_exist[0].email)
      if (user_exist.length == 0 || user_exist[0].email == user?.email) {
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
        // console.log(data);
        toast.success("Details Updated");
      } else {
        toast.error("User with same email exist");
      }
    }
  };

  return (
    <div>
      <Form
        className="flex flex-col pt-24 text-white max-w-4xl p-14"
        onSubmitHandler={() => updateUserData()}
      >
        <Label HTMLfor="name" className="text-3xl">
          Name
        </Label>
        <Input
          // required={true}
          className="mb-2 focus:outline-none focus:bg-slate-200 py-1 bg-inherit border-b-2 border-b-indigo-200 focus:bg-opacity-0 focus:border-b-4 text-xl"
          name="name"
          onChangeHandler={(e) => {
            setName(e.target.value);
          }}
          type="text"
          value={name}
        />
        <Label className="text-3xl">Username</Label>
        <Input
          //   required={true}
          disabled={true}
          className="mb-2 focus:outline-none focus:bg-slate-200 py-1 bg-inherit border-b-2 border-b-indigo-200 focus:bg-opacity-0 focus:border-b-4 text-xl"
          name="username"
          value={user?.username}
          type="text"
        />
        <Label className="text-3xl">Email</Label>
        <Input
          required={true}
          className="mb-2 focus:outline-none focus:bg-slate-200 py-1 bg-inherit border-b-2 border-b-indigo-200 focus:bg-opacity-0 focus:border-b-4 text-xl"
          name="email"
          onChangeHandler={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
        />
        <Label className="text-3xl">Profile Picture</Label>
        <input
          accept="image/*"
          id="button-file"
          type="file"
          onChange={convert}
        />
        <Img src={avatar} height="100px" width="100px" className="mt-2 mb-2" />
        <Label className="text-3xl">Password</Label>
        <Input
          required={true}
          className="mb-2 focus:outline-none focus:bg-slate-200 py-1 bg-inherit border-b-2 border-b-indigo-200 focus:bg-opacity-0 focus:border-b-4 text-xl"
          name="password"
          onChangeHandler={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          value={password}
        />

        <Button
        bg="white"
          disabled={false}
          className="my-3 text-md font-bold bg-white text-black px-6 rounded-md py-1 hover:bg-green-500 hover:-translate-y-2 transition-all duration-200"
        >
          Update User
        </Button>
      </Form>
    </div>
  );
}
