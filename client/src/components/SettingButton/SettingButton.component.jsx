import { SettingsIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";

const SettingButton = () => {
  return (
    <Box
      as="span"
      p="5px"
      borderRadius="5px"
      _hover={{ backgroundColor: "gray.800" }}
    >
      <SettingsIcon />
    </Box>
  );
};

export default SettingButton;
