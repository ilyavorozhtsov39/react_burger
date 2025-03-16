import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.scss";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { useAppDispatch } from "../../components/app/app"
import { registerUser } from "../../services/user-slice"

type RequestResult = {
    payload: {
      success: boolean
    }
}

type TState = {
    name: string,
    email: string,
    password: string
}

const Register = (): React.JSX.Element => {

    const [form, setForm] = useState<TState>({  name: "", email: "", password: "" });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    async function sumbitForm(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const result = await dispatch(registerUser(form)) as RequestResult;
        if (result.payload.success) {
            navigate("/login")
        }
    }

    return (
        <AuthWrapper title="Регистрация">
            <form className={styles.form} onSubmit={sumbitForm}>
                <Input 
                    type="text" 
                    placeholder="Имя" 
                    name="name" 
                    value={form.name} 
                    size="default" 
                    extraClass="mb-6"
                    onChange={handleChange}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                <EmailInput 
                    name="email" 
                    value={form.email} 
                    placeholder="E-mail" 
                    extraClass="mb-6"
                    onChange={handleChange}
                />
                <PasswordInput 
                    name="password" 
                    value={form.password} 
                    placeholder="Пароль" 
                    extraClass="mb-6"
                    onChange={handleChange}
                />
                <Button 
                    htmlType="submit" 
                    type="primary" 
                    size="medium" 
                    extraClass={styles.button}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <p className={styles.text}>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
        </AuthWrapper>
    )
}

export default Register;