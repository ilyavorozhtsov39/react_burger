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
        },
        sortIngredients: (state, action) => {
            const { position, dropIndex, index } = action.payload;
            const copy = [ ...state.burgerList ]
            const element = copy.splice(index, 1, "placeholder")[0]

            if (dropIndex === index) {
                copy.splice(index, 0, element)
            } else if (position === "bottom") {
                copy.splice((dropIndex + 1), 0, element)
            } else if (position === "top") {
                copy.splice(dropIndex, 0, element)
            }

            const filtered = copy.filter(item => item !== "placeholder")
            state.burgerList = filtered
        }
    },
})

const { addIngredient, removeIngredient, sortIngredients } = burgerSlice.actions;

export { burgerSlice, addIngredient, removeIngredient, sortIngredients }