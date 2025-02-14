import { BASE_URL } from "../utils/constants.js"

async function register(data) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

async function login(data) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

async function getUserInfo(token) {
    const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })
    const result = await response.json();
    return result;
}

async function refreshToken(token) {
    const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: `${token}` })
    })
    const result = await response.json();
    return result;
}

async function resetPassword(data) {
    const response = await fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

async function setNewPassword(data) {
    const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

export { register, login, getUserInfo, refreshToken, resetPassword, setNewPassword }