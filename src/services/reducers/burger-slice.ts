import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { IIngredientWithUUID } from '../../utils/types';

type TBurger = {
    burgerList: Array<IIngredientWithUUID>,
    bun: IIngredientWithUUID | {},
    bunSelected: boolean
}


export const initialState: TBurger = {
    burgerList: [],
    bunSelected: false,
    bun: {},
}

const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<IIngredientWithUUID>) => {
                if (action.payload.type === "bun") {
                    state.bun = action.payload
                    state.bunSelected = true
                } else {
                    state.burgerList.push(action.payload)
                }
            },
            prepare: (item) => {
                const updated = { ...item, uniqueId: uuidv4() };
                return { payload: updated };
            }
        },
        removeIngredient: (state, action: PayloadAction<{ index: number }>) => {
            const copy = [ ...state.burgerList ]
            copy.splice(action.payload.index, 1)
            state.burgerList = copy
        },
        sortIngredients: (state, action: PayloadAction<{ position: number, index: number }>) => {
            const { position, index } = action.payload;
            const copy = [ ...state.burgerList ] as Array<IIngredientWithUUID | string>
            const element = copy.splice(index, 1, "placeholder")[0]
            copy.splice(position, 0, element)
            const filtered = copy.filter(item => item !== "placeholder") as Array<IIngredientWithUUID>
            state.burgerList = filtered
        }
    }
})

const { addIngredient, removeIngredient, sortIngredients } = burgerSlice.actions;

export { burgerSlice, addIngredient, removeIngredient, sortIngredients }