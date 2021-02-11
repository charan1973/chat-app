import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ServerContext } from "../../context/server/ServerContext";

const ChatRoom = () => {
  const {
    server: { activeChannel },
  } = useContext(ServerContext);

  return (
    <Box bg="gray.700" h="100vh">
      <Box h="50px" bg="gray.800" d="flex" alignItems="center" px="10px">
        <Text fontSize="25px" mr="10px" color="gray.400">#</Text>
        <Text fontWeight="bold">{activeChannel.channelName}</Text>
      </Box>
    </Box>
  );
};

export default ChatRoom;
