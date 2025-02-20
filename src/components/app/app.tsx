import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
// import { Box } from "@ya.praktikum/react-developer-burger-ui-components"
import AppHeader from '../app-header/app-header';
import styles from "./app.module.scss";
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../../services/index';
import { Provider } from "react-redux"
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ProtectedPage from '../protected-page/protected-page';
import  { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../services/user-slice"
import { getIngredients, saveIngredients } from "../../services/ingredients-slice"
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import IngredientPage from '../../pages/ingredient/ingredient';
import type { IIngredient, IIngredientWithUUID } from '../../utils/types';

type State = {
  ingredients: {
    ingredientsList: Array<IIngredient | IIngredientWithUUID> | []
  }
}

const App = (): React.JSX.Element => {

  const { ingredientsList } = useSelector((state: State) => state.ingredients)
  const [ ingredientsListWihtUUID, setIngredientsListWihtUUID ] = useState<Array<IIngredientWithUUID>>([])

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  async function handleIngredients() {
    // @ts-expect-error хранилище пока не типизировано
    const ingredients = await dispatch(getIngredients());
    dispatch(saveIngredients(ingredients))

  }

  useEffect(() => {
    // @ts-expect-error хранилище пока не типизировано
    dispatch(setUser())
    // @ts-expect-error хранилище пока не типизировано
    dispatch(getIngredients())
    handleIngredients()
  }, [])

  useEffect(() => {
    if (ingredientsList.length > 0 && ingredientsList[0].hasOwnProperty('uniqueId')) {
      const updatedList = ingredientsList as Array<IIngredientWithUUID>
      setIngredientsListWihtUUID(updatedList)
    }
  }, [ingredientsList])

  function closeModal() {
    navigate(-1)
  }

  return (
    <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Main ingredientsList={ingredientsListWihtUUID} />} />
          <Route path="/login" element={<ProtectedPage type="auth" element={<Login />} />} />
          <Route path="/register" element={<ProtectedPage type="auth" element={<Register />} />} />
          <Route path="/forgot-password" element={<ProtectedPage type="auth" element={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<ProtectedPage type="auth" element={<ResetPassword />} />} />
          <Route path="/profile" element={<ProtectedPage type="unauth" element={<Profile />} />}>
            <Route path=":orders" element={<div></div>} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientPage><IngredientDetails /></IngredientPage>} />
        </Routes>
        {background && (
          <Routes>
            <Route path="/ingredients/:id" element={<Modal closeModal={closeModal}><IngredientDetails /></Modal>} />
          </Routes>
        )}
    </div>
  );
}



const AppWrapper = () => {

  const store = configureStore({
    reducer: rootReducer,
    devTools: true
  })

  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

export default AppWrapper;
