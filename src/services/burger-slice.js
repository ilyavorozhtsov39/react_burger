import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';


const burgerSlice = createSlice({
    name: 'burger',
    initialState: { burgerList: [], bunSelected: false, bun: {} },
    reducers: {
        addIngredient: {
            reducer: (state, action) => {
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
        removeIngredient: (state, action) => {
            const copy = [ ...state.burgerList ]
            copy.splice(action.payload, 1)
            state.burgerList = copy
        },
        sortIngredients: (state, action) => {
            const { position, index } = action.payload;
            const copy = [ ...state.burgerList ]
            const element = copy.splice(index, 1, "placeholder")[0]
            copy.splice(position, 0, element)
            const filtered = copy.filter(item => item !== "placeholder")
            state.burgerList = filtered
        }
    },
})

const { addIngredient, removeIngredient, sortIngredients } = burgerSlice.actions;

export { burgerSlice, addIngredient, removeIngredient, sortIngredients }