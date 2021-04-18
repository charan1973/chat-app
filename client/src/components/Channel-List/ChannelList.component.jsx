import { CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { updateJoinedServersData } from "../../context/server/server.action";
import { ServerContext } from "../../context/server/ServerContext";
import { UserContext } from "../../context/user/UserContext";
import ChannelGroup from "../Channel-Group/ChannelGroup.component";
import ModalPopup from "../Modal/Modal.component";
import { updateServer } from "./channel-list.helper";
import "./ChannelList.styles.css";

const ChannelList = () => {
  const {
    server: {
      activeServer: { from_server: activeServer },
    }, serverDispatch
  } = useContext(ServerContext);

  const { user } = useContext(UserContext);

  const toast = useToast();

  const [drawer, setDrawer] = useState({
    open: false,
    updateServer: {
      serverImage: null,
      serverName: "",
      serverDescription: "",
      serverId: "",
    },
  });

  const closeDrawer = () => setDrawer({ ...drawer, open: false });

  const handleUpdateChange = (e) => {
    const { value, name, files } = e.target;

    setDrawer({
      ...drawer,
      updateServer: {
        ...drawer.updateServer,
        [name]: files ? files[0] : value,
      },
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("serverImage", drawer.updateServer.serverImage);
    newFormData.append("serverName", drawer.updateServer.serverName);
    newFormData.append(
      "serverDescription",
      drawer.updateServer.serverDescription
    );

    updateServer(drawer.updateServer.serverId, newFormData).then(({ data }) => {
      const { error, message } = data;
      if (message) {
        toast({
          title: "Success",
          description: message,
          status: "success",
        });
        setDrawer({ ...drawer, open: false });
        serverDispatch(updateJoinedServersData())
      } else if (error) {
        toast({
          title: "Error",
          description: error,
          status: "error",
        });
      }
    });
  };

  return (
    <>
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
            {user.id === activeServer.creatorId && (
              <IconButton
                icon={<SettingsIcon />}
                onClick={() =>
                  setDrawer({
                    ...drawer,
                    open: true,
                    updateServer: {
                      serverId: activeServer.id,
                      serverName: activeServer.serverName,
                      serverDescription: activeServer.serverDescription,
                      serverImage: "",
                    },
                  })
                }
              />
            )}
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
      >
        {user.name}
      </Box>

      {drawer.updateServer.serverId && (
        <Drawer onClose={closeDrawer} isOpen={drawer.open} size={"xl"}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader d="flex" justifyContent="space-between">
                <Text>Server Settings</Text>
                <IconButton icon={<CloseIcon />} onClick={closeDrawer} />
              </DrawerHeader>
              <Divider />
              <DrawerBody>
                <form onSubmit={handleUpdate}>
                  <Box d="grid" gridTemplateColumns="80% 20%">
                    <Box>
                      <Text fontWeight="bold">Server Name</Text>
                      <Input
                        value={drawer.updateServer.serverName}
                        onChange={handleUpdateChange}
                        name="serverName"
                      />
                      <Text fontWeight="bold" mt="10px">
                        Server Description
                      </Text>
                      <Textarea
                        value={drawer.updateServer.serverDescription}
                        onChange={handleUpdateChange}
                        name="serverDescription"
                      />
                    </Box>
                    <Box d="flex" alignItems="center" flexDirection="column">
                      <Image
                        src={activeServer.server_image_url}
                        h="100px"
                        w="100px"
                      />
                      <Input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleUpdateChange}
                        name="serverImage"
                      />
                      {drawer.updateServer.serverImage && (
                        <Text as="small">
                          <span style={{ fontWeight: "bold" }}>New</span> -{" "}
                          {drawer.updateServer.serverImage.name.slice(0, 13) +
                            "..."}
                        </Text>
                      )}
                    </Box>
                  </Box>
                  <Button bg="blue.600" type="submit">
                    Save
                  </Button>
                </form>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </Box>
    <ModalPopup isOpen={true} header="hello" >Hello</ModalPopup>
    </>
  );
};

export default ChannelList;
