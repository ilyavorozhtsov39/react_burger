import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredientWithUUID } from '../../utils/types';

type TIngredient = {
    ingredientInfo: IIngredientWithUUID | {},
    infoStored: boolean
}

const initialState: TIngredient = {
    ingredientInfo: {},
    infoStored: false,
}

const ingredientInfoSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        addIngredientInfo: (state, action: PayloadAction<IIngredientWithUUID>) => {
            state.ingredientInfo = action.payload;
            state.infoStored = true;
            
        },
        removeIngredientInfo: (state) => {
            state.ingredientInfo = {};
            state.infoStored = false;            
        },

    },
})

const { addIngredientInfo, removeIngredientInfo } = ingredientInfoSlice.actions;

export { ingredientInfoSlice, addIngredientInfo, removeIngredientInfo }