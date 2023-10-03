import SingleSongCard from "../components/shared/SingleSongCard"
import { useEffect, useState } from "react"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import {Howl, Howler} from 'howler';
import LoggedInContainer from "../containers/LoggedInContainer"

const MyMusic = () => {
    const [songData,setSongData] = useState([]);

    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest("/music/song");
            // console.log("chandan",response);
            setSongData(response.data);
        };
        getData();
    },[]);
    // console.log("chand",songData);
    return(
        <LoggedInContainer>
            {/* <div className="content p-8 overflow-auto"> */}
                <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                    My Songs
                </div>
                <div className="space-y-3 overflow-auto">
                    {songData.map((item)=>{
                        return <SingleSongCard info={item} playSound={()=>{}}/>
                    })}
                </div>
            {/* </div> */}
        </LoggedInContainer>
    );
}


export default MyMusic