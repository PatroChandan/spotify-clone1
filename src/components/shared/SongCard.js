import { useContext } from "react"
import songContext from "../../contexts/songContext"
const SongCard = ({infor,playSound}) =>{
    const {currentSong,setCurrentSong} = useContext(songContext);
    // console.log("songCard",infor)
    return (
        <div className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={()=>{setCurrentSong(infor)}}>
            {/* <div className="w-12 h-12 bg-cover bg-center" style={{
                backgroundImage:`url("${infor.image}")`
                }}></div>  */}
            <div className="w-12 h-12 bg-cover bg-center" style={{
                backgroundImage:`url("${infor.image}")`
                }}></div> 
            <div className="flex w-full">
                <div className="text-white flex justify-center flex-col pl-4 w-5/6 truncate">
                    <div className="cursor-pointer hover:underline">{infor.description}</div>
                    <div className="text-xs text-gray-400 cursor-pointer hover:underline">{infor.artist.map((item)=>item.name)}</div>
                </div>
                <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                    <div>3:44</div>
                </div>
            </div>
        </div>
    )
}


export default SongCard