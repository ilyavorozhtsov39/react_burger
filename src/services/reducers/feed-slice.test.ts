import { feedSlice, setOrders, setPersonalOrders, clearOrders, clearPersonalOrders, initialState } from './feed-slice'
import { ordersData } from './mocks'

describe('redux store and action', () => {
    it('check initialization', () => {
        const state = feedSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    }),
    it('should set orders data', () => {
        expect(feedSlice.reducer(initialState, { type: setOrders.type, payload: ordersData})).toEqual({
            ...initialState, ordersData
        })
    }),
    it('should set personalOrders data', () => {
        expect(feedSlice.reducer(initialState, { type: setPersonalOrders.type, payload: ordersData})).toEqual({
            ...initialState, personalOrdersData: ordersData
        })
    }),
    it('should clear orders data', () => {
        expect(feedSlice.reducer({ ...initialState, ordersData: ordersData }, { type: clearOrders.type })).toEqual(initialState)
    }),
    it('should clear personalOrders data', () => {
        expect(feedSlice.reducer({ ...initialState, personalOrdersData: ordersData }, { type: clearPersonalOrders.type })).toEqual(initialState)
    })
})