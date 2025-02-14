import React, { useEffect } from 'react';
import styles from './profile.module.scss';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux"
import { getUser } from "../../services/user-slice.js"

function Profile() {

    const dispatch = useDispatch();

    useEffect(() => {
        async function getProfile() {
            const result = await dispatch(getUser())
            console.log(result)
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
                        <li className={styles.route}>Выход</li>
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