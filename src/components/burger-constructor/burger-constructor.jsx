import React, { useState, useEffect } from "react"
import styles from "./burger-constructor.module.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import Modal from "../modal/modal.jsx"
import OrderDetails from "../order-details/order-details.jsx"
import { IngredientType } from "../../utils/types.js"
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient } from "../../services/burger.js"

const tempOrderId = "034536";

function BurgerConstructor({ data }) {

  const { burgerList, bun, bunSelected } = useSelector(state => state.burger)

  const dispatch = useDispatch()

  const [ , dropTarget ] = useDrop({
      accept: "ingredient",
      drop(item) {
        const itemToStore = data.find(element => element._id === item.dataId)
        console.log(itemToStore)
        dispatch(addIngredient(itemToStore));
      },
  })

  const [modalVisible, setModalVisible] = useState(false);

  function showModal(e) {
    e.stopPropagation()
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
  }

  // Временная реализация
  // const bun = data[0]
  const constructorData = data.filter(el => el.type !== "bun").slice(0, 6)

  return (
    <section className={styles.constructor} >
      {
        modalVisible &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderId={tempOrderId} />
        </Modal>
      }
      <div className={styles.top}>
        {
          bunSelected &&
          <ConstructorElement
            text={bun.name + "\n (верх)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            extraClass="mb-4"
            isLocked={true}
            type="top"
          />
        }
      </div>
      <ul className={styles.items} ref={dropTarget}>
        {
          burgerList && burgerList.map((item, index) => 
            <ConstructorItem
              index={index}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              length={constructorData.length}
              key={item._id}
            />
          )
        }
      </ul>
      <div className={styles.bottom}>
        {
          bunSelected &&
          <ConstructorElement
            text={bun.name + "\n (низ)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            isLocked={true}
            extraClass="mt-4"
            type="bottom"
          />
        }
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
          onClick={showModal}
        >
          Оформить заказ
        </Button>  
      </div>
    </section>
  )
}

function ConstructorItem({ index, text, price, thumbnail, length }) {
  const isFinal = index === length - 1
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



BurgerConstructor.propTypes = IngredientType

ConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructor;