import { initialState, burgerSlice, addIngredient, removeIngredient, sortIngredients } from './burger-slice'
import { IngredientMock } from './mocks'

describe('redux store and actions', () => {
    it('should return initial state', () => {
        expect(burgerSlice.reducer(undefined, {type: addIngredient.type, payload: IngredientMock})).toEqual({
            ...initialState, bunSelected: true, bun: IngredientMock
        })
    })
})