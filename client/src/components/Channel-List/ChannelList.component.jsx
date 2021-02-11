import { Box, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ServerContext } from "../../context/server/ServerContext";
import ChannelGroup from "../Channel-Group/ChannelGroup.component";

const ChannelList = () => {
  const {
    server: {
      activeServer: { from_server: activeServer },
    },
  } = useContext(ServerContext);

  return (
    <Box bg="gray.600" h="100vh" position="relative">
      {activeServer ? (
        <>
          <Box
            h="100px"
            bg="gray.700"
            d="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            <Text fontWeight="bold" fontSize="20px">
              {activeServer.serverName}
            </Text>
            <Image src={activeServer.server_image_url} h="30px" />
          </Box>
          <Box mx="10px" my="10px">
            {activeServer.server_to_groups &&
              activeServer.server_to_groups.map((group) => (
                <ChannelGroup key={group.id} group={group} />
              ))}
          </Box>
        </>
      ) : (
        <Box
          d="flex"
          h="100%"
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
        >
          Please select a server
        </Box>
      )}
      <Box
        h="50px"
        bg="gray.500"
        position="absolute"
        bottom="0px"
        left="0px"
        right="0px"
      >User info</Box>
    </Box>
  );
};

export default ChannelList;
