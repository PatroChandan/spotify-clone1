
const TextWithHover = ({displayText,active}) =>{
    return(
        <div className="flex items-center justify-start cursor-pointer bg-white px-5 rounded-full">
           
            <div className={`${active?"text-black":"text-gray-700"} font-light text-lg hover:text-black`}>{displayText}</div>
        </div>
    )
}

export default TextWithHover;