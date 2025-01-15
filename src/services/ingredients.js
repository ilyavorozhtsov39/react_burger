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
    extraReducers: (builder) => {
        builder.addCase(getIngredients.fulfilled, (state, action) => {
            state.ingredientsList = action.payload; 
        })
    }
})

// const ingredientsSlice = createSlice({
//     name: 'ingredients',
//     initialState: [],
//     reducers: {
//         changeIngredients: (state, action) => {
//             state.ingredients = action.payload;
//         }
//     },
// })

export { getIngredients, ingredientsSlice }