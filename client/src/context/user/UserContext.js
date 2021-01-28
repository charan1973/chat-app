import React, { createContext, useReducer } from 'react';
import userReducer from './user.reducer';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, userDispatch] = useReducer(userReducer, {})

    return (
        <UserContext.Provider value={{user, userDispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;