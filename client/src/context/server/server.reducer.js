import { SET_JOINED_SERVERS, SET_ACTIVE_SERVER, SET_ACTIVE_CHANNEL, UPDATE_JOINED_SERVERS } from "./server.types";
import {setActiveServer} from "./server.utils"

const serverReducer = (state, action) => {
    switch(action.type){
        case SET_JOINED_SERVERS:
            return {
                ...state,
                joinedServers: action.payload
            }
        case SET_ACTIVE_SERVER:
            return {
                ...state,
                activeServer: setActiveServer(state.joinedServers, action.payload)
            }
        case SET_ACTIVE_CHANNEL:
            return {
                ...state,
                activeChannel: action.payload
            }
        case UPDATE_JOINED_SERVERS:
            return {
                ...state,
                update: !state.update
            }
        default:
            return state
    }
}

export default serverReducer