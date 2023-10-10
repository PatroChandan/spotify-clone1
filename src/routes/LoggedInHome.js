import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {Howl, Howler} from 'howler';
import LoggedInContainer from "../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"
import ListMusic from "../components/shared/ListMusic";


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
    
    // console.log("album",albumData);
    const handleSelectAll = () =>{
        
        navigate("/details");
    }
    return(
        // <LoggedInContainer currActiveScrn={"home"} cardsData={albumData} limit={albumData.length}/>
        <LoggedInContainer currActiveScrn={"home"}>
            <PlaylistView titleText={"Top this week"} cardsData={albumData}/>
        </LoggedInContainer>
            
        
    )
}


export const PlaylistView = ({titleText,cardsData,limit}) =>{
    // console.log("album",cardsData);
    return (
    <div className="text-white mt-8" >
        <div className="text-2xl font-semibold mb-5 flex justify-between">
            {titleText}
            <div className="text-sm">
                <Link to={"/details"} className="cursor-pointer hover:underline">Select All</Link>
            </div>
        </div>
        <div className="w-full flex justify-between gap-4 flex-wrap">
            {
                limit > 5?(cardsData?.map((item)=>{
                    
                    return (
                        <Card
                            keyId={item._id}
                            title={item.title} 
                            name={item.artists[0].name} 
                            imgUrl={item.image}
                        />
                    )
                })):(cardsData.slice(0,4)?.map((item)=>{
                    console.log(item)
                    return (
                        <Card
                            keyId={item._id}
                            title={item.title} 
                            name={item.artists[0].name} 
                            imgUrl={item.image}
                        />
                    )
                }))
            }
        </div>
    </div>
    )
};


const Card = ({keyId,title,name,imgUrl}) =>{
    const navigate = useNavigate();
    const handleListOfMusic = () =>{
        // const propsToPass = {
        //    console.log("gfcgc",keyId);
        //    prop1: key
        // };
        navigate(`/listmusic/${keyId}`);
    }
    return(
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg" style={{maxHeight:500, minWidth:200}} key={keyId} onClick={()=>handleListOfMusic()}>
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