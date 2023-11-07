import { useEffect, useState, useContext, useRef } from "react";
import LoggedInContainer from "../../containers/LoggedInContainer";
import {
  addSongToFavorites,
  makeAuthenticatedGETRequest,
  removeSongFromFavorites,
} from "../../utils/serverHelpers";
import { useLocation, useParams } from "react-router-dom";
import songContext, { useSongContext } from "../../contexts/songContext";

import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import useApi from "../../Hooks/useApi";

const ListMusic = () => {
  const { currentSongs, setCurrentSongs, activeSong, setActiveSong } =
    useSongContext();
  //   const [currentSongs, setcurrentSongs] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const [songDuartion, setSongDuartion] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  // console.log("chandan",id);

  const { data: favoritesData } = useApi("/music/favorites/like");
  const audioRef = useRef();
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (location.state.title === "Top album") {
        const response = await makeAuthenticatedGETRequest(
          "/music/album?limit=100"
        );
        let newArray = response?.data?.filter((el) => id === el._id);
        console.log("new array", newArray);
        setCurrentSongs(newArray[0]?.songs);
      } else {
        const response = await makeAuthenticatedGETRequest(
          "/music/song?limit=100"
        );
        let newArray = response?.data?.filter((el) => id === el._id);
        console.log("new array2", newArray);
        setCurrentSongs(newArray);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const storedLikedSongs = localStorage.getItem("likedSongs");
    if (storedLikedSongs) {
      setLikedSongs(JSON.parse(storedLikedSongs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    if (currentSongs.length > 0 && Array.isArray(currentSongs[0]?.songs)) {
      const sound = new Howl({
        src: [currentSongs[activeSong]?.audio_url],
        html5: true,
        onend: () => {
          if (activeSong < currentSongs.length - 1) {
            // const nextSong = currentSongs[0]?.songs[activeSong];
            setActiveSong((prev) => prev + 1);

            sound.stop();
            sound.unload();
            sound.play();
          }
        },
      });

      setSongDuartion(sound);

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

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
  };

  const handleSongSelection = (index, songs) => {
    setCurrentSongs(songs);
    setActiveSong(index);
  };
  // console.log("list song", currentSongs);
  return (
    <LoggedInContainer>
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        {location.state.title}
      </div>
      <div className="space-y-3 overflow-auto">
        {currentSongs?.map((item, index, songs) => {
          let cnt = index;
          return (
            <div
              className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
              onClick={() => {
                handleSongSelection(index, songs);
              }}
              key={index}
            >
              <audio
                src={currentSongs[activeSong]?.audio_url}
                ref={audioRef}
                onLoadedMetadata={onloadedmetadata}
              />
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
                    icon={
                      likedSongs.includes(item._id)
                        ? "flat-color-icons:like"
                        : "icon-park-outline:like"
                    }
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
      {/* Hello */}
    </LoggedInContainer>
  );
};
export default ListMusic;
