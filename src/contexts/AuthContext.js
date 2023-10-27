import { createContext, useContext, useState } from "react";



const AuthContext = createContext();


const AuthContextProvider = ({children}) => {
    const [authenticated,setAuthenticated] = useState(false);
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(true);
    
    
  return (
    <AuthContext.Provider value={{authenticated,setAuthenticated,user,setUser,token,setToken}}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;

export const useAuthContext =()=>useContext(AuthContext);