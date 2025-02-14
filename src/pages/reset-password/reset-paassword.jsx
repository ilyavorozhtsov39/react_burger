import styles from './reset-password.module.scss';
import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { setNewPassword } from '../../api/user';
import { useState } from "react";

function ResetPassword() {

    const [form, setForm] = useState({ password: "", token: "" });
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function submitForm(e) {
        e.preventDefault();
        const result = await setNewPassword(form);
        if (result.success) {
            navigate("/login");
        }
        console.log(result)
    }

    return (
        <AuthWrapper title="Восстановление пароля">
            <PasswordInput name="password" value={form.password} placeholder="Введите новый пароль" extraClass="mb-6" onChange={handleChange} />
            <Input name="token" value={form.token} type="text" placeholder="Введите код из письма" extraClass="mb-6" onChange={handleChange} />
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={submitForm}>
                Восстановить
            </Button>
            <p className={styles.text}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </AuthWrapper>
    )
}

export default ResetPassword;