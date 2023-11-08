import { useEffect, useState, useContext } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import {
  addSongToFavorites,
  makeAuthenticatedGETRequest,
  removeSongFromFavorites,
} from "../utils/serverHelpers";
import { useLocation, useParams } from "react-router-dom";

import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import useApi from "../Hooks/useApi";
import { useSongContext } from "../contexts/songContext";
import { backendUrl } from "../utils/config";

const Favorites = () => {
  const { currentSongs, setCurrentSongs, activeSong, setActiveSong } =
    useSongContext();
  //   const [currentSongs, setcurrentSongs] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const [songDuartion, setSongDuartion] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [favoritesData, setFavoritesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("spotify_token");
        const response = await fetch(backendUrl + "/music/favorites/like", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            projectId: "f104bi07c490",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const result = await response.json();
        setFavoritesData(result.data);
        // console.log("res", result);
      } catch (error) {
        console.error("Error have done on Favorites:", error);
      }
    };

    fetchData();
  }, [likedSongs]);

  // console.log("chandan",id);

  // const { data: favoritesData } = useApi("/music/favorites/like");

  useEffect(() => {
    if (currentSongs.length > 0 && Array.isArray(currentSongs[0]?.songs)) {
      const sound = new Howl({
        src: [currentSongs[activeSong]?.audio_url],
        html5: true,
        onend: () => {
          if (activeSong < currentSongs.length - 1) {
            setActiveSong((prev) => prev + 1);

            sound.stop();
            sound.unload();
            sound.play();
          }
        },
      });

      setSongDuartion(sound);

      // Cleanup the Howl instance on component unmount
      return () => {
        sound.unload();
      };
    }
  }, [currentSongs?.audio_url, setCurrentSongs]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const storedLikedSongs = localStorage.getItem("likedSongs");
    if (storedLikedSongs) {
      setLikedSongs(JSON.parse(storedLikedSongs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const handleLikeToggle = async (songId) => {
    try {
      if (likedSongs.includes(songId)) {
        await removeSongFromFavorites("/music/favorites/like", songId);

        setIsFavourite(false);
      } else {
        await addSongToFavorites("/music/favorites/like", songId);
        setIsFavourite(true);
      }

      setLikedSongs((prevLikedSongs) =>
        prevLikedSongs.includes(songId)
          ? prevLikedSongs.filter((id) => id !== songId)
          : [...prevLikedSongs, songId]
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleSongSelection = (index, songs) => {
    setCurrentSongs(songs);
    setActiveSong(index);
  };

  return (
    <LoggedInContainer currActiveScrn={"favourites"}>
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        Favourites
      </div>
      <div className="space-y-3 overflow-auto">
        {favoritesData.songs?.map((item, index, songs) => {
          let cnt = index;
          return (
            <div
              className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
              onClick={() => {
                handleSongSelection(index, songs);
              }}
              key={index}
            >
              <div className="w-5 text-gray-400 flex items-center justify-center pr-2">
                {cnt + 1}
              </div>
              <div className="w-12 h-12 bg-cover bg-center">
                <img src={item.thumbnail} />
              </div>
              <div className="flex w-full">
                <div className="text-white flex justify-center flex-col pl-4 w-4/6 truncate">
                  <div className="cursor-pointer truncate hover:underline">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400 cursor-pointer truncate hover:underline">
                    {item.name}
                  </div>
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                  <Icon
                    icon={"flat-color-icons:like"}
                    className={`text-xl cursor-pointer ${
                      likedSongs.includes(item._id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleLikeToggle(item._id)}
                  />
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                  <div className="duration">
                    {songDuartion
                      ? formatTime(songDuartion.duration())
                      : "00:00"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LoggedInContainer>
  );
};
export default Favorites;
