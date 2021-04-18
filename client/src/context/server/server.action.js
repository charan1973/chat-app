import { SET_JOINED_SERVERS, SET_ACTIVE_SERVER, SET_ACTIVE_CHANNEL, UPDATE_JOINED_SERVERS } from "./server.types";

export const setJoinedServers = (payload) => ({
    type: SET_JOINED_SERVERS,
    payload
})

export const setActiveServerAction = (payload) => ({
    type: SET_ACTIVE_SERVER,
    payload
})

export const setActiveChannelAction = (payload) => ({
    type: SET_ACTIVE_CHANNEL,
    payload
})

export const updateJoinedServersData = () => ({
    type: UPDATE_JOINED_SERVERS
})