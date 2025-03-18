import { feedSlice, setOrders, clearOrders, initialState } from './feed-slice'
import { ordersData } from './mocks'

describe('redux store and action', () => {
    it('should set orders data', () => {
        expect(feedSlice.reducer(initialState, { type: setOrders.type, payload: ordersData})).toEqual({
            ...initialState, ordersData
        })
    }),
    it('should clear orders data', () => {
        expect(feedSlice.reducer({ ...initialState, ordersData: ordersData }, { type: clearOrders.type })).toEqual(initialState)
    })
})