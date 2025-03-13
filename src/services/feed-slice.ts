import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFeedUpdatedOrder } from '../utils/types';

const initialState: { orders: Array<IFeedUpdatedOrder> } = {
    orders: []
}

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<Array<IFeedUpdatedOrder>>) {
            state.orders = action.payload;
        }
    }
})

const { setOrders } = feedSlice.actions;

export {  feedSlice, setOrders }