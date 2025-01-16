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
import ConstructorItem from "../constructor-item/constructor-item.jsx"

const tempOrderId = "034536";

function BurgerConstructor({ data }) {

  const { burgerList, bun, bunSelected } = useSelector(state => state.burger)

  const dispatch = useDispatch()

  const [ , dropTarget ] = useDrop({
      accept: "ingredient",
      drop(item) {
        const itemToStore = data.find(element => element._id === item.dataId)
        dispatch(addIngredient(itemToStore));
      },
  })

  function removeElement(index) {
    dispatch(removeIngredient({ index }));
  }

  const [modalVisible, setModalVisible] = useState(false);

  function showModal(e) {
    e.stopPropagation()
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
  }

  return (
    <section className={styles.constructor} ref={dropTarget}>
      {
        modalVisible &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderId={tempOrderId} />
        </Modal>
      }
      <div className={styles.top}>
        {
          bunSelected &&
          <Bun
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
          burgerList && burgerList.map((item, index) => 
            <ConstructorItem
              index={index}
              dataId={item._id}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              length={burgerList.length}
              handleClose={removeElement}
              key={index}
            />
          )
        }
      </ul>
      <div className={styles.bottom}>
        {
          bunSelected &&
          <Bun
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

function Bun({ type, ...props }) {

  const [ , dropTarget ] = useDrop({
    accept: "inside",
    drop: item => ({ data: type })
  })

  return (
    <div ref={dropTarget}>
      <ConstructorElement type={type} {...props} />
    </div>
  )
}





BurgerConstructor.propTypes = IngredientType



export default BurgerConstructor;