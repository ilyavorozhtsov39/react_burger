import React from "react"
import "./BurgerConstructor.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

import data from '../../data.js'

function BurgerConstructor() {
  return (
    <div className="burger-constructor ml-5 pt-25" >
      <div className="burger-constructor__items pl-4 pr-4">
        {
          data.map((item, index) => 
            <div className="constructor-element__container">
              <div className="constructor-element__icon">
                <DragIcon />
              </div>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                key={index}
                extraClass={index !== data.length - 1 ? "mb-4" : ""}
                type={index === 0 ? "top" : index === data.length - 1 ? "bottom" : undefined}
              />
            </div>
          )
        }
      </div>
      <div className="burger-constructor__result mt-10">
        <div className="burger-constructor__result-price mr-10">
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button 
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>  
      </div>
    </div>
  )
}

export default BurgerConstructor;

{/* <ConstructorElement
  text={item.name}
  price={item.price}
  thumbnail={item.image_mobile}
  key={index}
/> */}