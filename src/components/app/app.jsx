import React, { useEffect, useState } from 'react';
import { Box } from "@ya.praktikum/react-developer-burger-ui-components"
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from "./app.module.scss";
import { getData } from "../../api/get-data.js";

function App() {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      try {
        const result = await getData();
        setIngredients(result)
      } catch (error) {
        console.log(error)
      }
    }

    getIngredients()
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </main>
    </div>
  );
}

export default App;
