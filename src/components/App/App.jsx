import React from 'react';
import { Box } from "@ya.praktikum/react-developer-burger-ui-components"
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import "./App.scss";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="app__main">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
