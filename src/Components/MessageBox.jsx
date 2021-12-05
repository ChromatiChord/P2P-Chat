import { Box, Typography } from "@mui/material"

function MessageBox(props) {
  const isOrigin = props["id"] === props["messageItem"]["senderID"];
  let today = new Date();
  let time = `${today.getHours()}:${today.getMinutes()}`

  return (
    <Box sx={{
      margin: "10px",
      fontFamily: "Roboto",
      float: isOrigin ? "" : "right"
    }}>
      <div 
      style={{
        color: "grey",
        fontSize: "10px",
        marginLeft: "12px"
      }}
      >
        {props["messageItem"]["senderID"]}  {time}
      </div>
      <Box sx={{
        borderRadius: "20px",
        width: "25vw",
        bgcolor: isOrigin ? "#3283a8" : "#6794a8",
        color: "white",
        overflowWrap: "anywhere",
        padding: "10px",
        paddingLeft: "15px"
      }}>
        {props["messageItem"]["message"]}
      </Box>
    </Box>
  )
}

export default MessageBox
