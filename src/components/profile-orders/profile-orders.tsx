import { useState, useEffect } from 'react';
import styles from './profile-orders.module.scss';
import { useAppSelector, useAppDispatch } from "../../components/app/app"
import { getToken } from '../../services/cookies';
import { wsConnect, wsDisconnect } from '../../services/actions';
import { getOrders, getStatus } from '../../services/reducers/websocket-slice'
import { IFeedUpdatedOrder } from '../../utils/types'
import { getIngredientsList } from '../../services/reducers/ingredients-slice'
import { updateOrdersData } from '../../services/helpers/feed'
import FeedOrder from '../../components/feed-order/feed-order'
import { wsClearOrders } from '../../services/reducers/websocket-slice'
import { setPersonalOrders, getPersonalOrders, clearPersonalOrders } from '../../services/reducers/feed-slice'
import { SOCKET_URL } from '../../utils/constants';

const ProfileOrders = () => {

    const [ orders, setOrders ] = useState<Array<IFeedUpdatedOrder>>([])
    const [ accessToken, setAccessToken ] = useState<string | undefined>()
    const [ status, setStatus ] = useState<number>(0)

    const dispatch = useAppDispatch()
    const ingredientList = useAppSelector(getIngredientsList)
    const ordersData = useAppSelector(getOrders)
    const personalOrders = useAppSelector(getPersonalOrders)
    const socketStatus = useAppSelector(getStatus)

    async function getAccessToken() {
        const token = await getToken()
        const tokenValue = token ? token.split(" ")[1] : undefined
        setAccessToken(tokenValue)
    }

    useEffect(() => {
        getAccessToken()
        return () => {
            dispatch(clearPersonalOrders())
            dispatch(wsClearOrders())
            dispatch(wsDisconnect())
        }
    }, [])

    useEffect(() => {
        if (typeof accessToken === 'string') {
            dispatch(wsConnect(`${SOCKET_URL}?token=${accessToken}`))
        }
    }, [accessToken])

    useEffect(() => {
        if (ordersData && ordersData.success === true && ingredientList.length > 0 && status > 0) {
            const updatedData = updateOrdersData(ordersData, ingredientList)
            dispatch(setPersonalOrders(updatedData))
        }
    }, [ingredientList, ordersData])

    useEffect(() => {
        if (personalOrders) {
            let profileOrders = [ ...personalOrders.orders ];
            const newOrder = profileOrders.reverse()
            setOrders(newOrder)
        }
    }, [personalOrders])

    useEffect(() => {
        setStatus(prevState => ++prevState)
    }, [socketStatus])

    return (
        <div className={styles.ordersContainer}>
           <div className={styles.orders}>
                {orders && orders.map((item, index) => <FeedOrder order={item} key={item.uniqueId} page="profile/orders" />)}
            </div> 
        </div>
    )
}

export default ProfileOrders;