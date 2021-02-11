
import { LOGIN_USER, LOGOUT_USER } from "./user.types";

export const loginAction = (payload) => ({
    type: LOGIN_USER,
    payload
})

export const logoutAction = () => ({
    type: LOGOUT_USER
})