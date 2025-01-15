import { createSlice } from '@reduxjs/toolkit'



const burgerSlice = createSlice({
    name: 'burger',
    initialState: { burgerList: [], bunSelected: false, bun: {} },
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === "bun") {
                state.bun = action.payload
                state.bunSelected = true
            } else {
                state.burgerList.push(action.payload)
            }
        },
        removeIngredient: (state, action) => {
            state.burgerList.splice(action.payload.index, 1)
        }
    },
})

const { addIngredient, removeIngredient } = burgerSlice.actions;

export { burgerSlice, addIngredient, removeIngredient }