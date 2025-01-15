import { createSlice } from '@reduxjs/toolkit'



const burgerSlice = createSlice({
    name: 'burger',
    initialState: { burgerList: [] },
        reducers: {
            addIngredient: (state, action) => {
                state.burgerList.push(action.payload)
            },
            removeIngredient: (state, action) => {
                const firstIndex = state.burgerList.findIndex(item => item.__id === action.payload.id)
                state.burgerList.splice(firstIndex, 1)
            }
    },
})


export { burgerSlice }