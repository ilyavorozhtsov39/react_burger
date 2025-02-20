import styles from './reset-password.module.scss';
import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { setNewPassword } from '../../api/user';
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

const ResetPassword = (): React.JSX.Element => {

    const [form, setForm] = useState({ password: "", token: "" });
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function submitForm(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const result = await setNewPassword(form);
        if (result.success) {
            navigate("/login");
        }
        console.log("Reset password result: ", result)
    }

    useEffect(() => {
        if (from !== "/forgot-password") {
            navigate("/login");
        }
    }, [])

    return (
        <AuthWrapper title="Восстановление пароля">
            <form className={styles.form} onSubmit={submitForm}>
                <PasswordInput name="password" value={form.password} placeholder="Введите новый пароль" extraClass="mb-6" onChange={handleChange} />
                <Input name="token" value={form.token} type="text" placeholder="Введите код из письма" extraClass="mb-6" onChange={handleChange} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />
                <Button htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
                    Восстановить
                </Button>
            </form>
            <p className={styles.text}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </AuthWrapper>
    )
}

export default ResetPassword;