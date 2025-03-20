import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getData } from "../../api/get-data"
import { v4 as uuidv4 } from 'uuid';
import { IIngredient, IIngredientWithUUID } from '../../utils/types';


type TIngredients = {
    ingredientsList: Array<IIngredientWithUUID>
}

const getIngredients = createAsyncThunk<Array<IIngredient>>(
    "ingredients/getIngredients", 
    async () => {
        const data = await getData();
        return data;
    }
)

export const initialState: TIngredients = {
    ingredientsList: []
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        saveIngredients: {
            reducer: (state, action: PayloadAction<Array<IIngredientWithUUID>>) => {
                state.ingredientsList = action.payload;
              },
            prepare: (data) => {
                const updated = data.payload.map((item: IIngredient) => ({ ...item, uniqueId: uuidv4()  }))
                return { payload: updated }
            }
        }
    },
    selectors: {
        getIngredientsList: state => state.ingredientsList
    }
})

const { saveIngredients } = ingredientsSlice.actions;
const { getIngredientsList } = ingredientsSlice.selectors;

export { getIngredients, saveIngredients, ingredientsSlice, getIngredientsList }