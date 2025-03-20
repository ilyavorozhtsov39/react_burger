export function checkResponse(response: Response): Promise<any> {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`Ошибка ${response.status}`);
    }
}