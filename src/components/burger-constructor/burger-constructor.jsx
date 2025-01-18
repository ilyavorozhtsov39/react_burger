import React, { useState, useEffect } from "react"
import styles from "./burger-constructor.module.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import Modal from "../modal/modal.jsx"
import OrderDetails from "../order-details/order-details.jsx"
import { IngredientType } from "../../utils/types.js"
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient } from "../../services/burger-slice.js"
import ConstructorItem from "../constructor-item/constructor-item.jsx"
import { updatePrice, updateIdList, sendOrgerInfo } from "../../services/order-info-slice.js" 
import { v4 as uuidv4 } from 'uuid';

const tempOrderId = "034536";

function BurgerConstructor({ data }) {

  const [modalVisible, setModalVisible] = useState(false);
  const { burgerList, bun, bunSelected } = useSelector(state => state.burger)
  const { price, idList, orderInfo } = useSelector(state => state.order)

  const dispatch = useDispatch()

  const [ , dropTarget ] = useDrop({
      accept: "ingredient",
      drop(item) {
        const itemToStore = data.find(element => element._id === item.dataId)
        const updatedItem = { ...itemToStore, key: uuidv4() }
        dispatch(addIngredient(updatedItem));
      },
  })

  function removeElement(index) {
    dispatch(removeIngredient({ index }));
  }

  function closeModal() {
    setModalVisible(false)
  }

  function createOrder(e) {
    e.stopPropagation()
    setModalVisible(true)
    dispatch(sendOrgerInfo({ ingredients: idList }))
  }

  useEffect(() => {
    function updateOrderInfo() {
      let newPrice = 0;
      const idList = []
      if (Object.keys(bun).length !== 0) {
        newPrice += bun.price
        idList.push(bun._id)
      }

  
      burgerList.forEach(element => {
        newPrice += element.price
        idList.push(element._id)
      })
  
      dispatch(updatePrice(newPrice))
      dispatch(updateIdList(idList))
    }

    updateOrderInfo()
  }, [burgerList, bun ])


  return (
    <section className={styles.constructor} ref={dropTarget}>
      {
        modalVisible && orderInfo.success &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderId={orderInfo.order.number} />
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
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              length={burgerList.length}
              handleClose={removeElement}
              key={item.key}
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
          <p className={styles.priceCount}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button 
          type="primary"
          size="large"
          htmlType="button"
          onClick={createOrder}
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





BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientType)
}

Bun.propTypes = {
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  isLocked: PropTypes.bool.isRequired
}



export default BurgerConstructor;