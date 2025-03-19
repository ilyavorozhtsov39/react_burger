import React, { useState, useEffect, useRef } from "react"
import styles from "./burger-constructor.module.scss"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../modal/modal"
import OrderDetails from "../order-details/order-details"
import { useDrop } from "react-dnd";
import { useAppSelector, useAppDispatch } from "../app/app"
import { addIngredient, removeIngredient } from "../../services/reducers/burger-slice"
import ConstructorItem from "../constructor-item/constructor-item"
import { updatePrice, updateIdList, sendOrderInfo } from "../../services/reducers/order-info-slice" 
import { setUser } from "../../services/reducers/user-slice"
import { useNavigate } from "react-router-dom"
import { FC } from "react"
import type { IIngredientWithUUID } from '../../utils/types';
import { ingredientTemplate } from "../../utils/constants"
import { getToken } from '../../services/cookies'


type TBurgerConstructorProps = {
  data: Array<IIngredientWithUUID> | []
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

const BurgerConstructor = ({ data }: TBurgerConstructorProps): React.JSX.Element => {

  const [ modalVisible, setModalVisible ] = useState<boolean>(false);
  const [ selectedBun, setSelectedBun ] = useState<IIngredientWithUUID>(ingredientTemplate);
  const { burgerList, bun, bunSelected } = useAppSelector((state: TBurger) => state.burger)
  const { price, idList, orderInfo } = useAppSelector((state: TOrder) => state.order)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const dropTargetRef = useRef<HTMLDivElement>(null);

  const [ , dropTarget ] = useDrop({
      accept: "ingredient",
      drop(item: { dataId: string }) {
        const itemToStore = data.find((element: IIngredientWithUUID) => element._id === item.dataId)
        dispatch(addIngredient(itemToStore));
      },
  })

  useEffect(() => {
    if (dropTargetRef.current) {
      dropTarget(dropTargetRef.current);
    }
  }, [dropTarget]);

  function removeElement(index: number) {
    dispatch(removeIngredient({ index }));
  }

  function closeModal() {
    setModalVisible(false)
  }

  async function createOrder(e: Event) {
    e.stopPropagation()
    const user = await dispatch(setUser()) as unknown as { payload: { success: boolean } }
    if (!user.payload?.success) {
      navigate("/login")
    } else {
      setModalVisible(true)
      dispatch(sendOrderInfo({ ingredients: idList }))
    }
  }

  useEffect(() => {
    function updateOrderInfo() {
      let newPrice = 0;
      const idList = []
      if (bunSelected) {
        const bun = selectedBun as IIngredientWithUUID;
        newPrice += bun.price;
        idList.push(bun._id);
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
    console.log("ORDER INFO: ", orderInfo)
  }, [orderInfo])


  return (
    <section className={styles.section} ref={dropTargetRef} data-id="drop-container">
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
          onClick={createOrder as unknown as () => void}
        >
          Оформить заказ
        </Button>  
      </div>
    </section>
  )
}

type TBunType = {
  text: string,
  price: number,
  thumbnail: string,
  isLocked: boolean,
  extraClass: string,
  type: "top" | "bottom"
}

const Bun: FC<TBunType> = ({ type, ...props }): React.JSX.Element => {

  const dropTargetRef = useRef<HTMLDivElement>(null);

  const [ , dropTarget ] = useDrop({
    accept: "inside",
    drop: item => ({ data: type })
  })

  useEffect(() => {
    if (dropTargetRef.current) {
      dropTarget(dropTargetRef.current);
    }
  }, [dropTarget])

  return (
    <div ref={dropTargetRef}>
      <ConstructorElement type={type} {...props} />
    </div>
  )
}





// if (Object.keys(bun).length !== 0) {
//   newPrice += typedBun.price;
//   idList.push(typedBun._id);
// }



export default BurgerConstructor;