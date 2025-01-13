import React, { useState, useEffect } from "react"
import styles from "./burger-constructor.module.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import Modal from "../modal/modal.jsx"
import OrderDetails from "../order-details/order-details.jsx"

const tempOrderId = "034536";

function BurgerConstructor({ data }) {

  const [modalVisible, setModalVisible] = useState(false);

  function showModal(e) {
    e.stopPropagation()
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
  }

  // Временная реализация
  const bun = data[0]
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
          bun &&
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
      <ul className={styles.items}>
        {
          constructorData && constructorData.map((item, index) => 
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
          bun &&
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }))
}

ConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructor;