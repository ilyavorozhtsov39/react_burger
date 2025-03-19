import { initialState, loginUser, setUser, userSlice } from './user-slice'

describe('redux store and actions', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: '',
        });
    });
    it('check if state is updated correcly', () => {
        const payload = {
            success: true,
            user: { name: 'John Doe', email: 'john.doe@example.com' },
            accessToken: 'mocked-access-token',
            refreshToken: 'mocked-refresh-token',
        };
        
        expect(userSlice.reducer(initialState, { type: setUser.fulfilled.type, payload })).toEqual({
            loaded: true, user: payload.user, isAuth: true
        })
    })
    it('should set a cookie when loginUser is dispatched', () => {
        const payload = {
            success: true,
            user: { name: 'John Doe', email: 'john.doe@example.com' },
            accessToken: 'mocked-access-token',
            refreshToken: 'mocked-refresh-token',
        };

        const action = loginUser.fulfilled(payload, '', { email: 'john.doe@example.com', password: 'password123' });
        userSlice.reducer(initialState, action);
        expect(document.cookie).toContain('accessToken=mocked-access-token');
    });
});