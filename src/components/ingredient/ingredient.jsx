import React from "react"
import styles from "./ingredient.module.scss"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Ingredient({ id, dataId, name, image, price, showModal }) {
  const counter = <Counter count={1} size="default" extraClass={styles.counter} />
  return (
    <div 
      className={styles.ingredient} 
      style={(id === 1 || id === 2) ? {marginTop: "24px"} : {}}
      onClick={() => showModal(dataId)}
    >
      {}
      {id === 1 && counter}
      <img src={image} alt={name} className={styles.image} />
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
  dataId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired
}

export default Ingredient;