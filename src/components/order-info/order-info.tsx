import React, { useState, useEffect } from 'react'
import styles from './order-info.module.scss'
import { useParams } from 'react-router-dom'
import { useAppSelector } from "../app/app"
import type { IFeedUpdatedOrder, IIngredientWithUUID } from '../../utils/types'

type State = {
    feed: {
        orders: Array<IFeedUpdatedOrder>
    }
}

interface ICountedIngredient extends IIngredientWithUUID {
    count: number
}

const OrderInfo = (): React.JSX.Element => {

    const [ order, setOrder ] = useState<IFeedUpdatedOrder>()
    const [ status, setStatus ] = useState<boolean>(false)
    const [ countedIngredients, setCountedIngredients ] = useState<Array<ICountedIngredient>>([])

    const params = useParams()
    const { orders } = useAppSelector((state: State) => state.feed)

    function compare(element: IIngredientWithUUID, list: Array<ICountedIngredient>): { includes: boolean; id: number } {
        let includes = false;
        let id = 0;
        list.forEach((item, index) => {
            if (item._id === element._id) {
                includes = true;
                id = index;
            }
        });
        return { includes, id };
    }

    function sortIngredients() {
        let result: Array<ICountedIngredient> = [];
        order?.updatedIngredients.forEach((item) => {
            const compared = compare(item, result);
            if (compared.includes) {
                result[compared.id].count++;
            } else {
                if (item.type === "bun") {
                    result.push({  ...item, count: 2 });
                } else {
                    result.push({ ...item, count: 1 });
                }
            }
        });
        setCountedIngredients(result);
    }

    useEffect(() => {
        function handleState() {
            const order = orders.find(item => item._id === params.id)
            setOrder(order)
            if (order?.status === "done") setStatus(true)
        }
        handleState()
    }, [orders])

    useEffect(() => {
        if (order) {
            sortIngredients()
        }
    }, [order])

    return (
        <div className={styles.container}>
            <p className={styles.orderId}>{`#${order?._id}`}</p>
            <p className="text text_type_main-medium mb-3">{order?.name}</p>
            <p className="text text_type_main-small mb-15 " style={status ? { color: "rgba(0, 204, 204, 1)" } : {}}>{status ? "Выполнен" : "Готовится"}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
        </div>
    )
}

export default OrderInfo;