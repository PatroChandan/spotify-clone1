import { useEffect, useState ,useContext} from "react";
import LoggedInContainer from "../../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import SingleSongCard from "./SingleSongCard";
import { useLocation, useParams } from "react-router-dom";
import songContext from "../../contexts/songContext"
import SongCard from "./SongCard";

const ListMusic = ({key}) =>{
    const {currentSong,setCurrentSong} = useContext(songContext);
    const [songData,setSongData] = useState([]);
    const location = useLocation();
    const {id} = useParams();
    console.log("chandan",id);

    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest("/music/album");
            // console.log("chandan",response);
            let newArray = response.data.filter((el)=>{
                return id===el._id;
            })
            // setSongData(response.data);
            setSongData(newArray);
        };
        getData();
    },[]);
    console.log("mad",songData);
    return(
        <LoggedInContainer>
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                My Songs
            </div>
            <div className="space-y-3 overflow-auto">
                {songData?.artists?.map((item)=>{
                    return <SongCard infor={item}/>
                })}
            </div>
            {/* Hello */}
        </LoggedInContainer>
    )
}
export default ListMusic