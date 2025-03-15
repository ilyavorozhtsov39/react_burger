import React, { useState, useEffect } from 'react'
import styles from './feed.module.scss'
import FeedOrder from '../../components/feed-order/feed-order';
import type { IIngredientWithUUID, IFeedOrder, IFeedUpdatedOrder, IOrdersData } from '../../utils/types';
import data from '../../data.json'
import { setOrders } from '../../services/feed-slice'
import { useAppDispatch, useAppSelector } from '../../components/app/app';

import { wsConnect, wsDisconnect } from '../../services/actions';
import { wsMessage } from '../../services/websocket-slice';
import { getStatus, getOrders } from '../../services/websocket-slice';

import { updateOrdersData } from '../../services/helpers/feed'

type TFeedProps = {
    ingredientsList: Array<IIngredientWithUUID> | []
}

type TStatus = {
    working: Array<string>,
    ready: Array<string>
}

const Feed = ({ ingredientsList }: TFeedProps): React.JSX.Element => {

    const [ ordersData, setOrdersData ] = useState<IOrdersData>()
    const [ status, setStatus ] = useState<TStatus>()

    const dispatch = useAppDispatch();

    const socketStatus = useAppSelector(getStatus)
    const socketOrders = useAppSelector(getOrders)

    useEffect(() => {
        dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'))
        setTimeout(() => {
            dispatch(wsDisconnect())
        }, 5000)
    }, [])


    useEffect(() => {
        console.log(socketStatus)
        if (socketOrders.success === true) {
            // console.log(socketOrders)
            const updatedData = updateOrdersData(socketOrders, ingredientsList)
            setOrdersData(updatedData)
            console.log(updatedData)
        }
    }, [socketOrders])

    return (
        <div className={styles.feed}>
            <h1 className={styles.title}>Лента заказов</h1>
            <div className={styles.container}>
                <section className={styles.columnLeft}>
                    <div className={styles.ordersFeed}>
                        {ordersData?.orders.map((order: any, index: number) => {
                            return <FeedOrder key={index} order={order} />
                        })}
                    </div>
                </section>
                <section className={styles.columnRight}>
                    <div className={styles.orderStatus}>
                        <div className={styles.ready}>
                            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                            <div className={styles.ordersReady}>
                                {ordersData && ordersData.ready.map((order: number, index: number) => {
                                    return <p key={index} className="text text_type_digits-default mb-2">{order}</p>
                                })}
                            </div>
                        </div>
                        <div className={styles.working}>
                            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                            <div className={styles.ordersWorking}>
                                {ordersData && ordersData.working.map((order: number, index: number) => {
                                    return <p key={index} className="text text_type_digits-default mb-2">{order}</p>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.total}>
                        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                        { <p className={styles.digits}>{ordersData?.total}</p> }
                    </div>
                    <div className={styles.totalToday}>
                        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                        { <p className={styles.digits}>{ordersData?.totalToday}</p> }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Feed;