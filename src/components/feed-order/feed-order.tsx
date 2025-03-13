import React, { useEffect, useState } from 'react'
import styles from './feed-order.module.scss'
import type { IFeedUpdatedOrder } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from "react-router-dom";

type TFeedOrderProps = {
  order: IFeedUpdatedOrder
}

const FeedOrder = ({ order }: TFeedOrderProps): React.JSX.Element => {

  const [ timeInfo, setTimeInfo ] = useState<string>('')
  const [ totalPrice, setTotalPrice ] = useState<number>(0)

  function getDateInfo(dateString: string) {
    const givenDate = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const time = givenDate.toLocaleTimeString([], options);


    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - givenDate.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor(differenceInMilliseconds / millisecondsInADay);
    const info = daysPassed === 0 ? `Сегодня` :
                 daysPassed === 1 ? `Вчера` :
                 daysPassed < 5 ? `${daysPassed} дня назад` : `${daysPassed} дней назад`;
    setTimeInfo(`${info}, ${time}`)
  }

  function setPrice() {
    const price = order.updatedIngredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0)
    setTotalPrice(price);
  }

  const navigate = useNavigate()
  const location = useLocation()

  function showModal() {
    navigate(`/feed/${order._id}`, { state: { background: location }}) 
  }

  
  useEffect(() => {
    getDateInfo(order.createdAt);
    setPrice()
  }, [order]);

  return (
    <div className={styles.container} onClick={showModal}>
      <p className={styles.header}>
        <span className='text text_type_digits-default'>#{order.number}</span>
        <span className='text text_type_main-default text_color_inactive'>{timeInfo}</span>
      </p>
      <p className='text text_type_main-medium'>{order.name}</p>
      <div className={styles.footer}>
        <div className={styles.images}>
          {
            order.updatedIngredients.map((ingredient, index) => {
              if (index < 6) {
                return <IngredientImage key={index} image={ingredient.image_mobile} index={index} length={order.updatedIngredients.length} />
              } else {
                return null
              }
            })
          }
        </div>
        <div className={styles.price}>
          <p className='text text_type_digits-default mr-2'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

type TState = {
  zIndex: number,
  right: string,
  opacity?: number
}

const IngredientImage = ({ image, index, length }: { image: string, index: number, length: number }): React.JSX.Element => {

  const [ position, setPosition ] = useState<TState>()

  function handlePosition() {
    let overlap = 10;
    let shift = 0;

    for (let i = 0; i < index; i++) {
      shift += 22;
      overlap -= 1;
    }
    const newStyles = {
      zIndex: overlap,
      right: `${shift}px`
    }
    return newStyles
  }

  useEffect(() => {
    const newStyles = handlePosition();
    setPosition(newStyles);
  }
  , [])
  
  if (index === 5) {
    return (
      <div className={styles.imageContainer} style={{
        zIndex: 0,
        right: '110px',
      }}>
        <img src={image} alt="ingredient" className={styles.image} style={{ opacity: 0.5 }} />
        <div className={styles.overlapper}>
          <p className='text text_type_main-small'>{`+${length - 6}`}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.imageContainer} style={position}>
        <img src={image} alt="ingredient" className={styles.image} />
      </div>
    )
  }
}

export default FeedOrder;