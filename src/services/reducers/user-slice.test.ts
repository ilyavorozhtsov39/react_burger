import { initialState, loginUser, logoutUser, registerUser, setUser, modifyUser, userSlice } from './user-slice'

describe('redux store and actions', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: '',
        });
    });
    it('check initialization', () => {
        const state = userSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    }),
    it('check register user case', () => {      
        expect(userSlice.reducer(initialState, { type: registerUser.fulfilled.type })).toEqual(initialState)
    }),
    it('check modify user case', () => {      
        expect(userSlice.reducer(initialState, { type: modifyUser.fulfilled.type })).toEqual(initialState)
    }),
    it('check if user is saved to state', () => {
        const payload = {
            success: true,
            user: { name: 'John Doe', email: 'john.doe@example.com' },
            accessToken: 'mocked-access-token',
            refreshToken: 'mocked-refresh-token',
        };
        
        expect(userSlice.reducer(initialState, { type: setUser.fulfilled.type, payload })).toEqual({
            loaded: true, user: payload.user, isAuth: true
        })
    }),
    it('check state after get user request is unsuccessful', () => {
        const payload = {
            success: false
        }
        expect(userSlice.reducer(initialState, { type: setUser.fulfilled.type, payload })).toEqual({
            ...initialState, loaded: true, isAuth: false
        })
    }),
    it('check login user case', () => {
        const payload = {
            success: true,
            user: { name: 'John Doe', email: 'john.doe@example.com' },
            accessToken: 'mocked-access-token',
            refreshToken: 'mocked-refresh-token',
        };
        expect(userSlice.reducer(initialState, { type: loginUser.fulfilled.type, payload })).toEqual(initialState)
    }),
    it('check is user is logged out', () => { 
        const userData = { name: 'John Doe', email: 'john.doe@example.com' }; 
        expect(userSlice.reducer({ ...initialState, user: userData, isAuth: true }, { type: logoutUser.fulfilled.type })).toEqual(initialState)
    })
});

// Существует проблема с проверкой установки и удаления куков: при установке сохраняется только одна кука, при удалении кука возникникает из неоткуда без предварительной ее установки. Скорее всего, связано с моковым окружением. Не уверен, что это нужно тестировать.