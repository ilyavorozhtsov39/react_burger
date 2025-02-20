import { BASE_URL } from "../utils/constants"
import { checkResponse } from "../utils/checks";

type Ingredients = {
    ingredients: Array<{ [name: number]: string }>,
}

async function getData() {
    return fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse)
        .then(result => result.data);
}

async function sendOrder(data: Ingredients) {
    console.log('order: ', data)
    return fetch(`${BASE_URL}/orders`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(checkResponse).then(result => result)
}

export { getData, sendOrder }