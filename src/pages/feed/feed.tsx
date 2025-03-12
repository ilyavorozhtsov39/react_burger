import React, { useState, useEffect } from 'react'
import styles from './feed.module.scss'
import FeedOrder from '../../components/feed-order/feed-order';
import type { IIngredientWithUUID, IFeedOrder, IFeedUpdatedOrder } from '../../utils/types';
import data from '../../data.json'

type TFeedProps = {
    ingredientsList: Array<IIngredientWithUUID> | []
  }

const Feed = ({ ingredientsList }: TFeedProps): React.JSX.Element => {

    const [ ordersInfo, setOrdersInfo ] = useState<IFeedUpdatedOrder[]>([])

    function updateIngredients(orders: Array<IFeedOrder>) {
        const updatedOrders = orders.map((order: IFeedOrder) => {
            const updatedIngredients = order.ingredients.map((ingredient: string) => {
                const updatedIngredient = ingredientsList.find((el: IIngredientWithUUID) => el._id === ingredient);
                return updatedIngredient
            }) as Array<IIngredientWithUUID>
            const price = updatedIngredients.reduce((acc: number, ingredient: IIngredientWithUUID) => {
                return acc + ingredient.price
            }, 0)
            return {
                ...order,
                price,
                updatedIngredients
            }
        })
        setOrdersInfo(updatedOrders)
        return updatedOrders
    }

    useEffect(() => {
        const { orders } = data;
        if (ingredientsList.length > 0) {
            updateIngredients(orders)
        }
    }, [ingredientsList])

    return (
        <div className={styles.feed}>
            <section className={styles.columnLeft}>
                <h1 className={styles.title}>Лента заказов</h1>
                <div className={styles.ordersFeed}>
                    {ordersInfo.map((order: any, index: number) => {
                        return <FeedOrder key={index} order={order} />
                    })}
                </div>
            </section>
            <section className={styles.columnRight}></section>
        </div>
    )
}

export default Feed;