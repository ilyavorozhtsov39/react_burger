import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from "./reducers/ingredients-slice"
import { burgerSlice } from "./reducers/burger-slice"
import { orderSlice } from "./reducers/order-info-slice"
import { ingredientInfoSlice } from "./reducers/ingredient-info-slice"
import { userSlice } from "./reducers/user-slice"
import { feedSlice } from "./reducers/feed-slice"
import { websocketSlice } from "./reducers/websocket-slice"

export const rootReducer = combineSlices(ingredientsSlice, burgerSlice, orderSlice, ingredientInfoSlice, userSlice, feedSlice, websocketSlice)

export type RootState = ReturnType<typeof rootReducer>