import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from "../api/get-data.js"

const getIngredients = createAsyncThunk(
    "ingredients/getIngredients", 
    async () => {
        const data = await getData();
        return data;
    }
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: { ingredientsList: [] },
    reducers: {
        saveIngredients: (state, action) => {
            state.ingredientsList = action.payload;
        }
    }
})

const { saveIngredients } = ingredientsSlice.actions;

export { getIngredients, saveIngredients, ingredientsSlice }