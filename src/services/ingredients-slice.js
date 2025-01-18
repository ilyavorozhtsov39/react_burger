import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from "../api/get-data.js"
import { v4 as uuidv4 } from 'uuid';

const getIngredients = createAsyncThunk(
    "ingredients/getIngredients", 
    async () => {
        try {
            const data = await getData();
            const dataWithKeys = data.map(item => ({ ...item, key: uuidv4()}))
            return dataWithKeys;
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