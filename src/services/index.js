import { combineSlices } from '@reduxjs/toolkit'
import { ingredientsSlice } from "./ingredients.js"

export const rootReducer = combineSlices(ingredientsSlice)