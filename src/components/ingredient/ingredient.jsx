import React from "react"
import "./ingredient.scss"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredient({ id, name, image, price, }) {
  const counter = <Counter count={1} size="default" extraClass="ingredient__counter" />
  return (
    <div className="ingredient mt-8" style={(id === 1 || id === 2) ? {marginTop: "24px"} : {}}>
      {}
      {id === 1 && counter}
      <img src={image} alt="" className="ingredient__image" />
      <p className="ingredient__price-data">
        <p className="text text_type_digits-default mr-2 mt-1 mb-1">{price}</p>
        <CurrencyIcon />
      </p>
      <h2 className="text text_type_main-default">{name}</h2>
    </div>
  )
}

export default Ingredient;