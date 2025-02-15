import React, { useEffect } from 'react';
import styles from './profile.module.scss';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux"
import { getUser, logoutUser } from "../../services/user-slice.js"
import { useNavigate } from 'react-router-dom';

function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        const result = await dispatch(logoutUser())
        console.log("Logout result: ", result)
        if (result.payload.success) {
            navigate("/login")
        }
    }

    useEffect(() => {
        async function getProfile() {
            const result = await dispatch(getUser())
            if (!result.payload.success) {
                navigate("/login")
            }
            console.log("Get profile result: ", result)
        }
        getProfile()
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.list}>
                    <ul className={styles.routes}>
                        <li className={styles.route}>Профиль</li>
                        <li className={styles.route}>История заказов</li>
                        <li className={styles.route} onClick={handleLogout}>Выход</li>
                    </ul>
                    <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
                </section>
                <section className={styles.inputs}>
                    <Input type="text" placeholder="Имя" name="name" extraClass="mb-6" icon="EditIcon" />
                    <Input type="text" placeholder="Логин" name="login" icon="EditIcon" extraClass="mb-6" />
                    <Input type="password" placeholder="Пароль" name="password" icon="EditIcon" />
                </section>
            </div>
        </main>
    )
}

export default Profile;