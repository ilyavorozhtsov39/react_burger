import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import styles from './profile.module.scss';
import { useAppDispatch } from "../../components/app/app"
import { logoutUser } from "../../services/user-slice"
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileForm from '../../components/profile-form/profile-form'
import { IFeedOrder } from '../../utils/types'
import ProfileOrders from '../../components/profile-orders/profile-orders'

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

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout() {
        const result = await dispatch(logoutUser()) as RequestResult
        if (result.payload.success) {
            navigate("/login")
        }
    }

    function openOrders() {
        navigate("/profile/orders")
    }

    function openProfile() {
        navigate("/profile")
    }

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
                    !ordersModal ? <ProfileForm /> : <ProfileOrders />
                }
            </div>
        </main>
    )
}

export default Profile;