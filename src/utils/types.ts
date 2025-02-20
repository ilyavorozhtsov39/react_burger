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

export type { IIngredient, IIngredientWithUUID, IUser }