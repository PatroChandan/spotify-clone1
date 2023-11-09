import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Howl, Howler } from "howler";
import { useSongContext } from "../contexts/songContext";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useAuthContext } from "../contexts/AuthContext";
import spotifyImg from "../assets/images/spotify.webp";

const Player = () => {
  const [songData, setSongData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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

  //   separate

  const audioRef = useRef();
  const progressBarRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      if (prev) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        console.log("audio", audioRef.current);
      }
      return !prev;
    });
    audioRef.current.play();
  };

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef?.current?.currentTime;
    setTimeProgress(currentTime);
    if (progressBarRef?.current) {
      progressBarRef.current.value = currentTime;
    }
    progressBarRef?.current?.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const handleVolumeChange = (e) => {
    if (audioRef) {
      audioRef.current.volume = e.target.value / 100;
      // currentSongs[activeSong]?.volume(volumeLevel);
    }
  };
  const handlePrevious = () => {
    if (activeSong === 0) {
      let lastTrackIndex = currentSongs.length - 1;
      setActiveSong(lastTrackIndex);
    } else {
      setActiveSong(() => activeSong - 1);
    }
  };

  const handleNext = () => {
    if (activeSong === currentSongs.length - 1) {
      setIsPlaying(false);
    } else {
      setActiveSong(() => activeSong + 1);
    }
  };
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  // console.log("curr song", currentSongs);
  return (
    <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
      <audio
        src={currentSongs[activeSong]?.audio_url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="w-1/4 flex items-center">
        <img
          src={
            currentSongs?.[activeSong]?.thumbnail
              ? currentSongs?.[activeSong]?.thumbnail
              : spotifyImg
          }
          alt="currentSongThumbnail"
          className="h-14 w-14 rounded"
        />
        <div className="pl-4">
          <div className="text-sm hover:underline cursor-pointer">
            {currentSongs?.[activeSong]?.title}
          </div>
          <div className="text-xs text-gray-500 hover:underline cursor-pointer">
            {currentSongs?.[activeSong]?.artist?.length > 0 &&
              currentSongs?.[activeSong]?.artist[0].name}
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full flex justify-center flex-col items-center">
        <div className="flex w-1/3 justify-between items-center">
          {/* song control */}

          <Icon
            icon="ic:baseline-skip-previous"
            fontSize={30}
            className="cursor-pointer text-gray-500 hover:text-white"
            onClick={() => handlePrevious(currentSongs?.[activeSong])}
          />

          <Icon
            icon={
              isPlaying ? "ic:baseline-pause-circle" : "ic:baseline-play-circle"
            }
            fontSize={40}
            className="cursor-pointer text-gray-500 hover:text-white"
            onClick={togglePlayPause}
          />
          <Icon
            icon="ic:baseline-skip-next"
            fontSize={30}
            className="cursor-pointer text-gray-500 hover:text-white"
            onClick={() => handleNext(currentSongs?.[activeSong])}
          />
        </div>
        {/* <div>progress bar</div> */}
        <div className="progress w-full flex justify-center  items-center">
          <span className="time current">
            {formatTime(audioRef.current?.currentTime)}
          </span>
          <input
            type="range"
            className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
            ref={progressBarRef}
            min="0"
            max={songPlayed?.duration()}
            step="1"
            value={currentTime}
            onChange={handleSeek}
            style={{ background: "green" }}
          />
          {/* <span className="time">{formatTime(songPlayed?.duration())}</span> */}
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-1/4 flex justify-end">
        <div className="w-full flex justify-end  items-center ">
          <input
            type="range"
            className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 text-green-700"
            onChange={handleVolumeChange}
          />
          <Icon
            icon="mingcute:volume-fill"
            fontSize={30}
            className="cursor-pointer text-gray-500 hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
