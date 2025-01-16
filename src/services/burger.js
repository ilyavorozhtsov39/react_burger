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
            console.log(filtered)
            state.burgerList = filtered
        }
    },
})

const { addIngredient, removeIngredient, sortIngredients } = burgerSlice.actions;

export { burgerSlice, addIngredient, removeIngredient, sortIngredients }