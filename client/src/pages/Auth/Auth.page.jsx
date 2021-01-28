import { Box, Text } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import Register from "../../components/Auth-Components/Register.component";
import SignIn from "../../components/Auth-Components/Signin.component";

const Auth = ({match}) => {
    return ( 
        <>
        <Text as="h2" fontSize="30px" fontWeight="bold" mt="10px" textAlign="center">Giscord</Text>
        <Box h="93vh" w="100%" d="flex" justifyContent="center" alignItems="center">
            {match.url === "/signin" ? <SignIn /> : <Register />}
        </Box>
        </>
     );
}
 
export default withRouter(Auth);