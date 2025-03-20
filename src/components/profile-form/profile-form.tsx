import styles from './profile-form.module.scss'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from "../app/app"
import { setUser } from "../../services/reducers/user-slice"
import { modifyUser } from "../../services/reducers/user-slice"
import type { IUser } from '../../utils/types'

type State = {
    user: IUser
}

type TState = {
    name: string,
    login: string,
    password: string
}

const ProfileForm = () => {

    const [form, setForm] = useState<TState>({  name: "", login: "", password: "" });
    const [initialData, setInitialData] = useState<TState>({  name: "", login: "", password: "" });
    const [ formChanged, toggleFormChanged ] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const userState = useAppSelector((state: State) => state.user)

    function changeUserInfo(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        dispatch(modifyUser(form))
        dispatch(setUser())
    }

    function cancelChange() {
        setForm({ name: initialData.name, login: initialData.login, password: "" })
        toggleFormChanged(false)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) { 
        toggleFormChanged(true)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (userState.isAuth) {
            setForm({ name: userState.user.name, login: userState.user.email, password: "" })
            setInitialData({ name: userState.user.name, login: userState.user.email, password: "" })
        }
    }, [userState])

    return (
        <form className={styles.inputs} onSubmit={changeUserInfo}>
            <Input type="text" placeholder="Имя" name="name" extraClass="mb-6" icon="EditIcon" value={form.name} onChange={handleChange} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
            <Input type="text" placeholder="Логин" name="login" icon="EditIcon" extraClass="mb-6" value={form.login} onChange={handleChange} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
            <Input type="password" placeholder="Пароль" name="password" icon="EditIcon" value={form.password} onChange={handleChange} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
            {
                formChanged &&
                <div className={styles.buttons}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="mt-15 mr-4">Сохранить</Button>
                    <Button htmlType="button" type="primary" size="medium" onClick={cancelChange} extraClass="mt-15 ml-4">Отменить</Button>
                </div>
            }
        </form>
    )
}

export default ProfileForm;