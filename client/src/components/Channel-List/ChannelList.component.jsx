import { CloseIcon, SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { updateJoinedServersData } from "../../context/server/server.action";
import { ServerContext } from "../../context/server/ServerContext";
import { UserContext } from "../../context/user/UserContext";
import ChannelGroup from "../Channel-Group/ChannelGroup.component";
import ModalPopup from "../Modal/Modal.component";
import { createGroup, updateServer } from "./channel-list.helper";
import "./ChannelList.styles.css";

const ChannelList = () => {
  const {
    server: {
      activeServer: { from_server: activeServer },
    },
    serverDispatch,
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

  const [modalOpen, setModalOpen] = useState({
    open: false,
    groupForm: false,
    channelForm: false,
  });

  const [createForm, setCreateForm] = useState({}); // State to store create group or channel form

  const onModalClose = () => setModalOpen({ ...modalOpen, open: false });

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
        setDrawer({ ...drawer, open: false });
        serverDispatch(updateJoinedServersData());
        
        return toast({
          title: "Success",
          description: message,
          status: "success",
        });
      }
      toast({
        title: "Error",
        description: error,
        status: "error",
      });
    });
  };

  const handleCreateGroupOrChannelClick = (e) => {
    // Show create channel or create group form modal based on click

    setCreateForm({});

    setModalOpen({
      open: true,
      groupForm: e.target.name === "group" ? true : false,
      channelForm: e.target.name === "channel" ? true : false,
    });
  };

  const createGroupForm = (e) => {
    e.preventDefault();

    createGroup({ serverId: activeServer.id, ...createForm }).then(
      ({ data }) => {
        const { error, message } = data;
        if (error) {
          return toast({
            title: "Error",
            description: error,
            status: "error",
          });
        }

        toast({
          title: "Created",
          description: message,
          status: "success"
        })

        setModalOpen({...modalOpen, open: false})
      }
    );
  };

  return (
    <>
      <Box bg="gray.600" h="100vh" position="relative">
        {activeServer ? (
          <>
            <Box h="150px" bg="gray.700">
              <Flex justifyContent="flex-end" p="10px">
                <Menu>
                  <MenuButton as={Button} variant="outline" border="none">
                    <ChevronDownIcon fontSize="25px" fontWeight="bold" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      name="group"
                      onClick={handleCreateGroupOrChannelClick}
                    >
                      Create Group
                    </MenuItem>
                    <MenuItem
                      name="channel"
                      onClick={handleCreateGroupOrChannelClick}
                    >
                      Create Channel
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Box d="flex" alignItems="center" justifyContent="space-around">
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
      <ModalPopup
        isOpen={modalOpen.open}
        onClose={onModalClose}
        header={modalOpen.groupForm ? "Create Group" : "Create Channel"}
      >
        {/* Create group */}
        <>
          {modalOpen.groupForm && (
            <form onSubmit={createGroupForm}>
              <Input
                type="text"
                name="groupName"
                placeholder="Enter new group name"
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Flex justifyContent="flex-end">
                <Button type="submit" mt="8px">
                  Create
                </Button>
              </Flex>
            </form>
          )}
        </>
        <>
          {/* Create channel */}
          {modalOpen.channelForm && (
            <form>
              <Select
                placeholder="Select option"
                name="groupId"
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                {activeServer.server_to_groups.map((group) => {
                  return (
                    <option key={group.id} value={group.id}>
                      {group.groupName}
                    </option>
                  );
                })}
              </Select>
              <Input
                mt="8px"
                type="text"
                placeholder="Enter a channel name"
                name="channelName"
                onChange={(e) =>
                  setCreateForm({
                    ...createForm,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Flex justifyContent="flex-end">
                <Button type="submit" mt="8px">
                  Create
                </Button>
              </Flex>
            </form>
          )}
        </>
      </ModalPopup>
    </>
  );
};

export default ChannelList;
