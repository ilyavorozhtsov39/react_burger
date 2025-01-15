import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from "./ingredients.js"
import { burgerSlice } from "./burger.js"

export const rootReducer = combineSlices(ingredientsSlice, burgerSlice)