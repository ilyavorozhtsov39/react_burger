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

type RequestResult = {
    payload: {
      success: boolean
    }
}

type TState = {
    form: boolean,
    orders: boolean
}

const Profile = (): React.JSX.Element => {

    const [ ordersModal, setOrdersModal ] = useState<boolean>(false)
    const [ accessToken, setAccessToken ] = useState<string | undefined>()

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const socketStatus = useAppSelector(getStatus)
    const socketOrders = useAppSelector(getOrders)

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
        console.log(socketOrders)
    }, [socketOrders])

    useEffect(() => {
        getAccessToken()
        return () => {
            dispatch(wsDisconnect())
        }
    }, [])

    useEffect(() => {
        if (typeof accessToken === 'string') {
            console.log(accessToken)
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
                    !ordersModal ? <ProfileForm /> : <div></div>
                }
            </div>
        </main>
    )
}

export default Profile;