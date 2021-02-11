import ServerContextProvider from "./server/ServerContext";
import UserContextProvider from "./user/UserContext";

const RootContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <ServerContextProvider>{children}</ServerContextProvider>
    </UserContextProvider>
  );
};
export default RootContextProvider;
