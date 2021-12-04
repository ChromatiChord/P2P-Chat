import { TextField, Button } from '@mui/material'
import { usePeerState, useReceivePeerState } from 'react-peer';
import { useState, useEffect, useCallback } from 'react';
import { sha224 } from 'js-sha256';
import { useFirstRender } from './FirstRenderCheck';

function Messages(props) {

  const ownID = sha224(props["ownID"]+props["partnerID"]);
  const peerID = sha224(props["partnerID"]+props["ownID"]);
  const [messageList, setMessageList] = useState([]);

  const [message, setMessage] = useState("Message");
  function updateMessage(e) {
    setMessage(e.target.value);
  }
  const [sendState, setSendState, brokerID, connections, ownError] = usePeerState({
    "senderID": "setup",
    "message": ""
  }, {brokerId: ownID});
  
  function sendMessage() {
    const new_message = {
      "senderID": props["ownID"],
      "message": message
    }
    setSendState(new_message);
    setMessageList(messageList.concat([new_message]));

  }

  const [receiveState, isConnected, peerError] = useReceivePeerState(peerID);
  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) {
      if (receiveState["senderID"] !== "setup") {
        console.log("Recieved Message:");
        console.log(receiveState);
        setMessageList(messageList.concat([{
          "senderID": receiveState["senderID"],
          "message": receiveState["message"]
        }]));
      }
    }
  }, [receiveState])

  return (
    <>          
      Talking to: {props["partnerID"]}
      <br/>
      As: {props["ownID"]}
      <br/><br/>
      Message:
      <TextField onChange={updateMessage}/>
      <br/><br/>
      <Button onClick={() => sendMessage()}>Send Message</Button>
      {/* {JSON.stringify(messageList)} */}
      {messageList.map(messageItem => 
        <div>
          {messageItem["senderID"]}: {messageItem["message"]}
        </div>
      )}
    </>
  )
}

export default Messages;