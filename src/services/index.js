import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from "./ingredients.js"
import { burgerSlice } from "./burger.js"
import { orderSlice } from "./order-info.js"

export const rootReducer = combineSlices(ingredientsSlice, burgerSlice, orderSlice)