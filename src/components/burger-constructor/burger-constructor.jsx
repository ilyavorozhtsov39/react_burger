import React from "react"
import "./burger-constructor.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"

import data from '../../data.js'

function BurgerConstructor() {
  return (
    <section className="burger-constructor ml-5 pt-25" >
      <ul className="burger-constructor__items pl-4 pr-4">
        {
          data.map((item, index) => 
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
        extraClass={index !== data.length - 1 ? "mb-4" : ""}
        type={index === 0 ? "top" : index === data.length - 1 ? "bottom" : undefined}
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