import React, { useEffect, useState } from 'react'
import styles from './feed-order.module.scss'
import type { IFeedUpdatedOrder } from '../../utils/types';

type TFeedOrderProps = {
  order: IFeedUpdatedOrder
}

const FeedOrder = ({ order }: TFeedOrderProps): React.JSX.Element => {

  const [ timeInfo, setTimeInfo ] = useState<string>('')

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
    return `${info}, ${time}`;
  }

  
  useEffect(() => {
    const result = getDateInfo(order.createdAt);
    setTimeInfo(result);
    // console.log(order)
  }, [order]);

  return (
    <div className={styles.container}>
      <p className={styles.header}>
        <span className='text text_type_digits-default'>#{order.number}</span>
        <span className='text text_type_main-default text_color_inactive'>{timeInfo}</span>
      </p>
      <p className='text text_type_main-medium'>Interstellar бургер</p>
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
      shift += 16;
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
        right: '80px',
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