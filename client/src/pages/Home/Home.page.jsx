import { Box, Grid } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import ChannelList from "../../components/Channel-List/ChannelList.component";
import ChatRoom from "../../components/Chat-Room/ChatRoom.component";
import ServerList from "../../components/Server-List/ServerList.component";

const Home = ({history}) => {


  return (
    <Grid templateColumns="5% 19% 57% 19%">
      <ServerList />
      <ChannelList />
      <ChatRoom />
      <Box bg="gray.600" h="100vh">Hello</Box>
    </Grid>
  );
};

export default withRouter(Home);
