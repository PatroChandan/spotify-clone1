import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-x-4">
      <button
        onClick={() => navigate(-1)}
        className="w-8 h-8 flex items-center justify-center px-3 rounded-full bg-black bg-opacity-70 border border-gray-400 border-solid hover:bg-gray-700"
      >
        <ArrowBackIosIcon sx={{ color: "gray" }} />
      </button>
      <button
        onClick={() => navigate(1)}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-70 border border-gray-400 border-solid hover:bg-gray-700"
      >
        <ArrowForwardIosIcon sx={{ color: "gray" }} />
      </button>
    </nav>
  );
}

export default Navigation;
