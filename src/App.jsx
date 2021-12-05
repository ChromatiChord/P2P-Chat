import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material'
import { usePeerState, useReceivePeerState } from 'react-peer';
import { useState, useEffect, useCallback} from 'react'  
import Messages from './Components/Messages';
import Login from './Components/Login';

const App = () => {
  const [ownID, setownID] = useState("____");
  const [partnerID, setPartnerID] = useState("____");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>      
        <Routes>
          <Route exact path="/P2PChat" element={<Login {...{ownID, setownID, partnerID, setPartnerID, setIsLogged}}/>}/>
          <Route path="/P2PChat/message" element={!isLogged ? <Navigate replace to={"/P2PChat"}/> : <Messages {...{ownID, partnerID}}/>}/>
          <Route path="*" element={<Navigate replace to={!isLogged ? "/P2PChat" : "/P2PChat/message"}/>}/>
        </Routes>
    </Router>
  )
}

export default App;
