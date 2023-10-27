import { createContext, useContext, useState } from "react";

const songContext = createContext();

const SongContextProvider = ({ children }) => {
  const [activeSong, setActiveSong] = useState(0);
  const [songPlayed, setSongPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentSongs, setCurrentSongs] = useState([]);
  // const [duration, setDuration] = useState(0);

  return (
    <songContext.Provider
      value={{
        activeSong,
        setActiveSong,
        currentSongs,
        setCurrentSongs,
        songPlayed,
        setSongPlayed,
        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </songContext.Provider>
  );
};

export default SongContextProvider;

export const useSongContext = () => useContext(songContext);
