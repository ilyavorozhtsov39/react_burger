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
    console.log(order)
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
              return <IngredientImage key={index} image={ingredient.image_mobile} />
            })
          }
        </div>
      </div>
    </div>
  )
}

const IngredientImage = ({ image }: { image: string }): React.JSX.Element => {
  return (
    <div className={styles.imageContainer}>
      <img src={image} alt="ingredient" className={styles.image} />
    </div>
  )
}

export default FeedOrder;