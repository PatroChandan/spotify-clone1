import './output.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import UpdatePassword from './routes/UpdatePassword';
import { useCookies } from 'react-cookie';
import LoggedInHome from './routes/LoggedInHome';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import songContext from './contexts/songContext';
import { useState } from 'react';

function App() {
  const [currentSong,setCurrentSong] = useState(null);
  const [cookie,setCookie] = useCookies(["token"]);
  
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {
          cookie.token ? (
            //logged in routes
            <songContext.Provider value={{currentSong,setCurrentSong}}>
              <Routes>
                  <Route path='/' />
                  <Route path='/home' element={<LoggedInHome/>}/>
                  <Route path='/uploadSong' element={<UploadSong/>}/>
                  <Route path='/myMusic' element={<MyMusic/>}/>
                  <Route path='*' element={<Navigate to={'/home'}/>}/>
              </Routes>
            </songContext.Provider>

          ) : (
            //logged out routes
            <Routes>
              <Route path='/home' element={<HomeComponent/>}/>
              <Route path='/login' element={<LoginComponent/>}/>
              <Route path='/signup' element={<SignupComponent/>}/>
              <Route path='/update' element={<UpdatePassword/>}/>
              <Route path='*' element={<Navigate to={'/login'}/>}/>
            </Routes>
          )
        }
        
      </BrowserRouter>
    </div>
  );
}

export default App;
