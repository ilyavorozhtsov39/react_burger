import React from "react"
import styles from "./burger-constructor.module.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"

import data from '../../data.js'

// Временная реализация данных конструктора1
const bun = data[0]
const constructorData = []
constructorData.push(data[5])
constructorData.push(data[4])
constructorData.push(data[4])
constructorData.push(data[7])
constructorData.push(data[8])
constructorData.push(data[8])

function BurgerConstructor() {
  return (
    <section className={styles.constructor} >
      <div className={styles.top}>
        <ConstructorElement
            text={bun.name + "\n (верх)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            extraClass="mb-4"
            isLocked={true}
            type="top"
          />
      </div>
      <ul className={styles.items}>
        {
          constructorData.map((item, index) => 
            <ConstructorItem
              index={index}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              key={item._id}
            />
          )
        }
      </ul>
      <div className={styles.bottom}>
        <ConstructorElement
            text={bun.name + "\n (низ)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            isLocked={true}
            extraClass="mt-4"
            type="bottom"
          />
      </div>
      <div className={styles.result}>
        <div className={styles.price}>
          <p className={styles.priceCount}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button 
          type="primary"
          size="large"
          htmlType="button"
        >
          Оформить заказ
        </Button>  
      </div>
    </section>
  )
}

function ConstructorItem({ index, text, price, thumbnail }) {
  const isFinal = index === constructorData.length - 1
  return (
    <li className={styles.container}>
      <div className={styles.icon}>
        <DragIcon />
      </div>
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        key={index}
        extraClass={!isFinal ? "mb-4" : ""}
      />
    </li>
  )
}

ConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructor;