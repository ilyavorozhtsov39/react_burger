import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
// import { LiveTable, LiveTableActions, WebsocketStatus } from "../../types/live-table"
// import { liveTableUpdate } from "./live-table-update";

//
enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}
//

export type Store = {
    status: WebsocketStatus;
    orders: any;
    error: string | null;
}

export const initialState: Store = {
    status: WebsocketStatus.OFFLINE,
    orders: {},
    error: null,
};

export const websocketSlice = createSlice({
    name: "websocket",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.error = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsMessage: (state, action: PayloadAction<Action>) => {
            state.orders = action.payload
        },
        wsClearOrders: (state) => {
            state.orders = {}
        }
    },
    selectors: {
        getStatus: state => state.status,
        getError: state => state.error,
        getOrders: state => state.orders
    }
})

export const { wsConnecting, wsClose, wsError, wsMessage, wsOpen, wsClearOrders } = websocketSlice.actions;
export const { getError, getStatus, getOrders } = websocketSlice.selectors;

type TActionCreators = typeof websocketSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;