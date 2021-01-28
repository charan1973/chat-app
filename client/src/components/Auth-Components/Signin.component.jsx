import { Box, Button, Divider, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../pages/Auth/auth.helper";
import FormInput from "../FormInput/FormInput.component";

const SignIn = () => {
  const history = useHistory()
  const toast = useToast()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    signIn(form)
    .then(({data}) => {
        if(data.user){
            toast({
                title: "Success",
                description: "Sign in success",
                status: "success"
            })
            history.push("/")
        }else if(data.error){
            toast({
                title: "Error",
                description: data.error,
                status: "error"
            })
        }
    })
  };

  return (
    <Box
      w={["92%", "60%", "40%"]}
      h="25rem"
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
        Login
      </Text>
      <Divider />
      <form onSubmit={handleSignInSubmit}>
        <FormInput
          name="email"
          type="text"
          placeholder="Enter your email"
          label="Email"
          _focus={{ outline: "none" }}
          value={form.email}
          onChange={handleValueChange}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          _focus={{ outline: "none" }}
          value={form.password}
          onChange={handleValueChange}
        />
        <Button type="submit" w="100%" bg="blue.500">
          Login
        </Button>
      </form>
      <Text textAlign="center" mt="10px">
        No Account?{" "}
        <Text as={Link} color="blue.300" to="/register">
          Register.
        </Text>
      </Text>
    </Box>
  );
};

export default SignIn;
