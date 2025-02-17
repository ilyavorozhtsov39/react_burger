import { BASE_URL } from "../utils/constants.js"
import { checkResponse } from "../utils/checks.js";

async function register(data) {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function login(data) {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function getUserInfo(token) {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    }).then(checkResponse).then(result => result)
}

async function changeUserInfo(data, token) {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function refreshToken(token) {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: `${token}` })
    }).then(checkResponse).then(result => result)
}

async function resetPassword(data) {
    return fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function setNewPassword(data) {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(checkResponse).then(result => result)
}

async function logout(token) {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: `${token}` })
    }).then(checkResponse).then(result => result)
}

export { register, login, logout, getUserInfo, refreshToken, resetPassword, setNewPassword, changeUserInfo }