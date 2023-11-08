import "./output.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./Pages/Login";
import SignupComponent from "./Pages/Signup";
import HomeComponent from "./Pages/Home";
import Details from "./Pages/Details";
import UpdatePassword from "./Pages/UpdatePassword";
import LoggedInHome from "./Pages/LoggedInHome";
import MyMusic from "./Pages/MyMusic";
import { useEffect } from "react";
import SearchPage from "./Pages/SearchPage";
import ListMusic from "./components/shared/ListMusic";
import Library from "./Pages/Library";
import { useAuthContext } from "./contexts/AuthContext";
import Favorites from "./Pages/Favourites";
import Profile from "./Pages/Profile";

function App() {
  const { authenticated, setAuthenticated, setUser, setToken } =
    useAuthContext();
  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (token) {
      const user = localStorage.getItem("spotify_user");
      setAuthenticated(true);
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, [authenticated]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {authenticated ? (
          <Routes>
            <Route path="/" element={<LoggedInHome />} />
            <Route path="/details" element={<Details />} />
            <Route path="/searchpage" element={<SearchPage />} />
            <Route path="/listmusic/:id" element={<ListMusic />} />
            <Route path="/library" element={<Library />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        ) : (
          //logged out routes
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/update" element={<UpdatePassword />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
