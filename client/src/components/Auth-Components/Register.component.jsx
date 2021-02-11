import { Box, Button, Divider, Text, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginAction } from "../../context/user/user.action";
import { UserContext } from "../../context/user/UserContext";
import { register } from "../../pages/Auth/auth.helper";
import FormInput from "../FormInput/FormInput.component";

const Register = () => {
  const { userDispatch } = useContext(UserContext);

  const history = useHistory();
  const toast = useToast();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(form).then(({ data }) => {
      if (data.user) {
        userDispatch(loginAction(data.user));
        toast({
          title: "Success",
          description: "Sign up success",
          status: "success",
        });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
      }
    });
  };

  return (
    <Box
      w={["92%", "60%", "40%"]}
      h="30rem"
      bg="gray.600"
      borderRadius="10px"
      px={["20px", "50px"]}
    >
      <Text
        as="h3"
        fontSize="35px"
        textAlign="center"
        p="10px"
        fontWeight="bold"
      >
        Register
      </Text>
      <Divider />
      <form onSubmit={handleRegisterSubmit}>
        <FormInput
          name="username"
          type="text"
          placeholder="Enter your username"
          label="Username"
          _focus={{ outline: "none" }}
          onChange={handleValueChange}
        />
        <FormInput
          name="email"
          type="text"
          placeholder="Enter your email"
          label="Email"
          _focus={{ outline: "none" }}
          onChange={handleValueChange}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          _focus={{ outline: "none" }}
          onChange={handleValueChange}
        />
        <Button type="submit" w="100%" bg="blue.500">
          Register
        </Button>
      </form>
      <Text textAlign="center" mt="10px">
        Already have an account?{" "}
        <Text as={Link} color="blue.300" to="/signin">
          Login.
        </Text>
      </Text>
    </Box>
  );
};

export default Register;
