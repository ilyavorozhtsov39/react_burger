import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendOrder } from "../api/get-data.js"

const sendOrgerInfo = createAsyncThunk(
    "order/sendOrgerInfo", 
    async (data) => {
        try {
            const result = await sendOrder(data);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: { price: 0, idList: [], orderInfo: { success: false } },
    reducers: {
        updatePrice: (state, action) => {
            state.price = action.payload
        },
        updateIdList: (state, action) => {
            state.idList = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendOrgerInfo.fulfilled, (state, action) => {
            state.orderInfo = action.payload; 
        })
    }
})

const { updatePrice, updateIdList } = orderSlice.actions


export { updatePrice, orderSlice, updateIdList, sendOrgerInfo }