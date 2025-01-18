import { BASE_URL } from "../utils/constants.js"

async function getData() {
    const response = await fetch(`${BASE_URL}/ingredients`);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }
    const result = await response.json();
    return result.data;
}

async function sendOrder(data) {
    const response = await fetch(`${BASE_URL}/orders`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json();
    return result;
}

export { getData, sendOrder }