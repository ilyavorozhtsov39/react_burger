import { initialState, updatePrice, updateIdList, orderSlice, sendOrderInfo } from './order-info-slice'

describe('redux store and actions', () => {
    it('check initialization', () => {
        const state = orderSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    }),
    it('check price update', () => {
        expect(orderSlice.reducer(initialState, { type: updatePrice.type, payload: 100 })).toEqual({
            ...initialState, price: 100
        })
    }),
    it('check idList update', () => {
        expect(orderSlice.reducer(initialState, { type: updateIdList.type, payload: ['1'] })).toEqual({
            ...initialState, idList: ['1']
        })
    }),
    it('check setting orderInfo', () => {
        const newState = { success: true, order: { number: 1}};
        expect(orderSlice.reducer(initialState, { type: sendOrderInfo.fulfilled.type, payload: newState})).toEqual({
            ...initialState, orderInfo: newState
        })
    })
})