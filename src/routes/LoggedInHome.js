import { Icon } from "@iconify/react"
import spotify_logo from "../assets/images/spotify_logo_white.svg"
import IconText from "../components/shared/IconText"
import TextWithHover from "../components/shared/TextWithHover"
import { Link, useNavigate } from "react-router-dom"
import { backendUrl } from "../utils/config";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react";
import {Howl, Howler} from 'howler';
import LoggedInContainer from "../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"



const LoggedInHome = () =>{
    const [albumData,setAlbumData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest("/music/album");
            // console.log("chandan",response);
            setAlbumData(response.data);
        };
        getData();
    },[]);

    const handleSelectAll = () =>{
        navigate("/details");
    }
    return(
        <LoggedInContainer>
            <PlaylistView titleText={"Focus"} cardsData={albumData}/>
            {/* <PlaylistView titleText={"Spotify Playlist"} cardsData={focusCardsData}/>
            <PlaylistView titleText={"Sound of India"} cardsData={focusCardsData}/> */}
        </LoggedInContainer>
    )
}


const PlaylistView = ({titleText,cardsData}) =>{
    return (
    <div className="text-white mt-8" >
        <div className="text-2xl font-semibold mb-5 flex justify-between">
            {titleText}
            <button className="border-none text-sm" onClick={handleSelectAll}>Select All</button>
        </div>
        <div className="w-full flex justify-between space-x-4">
            {
                cardsData.slice(0,5).map((item)=>{
                    return (
                        <Card
                            title={item.title} 
                            name={item.artists[0].name} 
                            imgUrl={item.image}
                        />
                    )
                })
            }
        </div>
    </div>
    )
};

const Card = ({title,name,imgUrl}) =>{
    return(
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg" style={{maxHeight:500, minWidth:200}}>
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md"  
                src={imgUrl}
                 alt="label"/>
            </div>
            <div className="text-white text-sm font-semi-bold py-3 ">{title}</div>
            <div className="text-gray-500 text-sm">{name}</div>
        </div>
    )
}

export default LoggedInHome