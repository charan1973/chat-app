import axios from "axios"

const authURL = "/api/auth"

export const signIn = (form) => {
    return axios.post(`${authURL}/signin`, {...form})
            .catch(err => console.log(err))
}

export const register = (form) => {
    return axios.post(`${authURL}/register`, {...form})
            .catch(err => console.log(err))
}