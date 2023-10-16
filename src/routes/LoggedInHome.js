import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {Howl, Howler} from 'howler';
import LoggedInContainer from "../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"
import ListMusic from "../components/shared/ListMusic";


const LoggedInHome = () =>{
    const [albumData,setAlbumData] = useState([]);
    const [featuredData,setFeaturedData] = useState([]);
    const [romaticData,setRomaticData] = useState([]);
    const [excitedData,setExcitedData] = useState([]);
    const [happyData,setHappyData] = useState([]);
    const [sadData,setSadData] = useState([]);
    

    // useEffect(()=>{
    //     const getData = async () =>{
    //         const response = await makeAuthenticatedGETRequest("/music/album");
            
    //         setAlbumData(response.data);
            
    //     };
    //     getData();
    // },[]);
    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest(`/music/song?filter={"featured":"Trending songs"}`);
            // console.log("chandan",response);
            setFeaturedData(response.data);
        };
        getData();
    },[]);
    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest(`/music/song?filter={"mood":"romantic"}`);
            // console.log("chandan",response);
            setRomaticData(response.data);
        };
        getData();
    },[]);
    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest(`/music/song?filter={"mood":"excited"}`);
            // console.log("chandan",response);
            setExcitedData(response.data);
        };
        getData();
    },[]);
    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest(`/music/song?filter={"mood":"happy"}`);
            // console.log("chandan",response);
            setHappyData(response.data);
        };
        getData();
    },[]);
    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest(`/music/song?filter={"mood":"sad"}`);
            // console.log("chandan",response);
            setSadData(response.data);
        };
        getData();
    },[]);
    
    // console.log("album",albumData);
    console.log("romatic",romaticData);
    // console.log("excited",excitedData);
    // console.log("happy",happyData);
    // console.log("sad",sadData);
    
    return(
        // <LoggedInContainer currActiveScrn={"home"} cardsData={albumData} limit={albumData.length}/>
        <LoggedInContainer currActiveScrn={"home"}>
            {/* <PlaylistView titleText={"Top this week"} cardsData={albumData}/> */}
            <PlaylistView titleText={"Trending songs"} cardsData={featuredData}/>
            <PlaylistView titleText={"Romantic"} cardsData={romaticData}/>
            <PlaylistView titleText={"Excited"} cardsData={excitedData}/>
            <PlaylistView titleText={"Happy"} cardsData={happyData}/>
            <PlaylistView titleText={"Sad"} cardsData={sadData}/> 
        </LoggedInContainer>
            
        
    )
}


export const PlaylistView = ({titleText,cardsData}) =>{
    // if (!cardsData) {
    //     return <div>Loading...</div>;
    // }
    const navigate = useNavigate();
    const handleSelectAll = () =>{
        if (cardsData) {
            navigate(`/details`,{state:{titleText:titleText,name:cardsData}});
        }
    }
    // console.log("album",cardsData);
    return (
    <div className="text-white mt-8" >
        <div className="text-2xl font-semibold mb-5 flex justify-between">
            {titleText}
            <div className="text-sm">
                {/* <Link to={"/details"} className="cursor-pointer hover:underline">Select All</Link> */}
                <div className="cursor-pointer hover:underline" onClick={handleSelectAll}>Select All</div>
            </div>
        </div>
        <div className="w-full flex justify-between gap-4 flex-wrap">
            {
               
                cardsData.slice(0,4)?.map((item)=>{
                    console.log(item)
                    return (
                        <Card
                            keyId={item._id}
                            title={item.title}
                            // name={titleText==="Top this week"?item.artists[0].name : item.artist[0].name}  
                            mood={titleText==="Top this week"?item.mood : item.mood}  
                            imgUrl={titleText==="Top this week"?item.image:item.thumbnail}
                        />
                    )
                })
                
            }
        </div>
    </div>
    )
};


const Card = ({keyId,title,mood,imgUrl}) =>{
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
            <div className="text-gray-500 text-sm">{mood}</div>
        </div>
    )
}

export default LoggedInHome