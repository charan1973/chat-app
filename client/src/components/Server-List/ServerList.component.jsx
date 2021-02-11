import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { ServerContext } from "../../context/server/ServerContext";
import ServerIcon from "../Server-Icon/ServerIcon.component";

const ServerList = () => {
  const {
    server: { joinedServers },
  } = useContext(ServerContext);


  return (
    <Box
      bg="gray.900"
      h="100vh"
      d="flex"
      flexDirection="column"
      alignItems="center"
    >
      {joinedServers.map(({ from_server }) => {
        return (
          <ServerIcon
            key={from_server.id}
            server={from_server}
          />
        );
      })}
    </Box>
  );
};

export default ServerList;
