import { createContext } from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {},
    songPlayed : null,
    setSongPlayed : ()=>{},
    isPaused : null,
    setIsPaused : () => {},
});

export default songContext;