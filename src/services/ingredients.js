import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from "../api/get-data.js"

const getIngredients = createAsyncThunk(
    "ingredients/getIngredients", 
    async () => {
        try {
            const data = await getData();
            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: { ingredientsList: [] },
    extraReducers: (builder) => {
        builder.addCase(getIngredients.fulfilled, (state, action) => {
            state.ingredientsList = action.payload; 
        })
    }
})


export { getIngredients, ingredientsSlice }