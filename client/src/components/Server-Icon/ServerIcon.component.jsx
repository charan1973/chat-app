import { Box, Image, Text, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import { setActiveServerAction } from "../../context/server/server.action";
import { ServerContext } from "../../context/server/ServerContext";

const ServerIcon = ({ server, onClick }) => {

  const {server: {activeServer}, serverDispatch} = useContext(ServerContext)

  return (
    <Tooltip label={server.serverName} placement="right-start">
      <Box
        borderRadius={activeServer.from_server && activeServer.from_server.id === server.id ? "20%" : "50%"}
        h="60px"
        w="60px"
        bg="#fff"
        d="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        _hover={{ backgroundColor: "gray.500" }}
        cursor="pointer"
        mt="7px"
        onClick={() => {serverDispatch(setActiveServerAction(server.id))}}
      >
        {server.server_image_url ? (
          <Image src={server.server_image_url} w="60%" />
        ) : (
          <Text fontWeight="bold" color="black" fontSize="35px">
            {server.serverName.slice(0, 1)}
          </Text>
        )}
      </Box>
    </Tooltip>
  );
};

export default ServerIcon;
