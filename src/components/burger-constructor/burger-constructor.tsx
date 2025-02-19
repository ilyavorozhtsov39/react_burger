import React, { useState, useEffect } from "react"
import styles from "./burger-constructor.module.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../modal/modal.jsx"
import OrderDetails from "../order-details/order-details.jsx"
// import { IngredientType } from "../../utils/types.js"
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient } from "../../services/burger-slice.js"
import ConstructorItem from "../constructor-item/constructor-item.jsx"
import { updatePrice, updateIdList, sendOrgerInfo } from "../../services/order-info-slice.js" 
import { setUser } from "../../services/user-slice.js"
import { useNavigate } from "react-router-dom"
import { FC } from "react"
import type { IIngredient, IIngredientWithUUID } from '../../utils/types';


type TBurgerConstructorProps = {
  data: Array<IIngredient | IIngredientWithUUID | []>
}

type TBurger = {
  burger: {
    burgerList: Array<IIngredientWithUUID> | [],
    bun: IIngredientWithUUID | {},
    bunSelected: boolean
  }
}

type TOrder = {
  order: {
    price: number,
    idList: Array<string>,
    orderInfo: {
      success: boolean,
      order: {
        number: number
      }
    }
  }
}

const BurgerConstructor: FC<TBurgerConstructorProps> = ({ data }) => {

  const [ fullData, setFullData ] = useState<Array<IIngredientWithUUID> | []>([])
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ selectedBun, setSelectedBun ] = useState<IIngredientWithUUID>({} as IIngredientWithUUID);
  const { burgerList, bun, bunSelected } = useSelector((state: TBurger) => state.burger)
  const { price, idList, orderInfo } = useSelector((state: TOrder) => state.order)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ , dropTarget ] = useDrop({
      accept: "ingredient",
      drop(item: { dataId: string }) {
        const itemToStore = fullData.find((element: IIngredientWithUUID) => element._id === item.dataId)
        dispatch(addIngredient(itemToStore));
      },
  })

  function removeElement(index: number) {
    dispatch(removeIngredient({ index }));
  }

  function closeModal() {
    setModalVisible(false)
  }

  async function createOrder(e: Event) {
    e.stopPropagation()
    // @ts-expect-error хранилище пока не типизировано
    const user = await dispatch(setUser()) as unknown as { payload: { success: boolean } }
    if (!user.payload?.success) {
      navigate("/login")
    } else {
      setModalVisible(true)
      // @ts-expect-error хранилище пока не типизировано
      dispatch(sendOrgerInfo({ ingredients: idList }))
    }
  }

  useEffect(() => {
    function updateOrderInfo() {
      let newPrice = 0;
      const idList = []
      if (bunSelected) {
        newPrice += selectedBun.price;
        idList.push(selectedBun._id);
      }

  
      burgerList.forEach(element => {
        newPrice += element.price
        idList.push(element._id)
      })
  
      dispatch(updatePrice(newPrice))
      dispatch(updateIdList(idList))
    }

    updateOrderInfo()

    if (bunSelected) {
      const typedBun = bun as IIngredientWithUUID;
      setSelectedBun(typedBun)
    }
  }, [burgerList, bun ])

  useEffect(() => {
    if (data.length > 0 && data[0].hasOwnProperty("uniqueId")) {
      const newData = data as unknown as Array<IIngredientWithUUID>
      setFullData(newData)
    }
  }, [])


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
            text={selectedBun.name + "\n (верх)"}
            price={selectedBun.price}
            thumbnail={selectedBun.image_mobile}
            extraClass="mb-4"
            isLocked={true}
            type="top"
          />
        }
      </div>
      <ul className={styles.items}>
        {
          burgerList && burgerList.map((item: IIngredientWithUUID, index) => 
            <ConstructorItem
              index={index}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              length={burgerList.length}
              handleClose={removeElement}
              key={item.uniqueId}
            />
          )
        }
      </ul>
      <div className={styles.bottom}>
        {
          bunSelected &&
          <Bun
            text={selectedBun.name + "\n (низ)"}
            price={selectedBun.price}
            thumbnail={selectedBun.image_mobile}
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





// if (Object.keys(bun).length !== 0) {
//   newPrice += typedBun.price;
//   idList.push(typedBun._id);
// }



export default BurgerConstructor;