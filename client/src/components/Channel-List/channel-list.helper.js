import axios from "axios"

const API = "/api/"

export const updateServer = (serverId, server) => {
    return axios.put(`${API}/server/update/${serverId}`, server)
            .catch(err => console.log(err))
}

export const createGroup = ({groupName, serverId}) => {
    return axios.post(`${API}/group/create`, {groupName, serverId})
            .catch(err => console.log(err))
}