import { initialState, websocketSlice, wsClose, wsMessage } from './websocket-slice'
import { socketOrdersData } from './mocks'

describe('redux store and actions', () => {
    it('check if the status if updated', () => {
        expect(websocketSlice.reducer(initialState, { type: wsClose.type })).toEqual({
            ...initialState, status: 'OFFLINE'
        })
    });
    it('check if the state if updated', () => {
        expect(websocketSlice.reducer(initialState, { type: wsMessage.type, payload: socketOrdersData })).toEqual({
            ...initialState, orders: socketOrdersData
        })
    })
})