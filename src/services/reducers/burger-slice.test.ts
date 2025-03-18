import { initialState, burgerSlice, addIngredient, removeIngredient, sortIngredients } from './burger-slice'
import { ingredientMock, ingredientWithoutUUIDMock } from './mocks'

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-unique-id'),
}));

describe('redux store and actions', () => {
    it('should return state with added bun', () => {
        expect(burgerSlice.reducer(initialState, {type: addIngredient.type, payload: {...ingredientMock, type: "bun"}})).toEqual({
            ...initialState, bunSelected: true, bun: {...ingredientMock, type: "bun"}
        })
    }),
    it ('should retrun state with added non-bun ingredient', () => {
        expect(burgerSlice.reducer(initialState, {type: addIngredient.type, payload: ingredientMock})).toEqual({
            ...initialState, burgerList: [{ ...ingredientMock, type: "sauce" }]
        })
    }),
    it('should correctly add uuid', () => {
        const action = addIngredient(ingredientWithoutUUIDMock);
        expect(action.payload).toEqual({
            ...ingredientWithoutUUIDMock,
            uniqueId: 'mocked-unique-id',
        });
        expect(burgerSlice.reducer(initialState, action)).toEqual({
            ...initialState, burgerList: [{ ...ingredientWithoutUUIDMock, uniqueId: 'mocked-unique-id' }]
        })
    }),
    it('test removing ingredient', () => {
        expect(burgerSlice.reducer({ ...initialState, burgerList: [ingredientMock] }, {type: removeIngredient.type, payload: 0})).toEqual(initialState)
    }),
    it('test sorting ingredient', () => {
        const first = { ...ingredientMock, name: "first" };
        const second = { ...ingredientMock, name: "second" };
        expect(burgerSlice.reducer({ ...initialState, burgerList: [first, second] }, {type: sortIngredients.type, payload: {position: 2, index: 0}})).toEqual({
            ...initialState, burgerList: [second, first]
        })
    })
})

