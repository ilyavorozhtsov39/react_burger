import { initialState, websocketSlice, wsConnecting, wsClose, wsError, wsMessage, wsOpen, wsClearOrders } from './websocket-slice'
import { socketOrdersData } from './mocks'

describe('redux store and actions', () => {
    it('check initialization', () => {
        const state = websocketSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    }),
    it('check updating connecting status', () => {
        expect(websocketSlice.reducer(initialState, { type: wsConnecting.type })).toEqual({
            ...initialState, status: 'CONNECTING...'
        })
    }),
    it('check updating open status', () => {
        expect(websocketSlice.reducer(initialState, { type: wsOpen.type })).toEqual({
            ...initialState, status: 'ONLINE', error: null
        })
    }),
    it('check updating offline status', () => {
        expect(websocketSlice.reducer(initialState, { type: wsClose.type })).toEqual({
            ...initialState, status: 'OFFLINE'
        })
    }),
    it('check setting error', () => {
        expect(websocketSlice.reducer(initialState, { type: wsError.type, payload: 'error' })).toEqual({
            ...initialState, error: 'error'
        })
    }),
    it('check saving orders to store', () => {
        expect(websocketSlice.reducer(initialState, { type: wsMessage.type, payload: socketOrdersData })).toEqual({
            ...initialState, orders: socketOrdersData
        })
    }),
    it('check removing orders from store', () => {
        expect(websocketSlice.reducer({ ...initialState, orders: socketOrdersData }, { type: wsClearOrders.type, payload: socketOrdersData })).toEqual({
            ...initialState, orders: null
        })
    })
})