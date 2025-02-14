import Main from '../../pages/main/main.jsx';
import Login from '../../pages/login/login.jsx';
import Register from '../../pages/register/register.jsx';
import ForgotPassword from '../../pages/forgot-password/forgot-password.jsx';
import Profile from '../../pages/profile/profile.jsx';
import Ingredient from '../../pages/ingredient/ingredient.jsx';
import { Box } from "@ya.praktikum/react-developer-burger-ui-components"
import AppHeader from '../app-header/app-header';
import styles from "./app.module.scss";
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../../services/index.js';
import { Provider } from "react-redux"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
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
