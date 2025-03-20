

const BASE_URL = 'https://norma.nomoreparties.space/api'

const SOCKET_URL = 'wss://norma.nomoreparties.space/orders'

const ingredientTemplate = {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
    uniqueId: ""
}

export { BASE_URL, SOCKET_URL, ingredientTemplate }