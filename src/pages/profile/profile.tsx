import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import styles from './profile.module.scss';
import { useAppSelector, useAppDispatch } from "../../components/app/app"
import { logoutUser, modifyUser } from "../../services/user-slice"
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileForm from '../../components/profile-form/profile-form'
import { refreshToken } from '../../api/user'
import { getToken } from '../../services/cookies';
import { wsConnect, wsDisconnect } from '../../services/actions';
import { getOrders, getStatus } from '../../services/websocket-slice'
import { IFeedOrder, IFeedUpdatedOrder } from '../../utils/types'
import { getIngredientsList } from '../../services/ingredients-slice'
import { updateOrdersData } from '../../services/helpers/feed'
import FeedOrder from '../../components/feed-order/feed-order'
import { wsClearOrders } from '../../services/websocket-slice'
import { setPersonalOrders, getPersonalOrders } from '../../services/feed-slice'

type RequestResult = {
    payload: {
      success: boolean
    }
}

type TState = {
    form: boolean,
    orders: boolean
}

type TData = {
    sucess: boolean,
    orders: Array<IFeedOrder>,
    total: number,
    totalToday: number
}

const Profile = (): React.JSX.Element => {

    const [ ordersModal, setOrdersModal ] = useState<boolean>(false)
    const [ accessToken, setAccessToken ] = useState<string | undefined>()

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout() {
        const result = await dispatch(logoutUser()) as RequestResult
        if (result.payload.success) {
            navigate("/login")
        }
    }

    async function getAccessToken() {
        const token = await getToken()
        const tokenValue = token ? token.split(" ")[1] : undefined
        setAccessToken(tokenValue)
    }

    function openOrders() {
        navigate("/profile/orders")
    }

    function openProfile() {
        navigate("/profile")
    }

    useEffect(() => {
        getAccessToken()
        return () => {
            dispatch(wsClearOrders())
            dispatch(wsDisconnect())
        }
    }, [])

    useEffect(() => {
        if (typeof accessToken === 'string') {
            dispatch(wsConnect(`wss://norma.nomoreparties.space/orders?token=${accessToken}`))
        }
    }, [accessToken])

    useEffect(() => {
        if (location.pathname === "/profile/orders") {
            setOrdersModal(true)
        } else {
            setOrdersModal(false)
        }
        
    }, [location])

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.list}>
                    <ul className={styles.routes}>
                        <li className={!ordersModal ? styles.route: styles.routeSecondary} onClick={openProfile}>Профиль</li>
                        <li className={ordersModal ? styles.route : styles.routeSecondary} onClick={openOrders}>История заказов</li>
                        <li className={styles.routeSecondary} onClick={handleLogout}>Выход</li>
                    </ul>
                    <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
                </div>
                {
                    !ordersModal ? <ProfileForm /> : <Orders />
                }
            </div>
        </main>
    )
}

const Orders = () => {

    const [ orders, setOrders ] = useState<Array<IFeedUpdatedOrder>>([])

    const dispatch = useAppDispatch()
    const ingredientList = useAppSelector(getIngredientsList)
    const ordersData = useAppSelector(getOrders)
    const personalOrders = useAppSelector(getPersonalOrders)

    useEffect(() => {
        if (ordersData.success === true && ingredientList.length > 0) {
            const updatedData = updateOrdersData(ordersData, ingredientList)
            dispatch(setPersonalOrders(updatedData))
        }
    }, [ingredientList, ordersData])

    useEffect(() => {
        if (personalOrders) {
            setOrders(personalOrders.orders)
        }
    }, [personalOrders])

    return (
        <div className={styles.ordersContainer}>
           <div className={styles.orders}>
                {orders && orders.map((item, index) => <FeedOrder order={item} key={item.uniqueId} page="profile/orders" />)}
            </div> 
        </div>
    )
}

export default Profile;