import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material'
import { usePeerState, useReceivePeerState } from 'react-peer';
import { useState, useEffect, useCallback } from 'react';

function Login(props) {
  function updateOwnID(e) {
    props["setownID"](e.target.value);
  }
  function updatePartnerID(e) {
    props["setPartnerID"](e.target.value);
  }

  const navigate = useNavigate();
  function establishConnection() {
    props["setIsLogged"](true);
    navigate("/P2PChat/message");
  }
  
  return (
    <>      
      <br/>
      <br/>
      Your user ID
      <TextField onChange={updateOwnID}/>
      {props["ownID"]}
      <br/>
      <br/>
      Other User ID
      <TextField onChange={updatePartnerID}/>
      {props["partnerID"]}
      <br/>
      <br/>
      <Button onClick={() => establishConnection()}>Establish Connection</Button>
    </>
  )
}

export default Login;
