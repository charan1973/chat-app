import React, { createContext, useEffect, useReducer } from "react";
import { loginAction } from "./user.action";
import userReducer from "./user.reducer";
import { authenticateUser } from "./user.utils";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, {
    email: "",
    name: "",
    id: "",
    user_image_url: ""
  });

  useEffect(() => {
    authenticateUser().then(({ data }) => {
      if (data.user) {
        userDispatch(loginAction(data.user));
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
