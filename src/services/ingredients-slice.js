import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from "../api/get-data.js"
import { v4 as uuidv4 } from 'uuid';

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
        saveIngredients: {
            reducer: (state, action) => {
                state.ingredientsList = action.payload;
              },
            prepare: (data) => {
                const updated = data.payload.map(item => ({ ...item, key: uuidv4()  }))
                return { payload: updated }
            }
        }
    }
})

const { saveIngredients } = ingredientsSlice.actions;

export { getIngredients, saveIngredients, ingredientsSlice }