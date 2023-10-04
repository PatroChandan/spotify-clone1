import { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"
import { useNavigate } from "react-router-dom";


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
        <LoggedInContainer cardsData={albumData}/>
            
            
        
    )
}


export const PlaylistView = ({titleText,cardsData}) =>{
    return (
    <div className="text-white mt-8" >
        <div className="text-2xl font-semibold mb-5">{titleText}</div>
        <div className="w-full flex justify-between gap-6 overflow-auto flex-wrap">
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
    const navigate = useNavigate();
    const handleListOfMusic = () =>{
        navigate("/mymusic")
    }
    return(
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg" style={{maxHeight:400, minWidth:200}} onClick={handleListOfMusic}>
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