import { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"


const LoggedInHome = () =>{
    const [albumData,setAlbumData] = useState([]);

    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest("/music/album");
            // console.log("chandan",response);
            setAlbumData(response.data);
        };
        getData();
    },[]);
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
        <div className="text-2xl font-semibold mb-5">{titleText}</div>
        <div className="w-full flex justify-between space-x-4">
            {
                cardsData.map((item)=>{
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
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg" style={{maxHeight:400, minWidth:200}}>
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md"  
                src={imgUrl}
                 alt="label"/>
            </div>
            <div className="text-white text-sm font-semi-bold py-3 " style={{overflow:"hidden"}}>{title}</div>
            <div className="text-gray-500 text-sm" style={{overflow:"hidden"}}>{name}</div>
        </div>
    )
}

export default LoggedInHome