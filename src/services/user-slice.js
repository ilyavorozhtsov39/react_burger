import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, register, getUserInfo, refreshToken } from "../api/user.js"
import { setCookie, getCookie } from './cookies.js';

const loginUser = createAsyncThunk(
    "user/loginUser", 
    async (data) => {
        try {
            const result = await login(data);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
)

const registerUser = createAsyncThunk(
    "user/registerUser", 
    async (data) => {
        try {
            const result = await register(data);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
)

const getUser = createAsyncThunk(
    "user/getUser", 
    async () => {
        let token = getCookie("accessToken");
        if (!token) {
            const refreshTokenValue = getCookie("refreshToken");
            // console.log("REF: ", refreshTokenValue)
            const result = await refreshToken(refreshTokenValue);
            if (result.success) {
                token = result.accessToken;
                setCookie("accessToken", token, { path: "/", expires: 1200 });
            }
        }
        // console.log(token)
        try {
            const result = await getUserInfo(token);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: { 
        user: {
            email: "",
            name: ""
        },
        isAuth: false
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log("REG SL: " , action.payload)
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log("LOG SL: " , action.payload)
            if (action.payload.success) {
                const response = { ...action.payload };
                delete response.success;
                state = { ...state, user: response.user, isAuth: true };
                setCookie("refreshToken", response.refreshToken, { path: "/", expires: 3600 });
                setCookie("accessToken", response.accessToken, { path: "/", expires: 1200 });
            }

            // setTimeout(() => {
            //     console.log(action.payload, state)
            // })
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            console.log("Get user successful: " , action.payload)
        })
    }
})

export { loginUser, registerUser, getUser, userSlice }