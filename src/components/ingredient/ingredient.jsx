import React from "react"
import styles from "./ingredient.module.scss"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Ingredient({ id, name, image, price, }) {
  const counter = <Counter count={1} size="default" extraClass={styles.counter} />
  return (
    <div className={styles.ingredient} style={(id === 1 || id === 2) ? {marginTop: "24px"} : {}}>
      {}
      {id === 1 && counter}
      <img src={image} alt="Изображение ингредиента" className={styles.image} />
      <div className={styles.priceData}>
        <p className={styles.text}>{price}</p>
        <CurrencyIcon />
      </div>
      <h2 className={styles.subheader}>{name}</h2>
    </div>
  )
}

Ingredient.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Ingredient;