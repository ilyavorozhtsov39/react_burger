import React from "react"
import "./burger-constructor.scss"
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
    <section className="burger-constructor ml-5 pt-25" >
      <div className="burger-constructor__top ml-8">
        <ConstructorElement
            text={bun.name + "\n (верх)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            extraClass="mb-4"
            isLocked={true}
            type="top"
          />
      </div>
      <ul className="burger-constructor__items">
        {
          constructorData.map((item, index) => 
            <ConstructorItem
              index={index}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              key={index}
            />
          )
        }
      </ul>
      <div className="burger-constructor__bottom ml-8">
        <ConstructorElement
            text={bun.name + "\n (низ)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            isLocked={true}
            extraClass="mt-4"
            type="bottom"
          />
      </div>
      <div className="burger-constructor__result mt-10">
        <div className="burger-constructor__result-price mr-10">
          <p className="text text_type_digits-medium mr-2">610</p>
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
    <li className="constructor-element__container">
      <div className="constructor-element__icon">
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