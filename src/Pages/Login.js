import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { backendUrl } from "../utils/config";
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
  const { setToken, setUser, setAuthenticated } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logIn = async () => {
    let response = await fetch(backendUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectId: "f104bi07c490",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        appType: "music",
      }),
    });

    response = await response.json();
    console.log("status", response.status);
    if (response && response.token) {
      const token = response.token;
      setToken(token);
      setUser(response.data);
      setAuthenticated(true);

      localStorage.setItem("spotify_user", JSON.stringify(response.data));
      localStorage.setItem("spotify_token", token);

      toast.success(response.status, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    } else {
      setAuthenticated(false);

      toast.error(response.message, {
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
        <div className="font-bold mb-4">To continue, log in to spotify.</div>
        <TextInput
          label={"Email address or username"}
          placeholder={"Email address or Username"}
          className={"my-6"}
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label={"Password"}
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex items-center justify-end my-10">
          <button
            className="bg-green-400 text-lg font-semibold p-3 w-full rounded-full"
            onClick={(e) => {
              e.preventDefault();
              logIn();
            }}
          >
            LOG IN
          </button>
        </div>
        <div className="text-gray-500 w-full flex items-center justify-center py-3 font-bold">
          <Link to={"/update"}>Forgot your password?</Link>
        </div>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">
          Dont't have an account?
        </div>
        <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-3 rounded-full font-bold">
          <Link to={"/signup"}>SIGN UP FOR SPOTIFY</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default LoginComponent;
