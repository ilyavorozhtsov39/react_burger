import React, { useState, useEffect } from 'react'
import styles from './order-info.module.scss'
import { useParams } from 'react-router-dom'
import { useAppSelector } from "../app/app"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
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
    const [ totalPrice, setTotalPrice ] = useState<number>(0)

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

    function getTotalPrice(ingredients: Array<ICountedIngredient>) {
        const result = ingredients.reduce((acc, item) => {
            return acc + item.price * item.count;
        }, 0);
        setTotalPrice(result)
    }

    useEffect(() => {
        function handleState() {
            const order = orders.find(item => item._id === params.id)
            console.log(orders)
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

    useEffect(() => {
        if (countedIngredients.length > 0) {
            getTotalPrice(countedIngredients)
        }
    }, [countedIngredients])

    return (
        <div className={styles.container}>
            <p className={styles.orderId}>{`#${order?._id}`}</p>
            <p className="text text_type_main-medium mb-3">{order?.name}</p>
            <p className="text text_type_main-small mb-15 " style={status ? { color: "rgba(0, 204, 204, 1)" } : {}}>{status ? "Выполнен" : "Готовится"}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={styles.ingredients}>
                {countedIngredients.map(ingedient => 
                    <Ingredient 
                        key={ingedient.uniqueId}
                        image={ingedient.image}
                        name={ingedient.name}
                        count={ingedient.count}
                        price={ingedient.price}
                    />
                )}
            </div>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">{order?.date}</p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

const Ingredient = ({ image, name, count, price }: { image: string, name: string, count: number, price: number }): React.JSX.Element => {
    return (
        <div className={styles.ingredient}>
            <div className={styles.left}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src={image} alt="" />
                </div>
                <p className="text text_type_main-default">{name}</p>
            </div>
            <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{`${count} x ${price}`}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}


export default OrderInfo;