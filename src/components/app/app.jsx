import Main from '../../pages/main/main.jsx';
import Login from '../../pages/login/login.jsx';
import Register from '../../pages/register/register.jsx';
import ForgotPassword from '../../pages/forgot-password/forgot-password.jsx';
import ResetPassword from '../../pages/reset-password/reset-paassword.jsx';
import Profile from '../../pages/profile/profile.jsx';
import Ingredient from '../../pages/ingredient/ingredient.jsx';
import { Box } from "@ya.praktikum/react-developer-burger-ui-components"
import AppHeader from '../app-header/app-header';
import styles from "./app.module.scss";
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../../services/index.js';
import { Provider } from "react-redux"
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedPage from '../protected-page/protected-page.jsx';
import  { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../services/user-slice.js"
import { getIngredients } from "../../services/ingredients-slice.js"


function App() {

  const { ingredientsList } = useSelector(state => state.ingredients)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser())
    dispatch(getIngredients())
  }, [])

  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Main ingredientsList={ingredientsList} />} />
          <Route path="/login" element={<ProtectedPage type="auth" element={<Login />} />} />
          <Route path="/register" element={<ProtectedPage type="auth" element={<Register />} />} />
          <Route path="/forgot-password" element={<ProtectedPage type="auth" element={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<ProtectedPage type="auth" element={<ResetPassword />} />} />
          <Route path="/profile" element={<ProtectedPage type="unauth" element={<Profile />} />} />
          <Route path="/ingredients/:id" element={<Ingredient />} />
        </Routes>
      </Router>
    </div>
  );
}


function AppWrapper() {

  const store = configureStore({
    reducer: rootReducer,
    devTools: true
  })

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper;
