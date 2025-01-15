import { BASE_URL } from "../utils/constants.js"

async function getData() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export { getData }