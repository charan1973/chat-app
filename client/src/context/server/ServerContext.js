import { createContext, useContext, useEffect, useReducer } from "react";
import { UserContext } from "../user/UserContext";
import { getJoinedServers } from "./server.utils";
import serverReducer from "./server.reducer";
import { setJoinedServers } from "./server.action";

export const ServerContext = createContext();

const ServerContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [server, serverDispatch] = useReducer(
    serverReducer,
    {
      joinedServers: [],
      activeServer: {},
      activeChannel: {},
      update: false
    }
  );

  useEffect(() => {
    if (user.id) {
      getJoinedServers().then(({ data }) => {
        if (data.servers) {
          serverDispatch(setJoinedServers(data.servers));
        }
      });
    }
  }, [user, server.update]);

  return (
    <ServerContext.Provider value={{ server, serverDispatch }}>
      {children}
    </ServerContext.Provider>
  );
};

export default ServerContextProvider;
