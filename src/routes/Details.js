import { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"
import { useLocation, useNavigate, useParams } from "react-router-dom";


const LoggedInHome = () =>{
    const [albumData,setAlbumData] = useState([]);
    const location = useLocation();
    // const {albumData}= useParams();

    // useEffect(()=>{
    //     const getData = async () =>{
    //         const response = await makeAuthenticatedGETRequest("/music/album");
    //         // console.log("chandan",response);
    //         setAlbumData(response.data);
    //     };
    //     getData();
    // },[]);
    console.log(location.state.name);
    return(
        // <LoggedInContainer cardsData={albumData}/>
        <LoggedInContainer currActiveScrn={"home"}>
            {/* <PlaylistView titleText={"Top this week"} cardsData={albumData}/> */}
            <PlaylistView titleText={location.state.titleText} cardsData={location.state.name}/>
            
        </LoggedInContainer>
            
        
    )
}


export const PlaylistView = ({titleText,cardsData}) =>{
    if (!Array.isArray(cardsData)) {
        // Handle the case when cardsData is not an array
        return <div>Error: cardsData is not an array</div>;
    }
    return (
    <div className="text-white mt-8" >
        <div className="text-2xl font-semibold mb-5">{titleText}</div>
        <div className="w-full flex justify-between gap-6 overflow-auto flex-wrap">
            {
                cardsData?.map((item)=>{
                    return (
                        <Card
                            keyId={item._id}
                            title={item.title} 
                            name={titleText==="Top this week"?item.artists[0].name : item.artist[0].name}  
                            imgUrl={titleText==="Top this week"?item.image:item.thumbnail}
                        />
                    )
                })
            }
        </div>
    </div>
    )
};

const Card = ({keyId,title,name,imgUrl}) =>{
    const navigate = useNavigate();
    const handleListOfMusic = () =>{
        navigate(`/listmusic/${keyId}`);
    }
    return(
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg" style={{maxHeight:500, minWidth:200}} key={keyId} onClick={()=>handleListOfMusic()}>
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md"  
                src={imgUrl}
                 alt="label"/>
            </div>
            <div className="text-white text-sm font-semi-bold py-3 " >{title}</div>
            <div className="text-gray-500 text-sm">{name}</div>
        </div>
    )
}

export default LoggedInHome