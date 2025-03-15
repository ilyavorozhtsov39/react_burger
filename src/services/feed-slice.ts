import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFeedUpdatedOrder, IOrdersData } from '../utils/types';

const initialState: { data: IOrdersData } = {
    data: {
        orders: [],
        total: "",
        totalToday: "",
        ready: [],
        working: []
    }
}

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<IOrdersData>) {
            state.data = action.payload;
        }
    }
})

const { setOrders } = feedSlice.actions;

export {  feedSlice, setOrders }