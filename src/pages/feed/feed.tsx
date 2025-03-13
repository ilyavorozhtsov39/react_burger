import React, { useState, useEffect } from 'react'
import styles from './feed.module.scss'
import FeedOrder from '../../components/feed-order/feed-order';
import type { IIngredientWithUUID, IFeedOrder, IFeedUpdatedOrder } from '../../utils/types';
import data from '../../data.json'

type TFeedProps = {
    ingredientsList: Array<IIngredientWithUUID> | []
}

type TStatus = {
    working: Array<string>,
    ready: Array<string>
}

const Feed = ({ ingredientsList }: TFeedProps): React.JSX.Element => {

    const [ ordersInfo, setOrdersInfo ] = useState<IFeedUpdatedOrder[]>([])
    const [ status, setStatus ] = useState<TStatus>()
    const [ totalOrders, setTotalOrders ] = useState<{ total: string, totalToday: string }>()

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
    }

    function formatNumberWithSpace(number: number): string {
        return new Intl.NumberFormat('en-US', {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(number).replace(/,/g, ' ');
    }

    function handleTotalOrders(total: number, totalToday: number) {
        let totalCopy = ''
        let totalTodayCopy = ''
        if (String(total).length > 3) {
            totalCopy = formatNumberWithSpace(total)
        } else {
            totalCopy = String(total)
        }
        if (String(totalToday).length > 3) {
            totalTodayCopy = formatNumberWithSpace(totalToday)
        } else {
            totalTodayCopy = String(totalToday)
        }
        setTotalOrders({
            total: totalCopy,
            totalToday: totalTodayCopy
        })
    }

    useEffect(() => {
        const { orders } = data;
        setStatus({ working: data.working, ready: data.ready })
        if (ingredientsList.length > 0) {
            updateIngredients(orders)
        }
        handleTotalOrders(data.total, data.totalToday)
    }, [ingredientsList])

    return (
        <div className={styles.feed}>
            <h1 className={styles.title}>Лента заказов</h1>
            <div className={styles.container}>
                <section className={styles.columnLeft}>
                    <div className={styles.ordersFeed}>
                        {ordersInfo.map((order: any, index: number) => {
                            return <FeedOrder key={index} order={order} />
                        })}
                    </div>
                </section>
                <section className={styles.columnRight}>
                    <div className={styles.orderStatus}>
                        <div className={styles.ready}>
                            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                            <div className={styles.ordersReady}>
                                {status && status.ready.map((order: string, index: number) => {
                                    return <p key={index} className="text text_type_digits-default mb-2">{order}</p>
                                })}
                            </div>
                        </div>
                        <div className={styles.working}>
                            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                            <div className={styles.ordersWorking}>
                                {status && status.working.map((order: string, index: number) => {
                                    return <p key={index} className="text text_type_digits-default mb-2">{order}</p>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.total}>
                        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                        <p className={styles.digits}>{totalOrders?.total}</p>
                    </div>
                    <div className={styles.totalToday}>
                        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                        <p className={styles.digits}>{totalOrders?.totalToday}</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Feed;