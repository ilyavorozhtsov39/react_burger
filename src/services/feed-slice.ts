import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFeedUpdatedOrder, IOrdersData } from '../utils/types';

type FeedState = {
    ordersData: IOrdersData | null
}

const initialState: FeedState = {
    ordersData: null
}

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<IOrdersData>) {
            state.ordersData = action.payload;
        }
    },
    selectors: {
        getUpdatedOrders: state => state.ordersData
    }
})

const { setOrders } = feedSlice.actions;
const { getUpdatedOrders } = feedSlice.selectors;

export {  feedSlice, setOrders, getUpdatedOrders }