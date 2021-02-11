import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import ChannelButton from "../Channel-Button/ChannelButton.component";

const ChannelGroup = ({ group }) => {

  return (
    <Accordion
      allowMultiple
      border="transparent"
      defaultIndex={[group.group_to_channels.length - 1]}
    >
      <AccordionItem outline="none">
        <AccordionButton>
          <AccordionIcon />
          {group.groupName}
        </AccordionButton>
        <AccordionPanel>
          {group.group_to_channels.map((channel) => (
            <ChannelButton
              key={channel.id}
              channel={channel}
            />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ChannelGroup;
