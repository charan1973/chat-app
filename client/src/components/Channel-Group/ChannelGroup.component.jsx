import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Input,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ServerContext } from "../../context/server/ServerContext";
import { UserContext } from "../../context/user/UserContext";
import ChannelButton from "../Channel-Button/ChannelButton.component";
import SettingButton from "../SettingButton/SettingButton.component";

const ChannelGroup = ({ group }) => {
  const { user } = useContext(UserContext);

  const {
    server: {
      activeServer: { from_server: activeServer },
    },
  } = useContext(ServerContext);

  return (
    <>
    <Accordion
      allowMultiple
      border="transparent"
      defaultIndex={[group.group_to_channels.length - 1]}
    >
      <AccordionItem outline="none">
        <AccordionButton d="flex" justifyContent="space-between">
          <Box as="span">
            <AccordionIcon />
            {group.groupName}
          </Box>
          {user.id === activeServer.creatorId && (
            <SettingButton />
          )}
        </AccordionButton>
        <AccordionPanel>
          {group.group_to_channels.map((channel) => (
            <ChannelButton key={channel.id} channel={channel} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    </>
  );
};

export default ChannelGroup;
