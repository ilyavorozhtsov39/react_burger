import { BASE_URL } from "../utils/constants.js"
import { checkResponse } from "../utils/checks.js";

async function getData() {
    return fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse)
        .then(result => result.data);
}

async function sendOrder(data) {
    return fetch(`${BASE_URL}/orders`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse).then(result => result)
}

export { getData, sendOrder }