import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { login, logout, register, getUserInfo, refreshToken, changeUserInfo } from "../api/user"
import { setCookie, getCookie, deleteCookie } from './cookies';

type TLogin = {
    email: string,
    password: string
}

type TUserData = {
    email: string,
    password: string,
    name: string
}

type TModifyData = {
    name: string,
    login: string,
    password: string
}

type TResponse = {
    success: boolean,
    user: {
        email: string,
        name: string
    }
}

type TUserInfo = {
    email: string,
    name: string,
}

type TState = {
    user: {
        email: string,
        name: string
    },
    isAuth: boolean,
    loaded: boolean
}

type TLoginResponse = {
    success: boolean,
    user: TUserInfo,
    accessToken: string,
    refreshToken: string
}

type TGetUserResponse = {
    success: boolean,
    user: TUserInfo,
}


const loginUser = createAsyncThunk<TLoginResponse, TLogin>(
    "user/loginUser", 
    async (data: TLogin) => {
        const result = await login(data);
        return result;
    }
)

const registerUser = createAsyncThunk<TResponse, TUserData>(
    "user/registerUser", 
    async (data: TUserData) => {
        const result = await register(data);
        return result;
    }
)

const setUser = createAsyncThunk<TGetUserResponse>(
    "user/setUser", 
    async () => {
        let token = getCookie("accessToken");
        if (!token) {
            const refreshTokenValue = getCookie("refreshToken") as string;
            const result = await refreshToken(refreshTokenValue);
            if (result.success) {
                token = result.accessToken as string;
                setCookie("accessToken", token, { path: "/", expires: 1200 });
            }
        }
        const result = await getUserInfo(token as string);
        return result;
    }
)

const modifyUser = createAsyncThunk<TGetUserResponse, TModifyData>(
    "user/modifyUser",
    async (data: TModifyData) => {
        let token = getCookie("accessToken");
        if (!token) {
            const refreshTokenValue = getCookie("refreshToken") as string;
            const result = await refreshToken(refreshTokenValue);
            if (result.success) {
                token = result.accessToken as string;
                setCookie("accessToken", token, { path: "/", expires: 1200 });
            }
        }

        const result = await changeUserInfo(data, token as string);
        return result;
    }
)

const logoutUser = createAsyncThunk<{ success: boolean }>(
    "user/logoutUser", 
    async () => {
        const token = getCookie("refreshToken");
        const result = await logout(token as string);
        return result;
    }
)

const initialState: TState = {
    user: {
        email: "",
        name: ""
    },
    isAuth: false,
    loaded: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<TGetUserResponse>) => {
            console.log("Register result: " , action.payload)
        })
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<TLoginResponse>) => {
            console.log("Login result: " , action.payload)
            const response = action.payload;
            setCookie("refreshToken", response.refreshToken, { path: "/", expires: 3600 });
            setCookie("accessToken", response.accessToken, { path: "/", expires: 1200 });
        })
        builder.addCase(setUser.fulfilled, (state, action: PayloadAction<TGetUserResponse>) => {
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
        builder.addCase(logoutUser.fulfilled, (state, action: PayloadAction<{ success: boolean }>) => {
            console.log("Logout result: " , action.payload)
            state.user = { name: "", email: "" };
            state.isAuth = false;
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
        })
        builder.addCase(modifyUser.fulfilled, (state, action: PayloadAction<TGetUserResponse>) => {
            console.log("Modify user result: ", action.payload)
        })
    }
})

export { loginUser, logoutUser, registerUser, setUser, modifyUser, userSlice }