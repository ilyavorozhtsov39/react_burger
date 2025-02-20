export function checkResponse(response: any) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`Ошибка ${response.status}`);
    }
}