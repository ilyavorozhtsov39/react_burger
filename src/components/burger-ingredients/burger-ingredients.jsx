import React, { useState } from "react"
import "./burger-ingredients.scss"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../../data.js'
import Ingredient from "../ingredient/ingredient.jsx";


const buns = data.filter(item => item.type === "bun")
const main = data.filter(item => item.type === "main")
const sauce = data.filter(item => item.type === "sauce")

function BurgerIngredients() {

  const [current, setCurrent] = useState("buns");

  return (
    <div className="burger-ingredients mr-5">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className="burger-ingredients__tabs">
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className="burger-ingredients__content">
          <h2 className="text text_type_main-medium mt-10">Булки</h2>
          <div className="burger-ingredients__buns burger-ingredients__items">
            {buns.map((item, index) => 
              <Ingredient 
                id={index + 1}
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.index}
            />)}
          </div>
          <h2 className="text text_type_main-medium mt-10">Соусы</h2>
          <div className="burger-ingredients__buns burger-ingredients__items">
            {sauce.map((item, index) => 
              <Ingredient 
                id={index + 1}
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.index}
            />)}
          </div>
          <h2 className="text text_type_main-medium mt-10">Начинки</h2>
          <div className="burger-ingredients__buns burger-ingredients__items">
            {main.map((item, index) => 
              <Ingredient 
                id={index + 1}
                name={item.name}
                image={item.image}
                price={item.price}
                key={item.index}
            />)}
          </div>
      </div>
    </div>
  )
}

export default BurgerIngredients;