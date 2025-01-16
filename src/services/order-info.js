import { createSlice } from '@reduxjs/toolkit'


const orderSlice = createSlice({
    name: 'order',
    initialState: { price: 0 },
    reducers: {
        updatePrice: (state, action) => {
            state.price = action.payload
        }
    }
})

const { updatePrice } = orderSlice.actions


export { updatePrice, orderSlice }