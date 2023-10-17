import { useEffect, useState ,useContext} from "react";
import LoggedInContainer from "../../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { useLocation, useParams } from "react-router-dom";
import songContext from "../../contexts/songContext"

import { Icon } from '@iconify/react';
import {Howl, Howler} from 'howler';

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

const ListMusic = ({}) =>{
    const {currentSong,setCurrentSong} = useContext(songContext);
    const [songData,setSongData] = useState([]);
    const location = useLocation();
    const {id} = useParams();
    const [songDuartion, setSongDuartion] = useState(0);
    const [songIndex,setSongIndex] = useState(0);
    // console.log("chandan",id);

    useEffect(()=>{
        const getData = async () =>{
            if(location.state.title==="Top album"){
                const response = await makeAuthenticatedGETRequest("/music/album");
                let newArray = response.data.filter((el)=>id===el._id);
                setSongData(newArray);
            }else{
                const response = await makeAuthenticatedGETRequest("/music/song");
                let newArray = response.data.filter((el)=>id===el._id);
                setSongData(newArray);
           }

            
        };
        getData();
    },[]);
    // useEffect(()=>{
    //     const getData = async () =>{
            
    //     };
    //     getData();
    // },[]);
    console.log("mad",songData);

    useEffect(() => {
        // Create the Howl instance when the component mounts
        if (songData.length > 0 && Array.isArray(songData[0]?.songs)) {
        let currentSongIndex = 0;
        const sound = new Howl({
            src: [songData?.songs[currentSongIndex].audio_url],
            html5: true,
            onend: () => {
                if (currentSongIndex < songData[0]?.songs.length - 1) {
                    currentSongIndex++;
                    const nextSong = songData[0]?.songs[currentSongIndex];
                    setSongIndex(currentSongIndex);
                    setCurrentSong(nextSong);
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
    }, [songData[0]?.songs?.audio_url,setCurrentSong]);

    const handleSongSelection = (selectedSong) => {
        setCurrentSong(selectedSong);
    };
    return(
        <LoggedInContainer>
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                {/* My Songs */}
                {location.state.title}
            </div>
            <div className="space-y-3 overflow-auto">
            
                {
                    location.state.title==="Top album"?(
                        songData[0]?.songs?.map((item,index)=>{
                            
                    return(
                        <div className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={()=>{handleSongSelection(item)}} key={index}>
                            <div className="w-5 text-gray-400 flex items-center justify-center pr-2">
                                {index+1}
                            </div>
                            <div className="w-12 h-12 bg-cover bg-center" >
                                <img src={item.thumbnail}/>
                            </div> 
                            <div className="flex w-full">
                                <div className="text-white flex justify-center flex-col pl-4 w-4/6 truncate">
                                    <div className="cursor-pointer truncate hover:underline">{item.title}</div>
                                    <div className="text-xs text-gray-400 cursor-pointer truncate hover:underline">{item.name}</div>
                                </div>
                                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                                    <Icon icon="icon-park-outline:like" className="text-xl cursor-pointer"/>
                                </div>
                                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                                    <div className="duration">{songDuartion ? formatTime(songDuartion.duration()) : '00:00'}</div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                    )
                    :(songData?.map((item,index)=>{
                    return(
                        <div className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={()=>{handleSongSelection(item)}} key={index}>
                            <div className="w-5 text-gray-400 flex items-center justify-center pr-2">
                                {index+1}
                            </div>
                            <div className="w-12 h-12 bg-cover bg-center" >
                                <img src={item.thumbnail}/>
                            </div> 
                            <div className="flex w-full">
                                <div className="text-white flex justify-center flex-col pl-4 w-4/6 truncate">
                                    <div className="cursor-pointer truncate hover:underline">{item.title}</div>
                                    <div className="text-xs text-gray-400 cursor-pointer truncate hover:underline">{item.name}</div>
                                </div>
                                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                                    <Icon icon="icon-park-outline:like" className="text-xl cursor-pointer"/>
                                </div>
                                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                                    <div className="duration">{songDuartion ? formatTime(songDuartion.duration()) : '00:00'}</div>
                                </div>
                            </div>
                        </div>
                    )
                }))
                }
            </div>
            {/* Hello */}
        </LoggedInContainer>
    )
}
export default ListMusic

// Play the next song when the current song ends
// currentSongIndex = (currentSongIndex + 1) % songData[0]?.songs.length;
// const nextSong = songData[0]?.songs[currentSongIndex];
// if (nextSong) {
//     setSongDuartion(new Howl({ src: [nextSong.audio_url], html5: true }));
//     setCurrentSong(nextSong.audio_url);
// }