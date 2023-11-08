import { Icon } from "@iconify/react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Howl, Howler } from "howler";

import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

import { useAuthContext } from "../contexts/AuthContext";
import Player from "../components/Player";
import AccountMenu from "../components/shared/AccountMenu";
import Navigation from "../components/shared/Navigation";

const LoggedInContainer = ({ children, currActiveScrn, cardsData, limit }) => {
  Howler.volume(1.0);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

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
    console.log("Logging out...");
    // removeCookie(['token']);
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("spotify_user");
    // cookies.remove("token");
    setToken(null);
    setUser(null);
    setAuthenticated(false);
    navigate("/login");
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
              <div className="w-1/6 flex h-full justify-start pl-5">
                <Navigation />
              </div>
              <div
                className={`w-2/6 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ml-8 ${
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
              <div className="w-1/6 flex h-full"></div>
              <div className="w-2/6 flex h-full">
                <div className="w-1/2 flex justify-around items-center"></div>
                <div className="w-1/2 flex justify-around h-full items-center relative">
                  {/* <div className="relative">
                    <div
                      className="cursor-pointer bg-gray-500 rounded-full"
                      onClick={toggleDropdown}
                      onBlur={closeDropdown}
                      tabIndex={0}
                    >
                      <Icon
                        icon="gg:profile"
                        className="w-7 h-7 bg-gray-500 "
                      />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-10 right-0 bg-black p-4 shadow-md rounded-md">
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
                          onClick={handleProfile}
                        >
                          Profile
                        </button>

                        <button
                          className="cursor-pointer text-gray-500 hover:bg-gray-300 p-2 rounded-md"
                          onSubmit={() => logOut()}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div> */}
                  <AccountMenu />
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
              <div className="w-1/6 flex h-full justify-start pl-5">
                <Navigation />
              </div>
              <div className="w-3/6 flex h-full"></div>
              <div className="w-2/6 flex h-full">
                <div className="w-1/2 flex justify-around items-center">
                  {/* <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/> */}
                  {/* <div className="h-1/2 border-r border-white"></div> */}
                </div>
                <div className="w-1/2 flex justify-around h-full items-center relative">
                  {/* <div className="relative">
                    <div
                      className="cursor-pointer bg-gray-200 rounded-full"
                      onClick={toggleDropdown}
                      onBlur={closeDropdown}
                      tabIndex={0}
                    >
                     
                      <Icon icon="gg:profile" className="w-7 h-7" />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-10 right-0 bg-black shadow-md rounded-md p-4">
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
                          onSubmit={() => logOut()}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div> */}
                  <AccountMenu />
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
