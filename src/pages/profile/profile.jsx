import React, { useState, useEffect } from 'react';
import styles from './profile.module.scss';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, modifyUser } from "../../services/user-slice.js"
import { useNavigate, useLocation } from 'react-router-dom';

import { setUser } from "../../services/user-slice.js"

function Profile() {

    const [form, setForm] = useState({  name: "", login: "", password: "" });
    const [ ordersModal, setOrdersModal ] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userState = useSelector(state => state.user)

    async function handleLogout() {
        const result = await dispatch(logoutUser())
        // console.log("Logout result: ", result)
        if (result.payload.success) {
            // console.log("TO LOGIN")
            navigate("/login")
        }
    }

    function changeUserInfo() {
        dispatch(modifyUser(form))
        dispatch(setUser())
    }

    function handleChange(e) { 
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function openOrders() {
        navigate("/profile/orders")
    }

    useEffect(() => {
        if (userState.isAuth) {
            setForm({ name: userState.user.name, login: userState.user.email, password: "" })
        }
    }, [userState])

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
                <section className={styles.list}>
                    <ul className={styles.routes}>
                        <li className={styles.route}>Профиль</li>
                        <li className={ordersModal ? styles.route : styles.routeSecondary} onClick={openOrders}>История заказов</li>
                        <li className={styles.routeSecondary} onClick={handleLogout}>Выход</li>
                    </ul>
                    <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
                </section>
                <section className={styles.inputs}>
                    <Input type="text" placeholder="Имя" name="name" extraClass="mb-6" icon="EditIcon" value={form.name} onChange={handleChange} />
                    <Input type="text" placeholder="Логин" name="login" icon="EditIcon" extraClass="mb-6" value={form.login} onChange={handleChange} />
                    <Input type="password" placeholder="Пароль" name="password" icon="EditIcon" value={form.password} onChange={handleChange} />
                    <Button htmlType="button" type="primary" size="medium" onClick={changeUserInfo} extraClass="mt-15">Сохранить</Button>
                </section>
            </div>
        </main>
    )
}

export default Profile;