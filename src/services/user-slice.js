import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, logout, register, getUserInfo, refreshToken, changeUserInfo } from "../api/user.js"
import { setCookie, getCookie, deleteCookie } from './cookies.js';


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

const setUser = createAsyncThunk(
    "user/setUser", 
    async () => {
        let token = getCookie("accessToken");
        if (!token) {
            const refreshTokenValue = getCookie("refreshToken");
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

const modifyUser = createAsyncThunk(
    "user/modifyUser",
    async (data) => {
        try {
            const token = getCookie("accessToken");
            if (!token) {
                const refreshTokenValue = getCookie("refreshToken");
                const result = await refreshToken(refreshTokenValue);
                if (result.success) {
                    token = result.accessToken;
                    setCookie("accessToken", token, { path: "/", expires: 1200 });
                }
            }
            const result = await changeUserInfo(data, token);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
)

const logoutUser = createAsyncThunk(
    "user/logoutUser", 
    async () => {
        try {
            const token = getCookie("refreshToken");
            const result = await logout(token);
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
        isAuth: false,
        loaded: false
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log("REG SL: " , action.payload)
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log("LOG SL: " , action.payload)
            const response = action.payload;
            setCookie("refreshToken", response.refreshToken, { path: "/", expires: 3600 });
            setCookie("accessToken", response.accessToken, { path: "/", expires: 1200 });
        })
        builder.addCase(setUser.fulfilled, (state, action) => {
            state.loaded = true
            if (action.payload.success) {
                console.log("User found")
                state.user = action.payload.user;
                state.isAuth = true;
            } else {
                console.log("User not found")
                state.isAuth = false;
            }
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            console.log("Logout result: " , action.payload)
            state.user = { name: "", email: "" };
            state.isAuth = false;
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
        })
        builder.addCase(modifyUser.fulfilled, (state, action) => {
            console.log("Modify user result: ", action.payload)
            // state.user = action.payload.user;
        })
    }
})

export { loginUser, logoutUser, registerUser, setUser, modifyUser, userSlice }