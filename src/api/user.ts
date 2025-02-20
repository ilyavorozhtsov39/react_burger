import { BASE_URL } from "../utils/constants"
import { checkResponse } from "../utils/checks";

type UserData = {
    email: string,
    password: string,
    name: string
}

type PartialData = Omit<UserData, 'name'>
type Email = Pick<UserData, 'email'>
type PasswordReset = {
    password: string,
    token: string
}

async function register(data: UserData) {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function login(data: PartialData) {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function getUserInfo(token: string) {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    }).then(checkResponse).then(result => result)
}

async function changeUserInfo(data: UserData, token: string) {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function refreshToken(token: string) {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: `${token}` })
    }).then(checkResponse).then(result => result)
}

async function resetPassword(data: Email) {
    return fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function setNewPassword(data: PasswordReset) {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function logout(token: string) {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: `${token}` })
    }).then(checkResponse).then(result => result)
}

export { register, login, logout, getUserInfo, refreshToken, resetPassword, setNewPassword, changeUserInfo }