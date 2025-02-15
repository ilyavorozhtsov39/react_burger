import styles from "./forgot-password.module.scss";
import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { resetPassword } from "../../api/user.js";

function ForgotPassword() {

    const [form, setForm] = useState({ email: "" });
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function submitForm(e) {
        e.preventDefault();
        const result = await resetPassword(form);
        if (result.success) {
            navigate("/reset-password", { state: { from: "/forgot-password" }});
        }
        console.log("Reset password request: ", result)
    }

    return (
        <AuthWrapper title="Восстановление пароля">
            <EmailInput name="email" placeholder="Укажите e-mail" extraClass="mb-6" onChange={handleChange} value={form.email} />
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={submitForm}>
                Восстановить
            </Button>
            <p className={styles.text}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </AuthWrapper>
    )
}

export default ForgotPassword;