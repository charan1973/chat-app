import axios from "axios"

const userURL = "/api/user"

export const getJoinedServers = () => {
    return axios.get(`${userURL}/get-user-joined-servers`)
            .catch(err => console.log(err))
}

export const setActiveServer = (joinedServers, serverId) => {
    return joinedServers.filter(server => server.from_server.id === serverId)[0]
}