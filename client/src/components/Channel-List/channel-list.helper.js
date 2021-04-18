import axios from "axios"

const serverAPI = "/api/server"

export const updateServer = (serverId, server) => {
    console.log(server);
    return axios.put(`${serverAPI}/update/${serverId}`, server)
            .catch(err => console.log(err))
}