async function getData() {
    try {
        const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
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