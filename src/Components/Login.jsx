import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

function Login(props) {
  function updateOwnID(e) {
    props["setownID"](e.target.value);
  }
  function updatePartnerID(e) {
    props["setPartnerID"](e.target.value);
  }

  const navigate = useNavigate();
  function establishConnection() {
    if (props["ownID"] !== "____" && props["partnerID"] !== "____") {
      props["setIsLogged"](true);
      navigate("/P2PChat/message");
    }
  }
  
  return (
    <center>
      <Typography 
      variant="h2"
      sx={{
        fontFamily: "Roboto",
        margin: "14px"
      }}
      >Peer 2 Peer Chat</Typography> 
      <Typography
      sx={{
        fontFamily: "Roboto"
      }}
      >A simple peer to peer chat app. {<br/>} 
      Both you and your peer can choose any name you wish, share those names {<br/>} 
      with each other, and connect over a secure two way connection to chat!</Typography>
      <TextField
          id="outlined-helperText"
          label="Your Username"
          helperText="(Share this with your peer)"
          onChange={updateOwnID}
          sx={{marginTop: "20px"}}
        />
      <br/>
      <TextField
          id="outlined-helperText"
          label="Peer Username"
          helperText="(Username you wish to connect to)"
          onChange={updatePartnerID}
          sx={{margin: "14px"}}
        />
      <br/>
      <Button variant="outlined" onClick={() => establishConnection()}>Establish Connection</Button>
    </center>
  )
}

export default Login;
