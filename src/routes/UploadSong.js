import { Icon } from "@iconify/react"
import spotify_logo from "../assets/images/spotify_logo_white.svg"
import IconText from "../components/shared/IconText"
import TextWithHover from "../components/shared/TextWithHover"
import { Link } from "react-router-dom"
import TextInput from "../components/shared/TextInput"


const UploadSong = () => {
  return (
    <div className='h-full w-full flex'>
    {/* This div will be left part */}
        <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-10'>
            {/* This div is for logo */}
            <div>
            <div className='logoDiv p-6'>
                <img src={spotify_logo} alt="spotify logo" width={125}/>
            </div>
            <div className="py-2">
                <IconText iconName={"material-symbols:home"} displayText={"Home"} active={true}/>
                <IconText iconName={"majesticons:search-line"} displayText={"Search"}/>
                <IconText iconName={"fluent:library-28-regular"} displayText={"Library"}/>
                <IconText iconName={"mdi:music-box-multiple"} displayText={"My Music"}/>
            </div>
            <div className="pt-5">
                <IconText iconName={"icon-park-solid:add"} displayText={"Create Playlist"}/>
                <IconText iconName={"zondicons:heart"} displayText={"Liked Songs"}/>
            </div>
            </div>
            <div className="px-5">
                <div className="border border-gray-100 text-white w-1/3 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                    <Icon icon={"gis:earth"}/>
                    <div className="ml-2 text-sm font-semibold">English</div>
                </div>
            </div>
            
        </div>
        {/* This div will be the right part(main content) */}
        <div className='h-full w-4/5 bg-app-black overflow-auto'>
            <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                <div className="w-1/2 flex h-full">
                    <div className="w-3/5 flex justify-around items-center">
                        <TextWithHover displayText={"Premium"}/>
                        <TextWithHover displayText={"Support"}/>
                        <TextWithHover displayText={"Download"}/>
                        <div className="h-1/2 border-r border-white"></div>
                    </div>
                    <div className="w-2/5 flex justify-around h-full items-center">
                        <TextWithHover displayText={ "Upload song" }/>
                        <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                            <Link to={"/login"}>Log in</Link> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="content p-8 pt-0 overflow-auto">
                <div className="text-2xl font-semibold mb-5 text-white mt-8">
                    Upload Your Music
                </div>
                <div className="w-2/3 flex space-x-3">
                    <div className="w-1/2">
                        <TextInput label={"Name"} labelClassName={"text-white"} placeholder={"Name"}/>
                    </div>
                    <div className="w-1/2">
                        <TextInput label={"Thumbnail"} labelClassName={"text-white"} placeholder={"Thumbnail"}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default UploadSong