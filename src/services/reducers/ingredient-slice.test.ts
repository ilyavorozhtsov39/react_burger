import { initialState, ingredientsSlice, saveIngredients } from './ingredients-slice'
import { ingredientMock, ingredientWithoutUUIDMock } from './mocks'

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-unique-id'),
}));
  

describe('check ingredients in store', () => {
    it('should set ingredients to store', () => {
        expect(ingredientsSlice.reducer(initialState, { type: saveIngredients.type, payload: [ingredientMock] })).toEqual({
            ingredientsList: [ingredientMock],
        })
    });
    it('should correctly add uniqueId using prepare', () => {
        const action = saveIngredients({ payload: [ingredientWithoutUUIDMock] });
    
        expect(action.payload).toEqual([
            {
                ...ingredientWithoutUUIDMock,
                uniqueId: 'mocked-unique-id',
            }
        ]);
    
        expect(ingredientsSlice.reducer(initialState, action)).toEqual({
            ingredientsList: [
                {
                    ...ingredientWithoutUUIDMock,
                    uniqueId: 'mocked-unique-id',
                }
            ],
        });
    });
})