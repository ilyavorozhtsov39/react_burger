import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { sendOrder } from "../api/get-data"

type TData = {
    ingredients: Array<{ [name: number]: string }>,
}

type TResponse = {
    name: string,
    success: boolean,
    order: {
        number: number
    }
}

type TState = {
    price: number,
    idList: Array<string>,
    orderInfo: {
        success: boolean
    }
}

const sendOrgerInfo = createAsyncThunk<TResponse, TData>(
    "order/sendOrgerInfo", 
    async (data: TData) => {
        const result = await sendOrder(data);
        return result;
    }
)

const initialState: TState = {
    price: 0,
    idList: [],
    orderInfo: {
        success: false
    }
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updatePrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload
        },
        updateIdList: (state, action: PayloadAction<Array<string>>) => {
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