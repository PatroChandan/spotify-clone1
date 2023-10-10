import { useEffect, useState ,useContext} from "react";
import LoggedInContainer from "../../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { useLocation, useParams } from "react-router-dom";
import songContext from "../../contexts/songContext"
import SongCard from "./SongCard";
import { Icon } from '@iconify/react';
import {Howl, Howler} from 'howler';

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

const ListMusic = ({key}) =>{
    const {currentSong,setCurrentSong} = useContext(songContext);
    const [songData,setSongData] = useState([]);
    const location = useLocation();
    const {id} = useParams();
    const [songDuartion, setSongDuartion] = useState(null);
    // console.log("chandan",id);

    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest("/music/album");
            // console.log("chandan",response);
            let newArray = response.data.filter((el)=>id===el._id).map((item)=>({...item,
                artists: item.artists.map((artist) => ({
                    ...artist,
                    audio_url: `https://newton-project-resume-backend.s3.amazonaws.com/audio/${artist.songs}.mp3`, // Store the "songs" array in the new key
                  }),)
                // audio_url:`https://newton-project-resume-backend.s3.amazonaws.com/audio/${item[0]?.artists.songs[0]}.mp3`}),
                }));
            // setSongData(response.data);
            setSongData(newArray);
        };
        getData();
    },[]);
    console.log("mad",songData);

    useEffect(() => {
        // Create the Howl instance when the component mounts
        const sound = new Howl({
            src: [songData.audio_url],
            html5: true
        });

        setSongDuartion(sound);

        // Cleanup the Howl instance on component unmount
        return () => {
            sound.unload();
        };
    }, [songData.audio_url]);
    return(
        <LoggedInContainer>
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                My Songs
            </div>
            <div className="space-y-3 overflow-auto">
                {/* {songData.artists?.map((item)=>{
                    return <SongCard infor={item} playSound={()=>{}}/>
                })} */}
                {songData[0]?.artists?.map((item)=>{
                    return(<div className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={()=>{setCurrentSong(songData)}}>
                        <div className="w-12 h-12 bg-cover bg-center" >
                            <img src={item.image}/>
                        </div> 
                        <div className="flex w-full">
                            <div className="text-white flex justify-center flex-col pl-4 w-4/6 truncate">
                                <div className="cursor-pointer truncate hover:underline">{item.description}</div>
                                <div className="text-xs text-gray-400 cursor-pointer truncate hover:underline">{item.name}</div>
                            </div>
                            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                                <Icon icon="icon-park-outline:like" className="text-xl"/>
                            </div>
                            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                                <div>{songDuartion ? formatTime(songDuartion.duration()) : 'Loading...'}</div>
                            </div>
                        </div>
                    </div>)
                })
                }
            </div>
            {/* Hello */}
        </LoggedInContainer>
    )
}
export default ListMusic