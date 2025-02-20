import styles from "./forgot-password.module.scss";
import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { resetPassword } from "../../api/user";


type ResetPasswordResult = {
    success: boolean
}

const ForgotPassword = (): React.JSX.Element => {

    const [form, setForm] = useState({ email: "" });
    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function submitForm(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const result: ResetPasswordResult = await resetPassword(form);
        if (result.success) {
            navigate("/reset-password", { state: { from: "/forgot-password" }});
        }
        console.log("Reset password request: ", result)
    }

    return (
        <AuthWrapper title="Восстановление пароля">
            <form className={styles.form} onSubmit={submitForm}>
                <EmailInput name="email" placeholder="Укажите e-mail" extraClass="mb-6" onChange={handleChange} value={form.email} />
                <Button htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
                    Восстановить
                </Button>
            </form>
            <p className={styles.text}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </AuthWrapper>
    )
}

export default ForgotPassword;