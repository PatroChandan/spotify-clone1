import { Icon } from "@iconify/react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../utils/config";
import { useCookies } from "react-cookie";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Howl, Howler } from "howler";
import songContext, { useSongContext } from "../contexts/songContext";
import SearchPage from "../Pages/SearchPage";
import { PlaylistView } from "../Pages/LoggedInHome";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";
import DropDown from "../components/shared/DropDown";
import { useAuthContext } from "../contexts/AuthContext";
import Player from "../components/Player";

const LoggedInContainer = ({ children, currActiveScrn, cardsData, limit }) => {
  Howler.volume(1.0);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [musicData, setMusicData] = useState([]);
  const {
    currentSongs,
    setCurrentSongs,
    activeSong,
    setActiveSong,
    songPlayed,
    setSongPlayed,
    isPaused,
    setIsPaused,
  } = useSongContext();
  const { setToken, setUser, setAuthenticated } = useAuthContext();

  const searchSong = async () => {
    // This function will call the search api
    const response = await makeAuthenticatedGETRequest(
      `/music/song?search={"title":"${searchText}"}  `
    );
    setSongData(response.data);
  };

  const navigate = useNavigate();
  const logOut = () => {
    try {
      console.log("Logging out...");
      // removeCookie(['token']);
      localStorage.removeItem("spotify_token");
      localStorage.removeItem("spotify_user");
      // cookies.remove("token");
      setToken(null);
      setUser(null);
      setAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  //

  return (
    <div className="h-full w-full bg-app-black">
      <div className="h-9/10 w-full flex">
        {/* This div will be left part */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          {/* This div is for logo */}
          <div>
            <div className="logoDiv p-6">
              <img src={spotify_logo} alt="spotify logo" width={125} />
            </div>
            <div className="py-2">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                targetLink={"/"}
                active={currActiveScrn === "home"}
              />
              <IconText
                iconName={"majesticons:search-line"}
                displayText={"Search"}
                targetLink={"/searchpage"}
                active={currActiveScrn === "search"}
              />
              <IconText
                iconName={"fluent:library-28-regular"}
                displayText={"Library"}
                targetLink={"/library"}
                active={currActiveScrn === "library"}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName={"zondicons:heart"}
                displayText={"Liked Songs"}
                targetLink={"/favorites"}
                active={currActiveScrn === "favourites"}
              />
            </div>
          </div>
        </div>
        {/* This div will be the right part(main content) */}
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          {currActiveScrn === "search" ? (
            <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-between">
              <div
                className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ml-8 ${
                  isInputFocused ? "border border-white" : ""
                }`}
              >
                <Icon icon="ic:baseline-search" className="text-lg" />
                <input
                  type="text"
                  placeholder="What do you want to listen to?"
                  className="w-full bg-gray-800 focus:outline-none"
                  onFocus={() => {
                    setIsInputFocused(true);
                  }}
                  onBlur={() => {
                    setIsInputFocused(false);
                  }}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchSong();
                    }
                  }}
                />
              </div>
              {/* <SearchPage/> */}
              <div className="w-1/3 flex h-full">
                <div className="w-3/5 flex justify-around items-center">
                  {/* <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/> */}
                  {/* <div className="h-1/2 border-r border-white"></div> */}
                </div>
                <div className="w-2/5 flex justify-around h-full items-center">
                  {/* <div className="bg-white text-lg px-4 flex items-center justify-center rounded-full font-light cursor-pointer" onClick={logOut}>
                                Log out
                            </div> */}
                  <div className="relative">
                    <div
                      className="cursor-pointer bg-gray-500 rounded-full"
                      onClick={toggleDropdown}
                      onBlur={closeDropdown}
                      tabIndex={0}
                    >
                      {/* The icon or profile image that triggers the dropdown */}
                      <Icon
                        icon="gg:profile"
                        className="w-7 h-7 bg-gray-500 "
                      />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-10 right-0 bg-black p-4 shadow-md rounded-md">
                        {/* Dropdown content, e.g., user options */}
                        {/* <DropDown /> */}
                        <button className="cursor-pointer text-gray-500 hover:bg-gray-300 p-2 rounded-md">
                          <a
                            href="https://www.spotify.com/in-en/premium/"
                            target="_blank"
                          >
                            Premium
                          </a>
                        </button>
                        <button
                          className="cursor-pointer text-gray-500 hover:bg-gray-300 p-2 rounded-md"
                          onClick={() => {
                            handleProfile();
                          }}
                        >
                          Profile
                        </button>

                        <button
                          className="cursor-pointer text-gray-500 hover:bg-gray-300 p-2 rounded-md"
                          onClick={() => {
                            logOut();
                          }}
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                  {/* <DropDown/> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
              <div className="w-1/3 flex h-full">
                <div className="w-3/5 flex justify-around items-center">
                  {/* <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/> */}
                  {/* <div className="h-1/2 border-r border-white"></div> */}
                </div>
                <div className="w-2/5 flex justify-around h-full items-center relative">
                  {/* <div className="bg-white text-lg px-4 flex items-center justify-center rounded-full font-light cursor-pointer" onClick={logOut}>
                                Log out
                            </div> */}
                  <div className="relative">
                    <div
                      className="cursor-pointer bg-gray-200 rounded-full"
                      onClick={toggleDropdown}
                      onBlur={closeDropdown}
                      tabIndex={0}
                    >
                      {/* The icon or profile image that triggers the dropdown */}
                      <Icon icon="gg:profile" className="w-7 h-7" />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-10 right-0 bg-black p-4 shadow-md rounded-md p-2">
                        {/* Dropdown content, e.g., user options */}
                        {/* <DropDown /> */}
                        <div className="cursor-pointer text-gray-500 hover:bg-gray-300 p-2 rounded-md w-full">
                          Premium
                        </div>
                        <button
                          className="cursor-pointer text-gray-500 hover:bg-gray-300 p-2 rounded-md w-full"
                          onClick={() => {
                            handleProfile();
                          }}
                        >
                          <Link to={"/profile"}>Profile</Link>
                        </button>
                        <button
                          className="cursor-pointer text-gray-500 hover:bg-gray-300 p-2 rounded-md w-full"
                          onMouseEnter={() => {
                            console.log("chandan");
                            logOut();
                          }}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                  {/* <div className="bg-white text-lg flex items-center justify-center rounded-full font-light cursor-pointer inline-block" >
                                <Icon icon="gg:profile" className='w-7 h-7'/>
                            </div>
                            <div className="absolute bg-white p-4 w-52 shadow-lg left-14 top-24">
                                <ul>
                                    <li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">Premium</li>
                                    <li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">Log out</li>
                                </ul>
                            </div> */}
                  {/* jbjbkjjb */}
                  {/* <DropDown/> */}
                  {/* mb */}
                </div>
              </div>
            </div>
          )}
          {currActiveScrn === "search" ? (
            <div className="content p-8 pt-0 flex flex-col ">
              {/* {children} */}

              {songData.length > 0 ? (
                <div className="pt-10 space-y-3">
                  <div className="text-white">
                    Showing search results for
                    <span className="font-bold"> {searchText}</span>
                  </div>
                  {songData?.map((item) => {
                    return (
                      <SingleSongCard
                        info={item}
                        key={JSON.stringify(item)}
                        playSound={() => {}}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-400 pt-10">Nothing to show here.</div>
              )}
            </div>
          ) : (
            <div className="content p-8 pt-0 flex flex-col justify">
              {children}

              {/* {cardsData?.length>0 && <PlaylistView titleText={"Focus"} cardsData={cardsData} limit={currActiveScrn==="home"?cardsData.length===4:cardsData.length}/>} */}
            </div>
          )}
        </div>
      </div>
      {/* current playing song div */}

      <Player />
    </div>
  );
};

export default LoggedInContainer;
