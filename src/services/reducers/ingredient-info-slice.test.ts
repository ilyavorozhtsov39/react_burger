import { initialState, ingredientInfoSlice, addIngredientInfo, removeIngredientInfo } from './ingredient-info-slice'
import { ingredientMock } from './mocks'

describe('ingredient-info-slice', () => {
    it('check initialization', () => {
        const state = ingredientInfoSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    }),
    it('should add ingredient info to state', () => {
        expect(ingredientInfoSlice.reducer(initialState, { type: addIngredientInfo.type, payload: ingredientMock })).toEqual({
            ingredientInfo: ingredientMock, infoStored: true
        })
    }),
    it('should remove ingredient info from state', () => {
        expect(ingredientInfoSlice.reducer(initialState, { type: removeIngredientInfo.type })).toEqual({
            ingredientInfo: {}, infoStored: false
        })
    })
})