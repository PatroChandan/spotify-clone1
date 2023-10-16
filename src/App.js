import './output.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import Details from './routes/Details';
import UpdatePassword from './routes/UpdatePassword';
import { useCookies } from 'react-cookie';
import LoggedInHome from './routes/LoggedInHome';
import MyMusic from './routes/MyMusic';
import songContext from './contexts/songContext';
import { useState } from 'react';
import SearchPage from './routes/SearchPage';
import ListMusic from './components/shared/ListMusic';
import Library from './routes/Library';


function App() {
  const [currentSong,setCurrentSong] = useState(null);
  const [songPlayed,setSongPlayed] = useState(null);
  const [isPaused,setIsPaused] = useState(true);
  const [cookie,setCookie] = useCookies(["token"]);
  
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {
          localStorage.token ? (
            //logged in routes
            <songContext.Provider value={{currentSong,setCurrentSong,songPlayed,setSongPlayed,isPaused,setIsPaused}}>
              <Routes>
                  
                  <Route path='/' element={<LoggedInHome/>}/>
                  <Route path='/myMusic' element={<MyMusic/>}/>
                  <Route path='/details' element={<Details/>}/>
                  <Route path='/searchpage' element={<SearchPage/>}/>
                  <Route path='/listmusic/:id' element={<ListMusic/>}/>
                  <Route path='/library' element={<Library/>}/>
                  <Route path='*' element={<Navigate to={'/'}/>}/>
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
