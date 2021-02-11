import axios from "axios"

const userURL = "/api/auth"

export const authenticateUser = () => {
    return axios.get(`${userURL}/authenticate`)
            .catch(err => console.log(err))
}