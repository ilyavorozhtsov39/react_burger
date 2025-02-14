import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, register, getUserInfo } from "../api/user.js"
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
        const token = getCookie("accessToken");
        console.log(token)
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
        accessToken: "",
        refreshToken: "",
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
            const user = { ...action.payload };
            delete user.success;
            state = { ...state, ...user, isAuth: true };
            setCookie("refreshToken", user.refreshToken, { path: "/", expires: 3600 });
            setCookie("accessToken", user.accessToken, { path: "/", expires: 1200 });
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            console.log("GET SL: " , action.payload)
        })
    }
})

export { loginUser, registerUser, getUser, userSlice }