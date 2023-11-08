import React, { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Avatar } from "@mui/material";

const Profile = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("spotify_user"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);
  console.log("user", items.name);
  return (
    <LoggedInContainer>
      <div className="w-full bg-gradient-to-b from-gray-500 to-gray-800 h-52 flex">
        <div className="w-1/6 p-8 pr-2">
          <Avatar sx={{ width: 160, height: 160, display: "flex" }} />
        </div>

        <div className="w-5/6 pl-1 p-12 text-gray-300 flex flex-col justify-evenly">
          <h1 className="text-5xl font-medium">{items.name}</h1>
          <h3 className="text-3xl">{items.email}</h3>
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default Profile;
