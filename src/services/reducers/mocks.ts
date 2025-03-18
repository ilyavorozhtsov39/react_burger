import type { IIngredient, IIngredientWithUUID, IOrdersData } from "../../utils/types"

export const ingredientMock: IIngredientWithUUID = {
    _id: "123",
    name: "name",
    type: "sauce",
    proteins: 11,
    fat: 12,
    carbohydrates: 13,
    calories: 14,
    price: 100,
    image: "img",
    image_mobile: "img-mob",
    image_large: "img-large",
    __v: 1,
    uniqueId: "321"
}

export const ingredientWithoutUUIDMock: IIngredient = {
    _id: "123",
    name: "name",
    type: "sauce",
    proteins: 11,
    fat: 12,
    carbohydrates: 13,
    calories: 14,
    price: 100,
    image: "img",
    image_mobile: "img-mob",
    image_large: "img-large",
    __v: 1
}

export const ordersData: IOrdersData = {
    orders: [],
    total: "12",
    totalToday: "12",
    working: [1 ,2],
    ready: [1, 2],
    success: true
}