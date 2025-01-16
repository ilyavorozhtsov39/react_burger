import { BASE_URL } from "../utils/constants.js"

async function getData() {
    const response = await fetch(BASE_URL);
    const result = await response.json();
    return result.data;
}

export { getData }