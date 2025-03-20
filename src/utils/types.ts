interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

interface IUser {
    user: {
        email: string,
        name: string,
    },
    isAuth: boolean,
    loaded: boolean
}

interface IIngredientWithUUID extends IIngredient {
    uniqueId: string
}

interface IFeedOrder {
    createdAt: string,
    ingredients: Array<string>,
    number: number,
    status: string,
    updatedAt: string,
    name: string,
    _id: string
}

interface ISocketOrdersData {
    orders: Array<IFeedOrder>,
    total: number,
    totalToday: number,
    success: boolean
}

interface IFeedUpdatedOrder extends IFeedOrder {
    updatedIngredients: Array<IIngredientWithUUID>,
    price: number,
    date: string,
    uniqueId: string
}

interface IOrdersData {
    orders: Array<IFeedUpdatedOrder>,
    total: string,
    totalToday: string,
    working: Array<number> ,
    ready: Array<number>,
    success: boolean
}

export type { IIngredient, IIngredientWithUUID, IUser, IFeedOrder, IFeedUpdatedOrder, IOrdersData, ISocketOrdersData }