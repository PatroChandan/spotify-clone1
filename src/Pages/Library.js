import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const Library = () => {
  return (
    <LoggedInContainer>
        <div className="flex flex-col items-center text-white">
            <h1>Coming Soon</h1>
            <p>We are working on something amazing. Stay tuned!</p>
        </div>
    </LoggedInContainer>
    
  );
};

export default Library;