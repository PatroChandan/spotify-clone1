import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { backendUrl } from "../utils/config";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const UpdatePassword = () => {
  const { setToken, setUser, setAuthenticated } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async () => {
    let response = await fetch(backendUrl + "/user/updateMyPassword", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        projectId: "f104bi07c490",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        passwordCurrent: currentPassword,
        password: newPassword,
        appType: "music",
      }),
    });

    response = await response.json();
    if (response && response.token) {
      toast.success("Password updated Successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Some Error occured!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-b-gray-400 w-full flex justify-center">
        <Icon icon="logos:spotify" width={"150"} />
      </div>
      <div className="inputRegion w-1/4 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-4">Password Reset</div>
        <TextInput
          label={"Username"}
          placeholder={"Username"}
          className={"my-6"}
          value={name}
          setValue={setName}
        />
        <TextInput
          label={"Email address"}
          placeholder={"Email address"}
          className={"my-6"}
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label={"Current Password"}
          placeholder={"Current Password"}
          value={currentPassword}
          setValue={setCurrentPassword}
        />
        <PasswordInput
          label={"New Password"}
          placeholder={"New Password"}
          value={newPassword}
          setValue={setNewPassword}
        />
        <div className="w-full flex items-center justify-end my-10">
          <button
            className="bg-green-400 text-lg font-semibold p-3 w-full rounded-full"
            onClick={(e) => {
              e.preventDefault();
              updatePassword();
            }}
          >
            Update Password
          </button>
        </div>
        <ToastContainer />
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">
          Dont't have an account?
        </div>
        <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-3 rounded-full font-bold">
          <Link to={"/login"}>SIGN IN FOR SPOTIFY</Link>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
