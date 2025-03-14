import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from "./ingredients-slice"
import { burgerSlice } from "./burger-slice"
import { orderSlice } from "./order-info-slice"
import { ingredientInfoSlice } from "./ingredient-info-slice"
import { userSlice } from "./user-slice"
import { feedSlice } from "./feed-slice"
import { websocketSlice } from "./websocket-slice"
import { ThunkDispatch } from '@reduxjs/toolkit'

export const rootReducer = combineSlices(ingredientsSlice, burgerSlice, orderSlice, ingredientInfoSlice, userSlice, feedSlice, websocketSlice)

export type RootState = ReturnType<typeof rootReducer>