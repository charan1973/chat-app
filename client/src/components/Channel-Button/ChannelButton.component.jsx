import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { setActiveChannelAction } from "../../context/server/server.action";
import { ServerContext } from "../../context/server/ServerContext";

const ChannelButton = ({ channel }) => {

  const {serverDispatch, server: {activeChannel}} = useContext(ServerContext)

  return (
    <Box
      _hover={{ bg: "gray.700"}}
      my="3px"
      bg={activeChannel.id === channel.id && "gray.500"}
      borderRadius="5px"
      cursor="pointer"
      p="5px"
      onClick={() => serverDispatch(setActiveChannelAction(channel))}
    >
      <Text as="span" mr="3px" fontWeight="100">#</Text>
      <Text as="span" fontWeight="700">{channel.channelName}</Text>
    </Box>
  );
};

export default ChannelButton;
