import { Box, Button, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link, Route } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.id ? (
          <Component {...props} />
        ) : (
          <Box
            h="100vh"
            w="100%"
            d="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" flexDirection="column">
              <Text textAlign="center" fontWeight="bold">Do you mind?</Text>
              <div>
              <Button as={Link} to="/signin">Sign-In</Button>
              <span>Or</span>
              <Button as={Link} to="/register">Sign-Up</Button>
              </div>
            </Box>
          </Box>
        )
      }
    />
  );
};

export default PrivateRoute;
