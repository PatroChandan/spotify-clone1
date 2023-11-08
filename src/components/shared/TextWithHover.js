const TextWithHover = ({ displayText, active }) => {
  return (
    <div className="flex items-center justify-start cursor-pointer bg-black px-5 py-2 rounded-full border border-white-400 border-solid">
      <div
        className={`${
          active ? "text-black" : "text-gray-700"
        }  font-light text-lg hover:text-white`}
      >
        {displayText}
      </div>
    </div>
  );
};

export default TextWithHover;
