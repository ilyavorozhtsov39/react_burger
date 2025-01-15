import React, { useEffect, useState } from 'react';
import { Box } from "@ya.praktikum/react-developer-burger-ui-components"
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from "./app.module.scss";
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from "react-redux"
import { getIngredients } from "../../services/ingredients.js"
import { rootReducer } from '../../services/index.js';

function App() {

  const {ingredientsList} = useSelector(state => state.ingredients)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [ingredientsList])

  return (
    <div className={styles.app}>
      <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients data={ingredientsList} />
          <BurgerConstructor data={ingredientsList} />
        </main>
    </div>
  );
}



function AppWrapper() {

  const store = configureStore({
    reducer: rootReducer
  })

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper;
