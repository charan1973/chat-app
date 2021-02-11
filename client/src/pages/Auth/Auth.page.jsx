import { Box, Image, Text } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import Register from "../../components/Auth-Components/Register.component";
import SignIn from "../../components/Auth-Components/Signin.component";
import DiscordWhiteLogo from "../../assets/Discord-Logo-White.png"

const Auth = ({ match }) => {
  return (
    <>
    <Box d="flex" justifyContent="center" alignItems="center">
      <Image src={DiscordWhiteLogo} alt="" h="50px" />
      <Text
        as="h2"
        fontSize="30px"
        fontWeight="bold"
      >
        Giscord
      </Text>
    </Box>
      <Box
        h="93vh"
        w="100%"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        {match.url === "/signin" ? <SignIn /> : <Register />}
      </Box>
    </>
  );
};

export default withRouter(Auth);
