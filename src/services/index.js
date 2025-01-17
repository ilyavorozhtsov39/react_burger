import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from "./ingredients-slice.js"
import { burgerSlice } from "./burger-slice.js"
import { orderSlice } from "./order-info-slice.js"
import { ingredientInfoSlice } from "./ingredient-info-slice.js"

export const rootReducer = combineSlices(ingredientsSlice, burgerSlice, orderSlice, ingredientInfoSlice)