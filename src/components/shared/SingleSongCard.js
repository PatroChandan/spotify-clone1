import { useContext, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import { useSongContext } from "../../contexts/songContext";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};
const SingleSongCard = ({ info, playSound }) => {
  const { setCurrentSongs, setActiveSong } = useSongContext();
  const [songDuartion, setSongDuartion] = useState(null);

  useEffect(() => {
    // Create the Howl instance when the component mounts
    const sound = new Howl({
      src: [info.audio_url],
      html5: true,
    });

    setSongDuartion(sound);

    // Cleanup the Howl instance on component unmount
    return () => {
      sound.unload();
    };
  }, [info.audio_url]);
  const handleSong = () => {};

  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
      onClick={() => {
        handleSong(info);
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-white flex justify-center flex-col pl-4 w-4/6">
          <div className="cursor-pointer hover:underline">{info.title}</div>
          <div className="text-xs text-gray-400 cursor-pointer hover:underline">
            {info.artist.map((item) => item.name)}
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <Icon icon="icon-park-outline:like" className="text-xl" />
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div className="duration">
            {songDuartion ? formatTime(songDuartion.duration()) : "00:00"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
