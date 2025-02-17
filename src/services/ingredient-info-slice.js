import { createSlice } from '@reduxjs/toolkit'

const ingredientInfoSlice = createSlice({
    name: 'ingredient',
    initialState: { ingredientInfo: {}, infoStored: false },
    reducers: {
        addIngredientInfo: (state, action) => {
            state.ingredientInfo = action.payload;
            state.infoStored = true;
            
        },
        removeIngredientInfo: (state, action) => {
            state.ingredientInfo = {};
            state.infoStored = false;            
        },

    },
})

const { addIngredientInfo, removeIngredientInfo } = ingredientInfoSlice.actions;

export { ingredientInfoSlice, addIngredientInfo, removeIngredientInfo }