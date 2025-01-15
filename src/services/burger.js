import { createSlice } from '@reduxjs/toolkit'



const burgerSlice = createSlice({
    name: 'burger',
    initialState: { burgerList: [], bunSelected: false, bun: {} },
    reducers: {
        addIngredient: (state, action) => {
            console.log(action.payload)
            if (action.payload.type === "bun") {
                state.bun = action.payload
                state.bunSelected = true
            } else {
                state.burgerList.push(action.payload)
            }
        },
        removeIngredient: (state, action) => {
            const firstIndex = state.burgerList.findIndex(item => item.__id === action.payload.id)
            state.burgerList.splice(firstIndex, 1)
        }
    },
})

const { addIngredient, removeIngredient } = burgerSlice.actions;

export { burgerSlice, addIngredient, removeIngredient }