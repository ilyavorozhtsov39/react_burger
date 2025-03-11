import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from "./ingredients-slice"
import { burgerSlice } from "./burger-slice"
import { orderSlice } from "./order-info-slice"
import { ingredientInfoSlice } from "./ingredient-info-slice"
import { userSlice } from "./user-slice"

export const rootReducer = combineSlices(ingredientsSlice, burgerSlice, orderSlice, ingredientInfoSlice, userSlice)