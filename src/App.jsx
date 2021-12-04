import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material'
import { usePeerState, useReceivePeerState } from 'react-peer';
import { useState, useEffect, useCallback} from 'react'  
import Messages from './Components/Messages';
import Login from './Components/Login';

const App = () => {
  const [ownID, setownID] = useState("Partner ID");
  const [partnerID, setPartnerID] = useState("Own ID");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>      
        <Routes>
          <Route exact path="/" element={<Login {...{ownID, setownID, partnerID, setPartnerID, setIsLogged}}/>}/>
          <Route path="/message" element={!isLogged ? <Navigate replace to={"/"}/> : <Messages {...{ownID, partnerID}}/>}/>
          <Route path="*" element={<Navigate replace to={!isLogged ? "/" : "/message"}/>}/>
        </Routes>
    </Router>
  )
}

export default App;
