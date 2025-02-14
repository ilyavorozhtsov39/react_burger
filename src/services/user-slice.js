import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, register } from "../api/user.js"

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

const userSlice = createSlice({
    name: "user",
    initialState: { 
        name: "",
        email: "",
        password: "",
        accessToken: "",
        refreshToken: "",
        isAuth: false
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log("REG SL: " , action.payload)
            // state = { ..L.state, ...action.payload }; 
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log("LOG SL: " , action.payload)
            // state = { ...state, ...action.payload }; 
        })
    }
})

export { loginUser, registerUser, userSlice }