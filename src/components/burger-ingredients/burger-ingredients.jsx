import React, { useState } from "react"
import styles from "./burger-ingredients.module.scss"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../../data.js'
import Ingredient from "../ingredient/ingredient.jsx";


const buns = data.filter(item => item.type === "bun")
const main = data.filter(item => item.type === "main")
const sauce = data.filter(item => item.type === "sauce")

function BurgerIngredients() {

  const [current, setCurrent] = useState("buns");

  return (
    <div className={styles.ingredients}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={styles.content}>
          <h2 className={styles.subheader}>Булки</h2>
          <div className={styles.items}>
            {buns.map((item, index) => 
              <Ingredient 
                id={index + 1}
                name={item.name}
                image={item.image}
                price={item.price}
                key={index}
            />)}
          </div>
          <h2 className={styles.subheader}>Соусы</h2>
          <div className={styles.items}>
            {sauce.map((item, index) => 
              <Ingredient 
                id={index + 1}
                name={item.name}
                image={item.image}
                price={item.price}
                key={index}
            />)}
          </div>
          <h2 className={styles.subheader}>Начинки</h2>
          <div className={styles.items}>
            {main.map((item, index) => 
              <Ingredient 
                id={index + 1}
                name={item.name}
                image={item.image}
                price={item.price}
                key={index}
            />)}
          </div>
      </div>
    </div>
  )
}

export default BurgerIngredients;