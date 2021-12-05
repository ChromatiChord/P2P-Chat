import { TextField, Button, Box, Typography, Grid } from '@mui/material'
import { usePeerState, useReceivePeerState } from 'react-peer';
import { useState, useEffect, useCallback } from 'react';
import { sha224 } from 'js-sha256';
import { useFirstRender } from './FirstRenderCheck';
import MessageBox from './MessageBox';

function getDateTime() {
  let today = new Date(),
  date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+' '+time;
}

function Messages(props) {

  const font = {fontFamily: "Roboto"}
  const id = [...props["ownID"]].join("");

  const ownID = sha224(props["ownID"]+props["partnerID"]);
  const peerID = sha224(props["partnerID"]+props["ownID"]);
  const [messageList, setMessageList] = useState([]);

  const [message, setMessage] = useState("____");
  function updateMessage(e) {
    setMessage(e.target.value);
  }
  const [sendState, setSendState, brokerID, connections, ownError] = usePeerState({
    "senderID": "setup",
    "message": ""
  }, {brokerId: ownID});
  
  function sendMessage() {
    if (message !== "____") {
      const new_message = {
        "senderID": props["ownID"],
        "message": message
      }
      setSendState(new_message);
      setMessageList(messageList.concat([new_message]));
    }
  }

  const [receiveState, isConnected, peerError] = useReceivePeerState(peerID);
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) {
      if (receiveState["senderID"] !== "setup") {
        setMessageList(messageList.concat([{
          "senderID": receiveState["senderID"],
          "message": receiveState["message"]
        }]));
      }
    }
  }, [receiveState])

  useEffect(() => {
    if (!firstRender) {
      console.log(connections);
    }
  }, [connections])

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <Box sx={{ 
      display: 'flex',
      margin: "50px",
      justifyContent: 'space-evenly'
    }}>
      <Box sx={{
        border: "1px solid grey",
        width: "20vw",
        height: "75vh",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <center>
          <Typography
            sx={font}
            >Connected To: <br/>
            {props["partnerID"]}
          </Typography>
          <TextField
            id="outlined-helperText"
            label="Message"
            onChange={updateMessage}
            onKeyDown={handleKeyDown}
          />
          <br/><br/>
          <Button variant="outlined" onClick={() => sendMessage()}>Send Message</Button>
        </center>
      </Box>  
      <Box sx={{
        border: "1px solid grey",
        width: "50vw",
        height: "75vh",
        borderRadius: "15px",
        overflow: "auto",
        minHeight: "0px",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
      }}>
        {messageList.map(messageItem => 
          <div key={getDateTime() + messageItem["message"]}>
            <MessageBox {...{messageItem, id}}/>
          </div>
        )}
      </Box>        
    </Box>
  )
}

export default Messages;