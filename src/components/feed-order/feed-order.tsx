import React from 'react'
import styles from './feed-order.module.scss'
import type { IFeedUpdatedOrder } from '../../utils/types';

type TFeedOrderProps = {
  order: IFeedUpdatedOrder
}

const FeedOrder = ({ order }: TFeedOrderProps): React.JSX.Element => {
  console.log(order)
  return (
    <div>
      {order.number}
    </div>
  )
}

//584

export default FeedOrder;