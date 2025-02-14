import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./register.module.scss";
import { useState } from "react";

function Register() {

    const [form, setForm] = useState({  name: "", email: "", password: "" });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    function sumbitForm(e) {
        e.preventDefault();
        console.log("submit")
    }

    return (
        <AuthWrapper title="Регистрация">
            <form action="" className={styles.form} onSubmit={sumbitForm}>
                <Input 
                    type="text" 
                    placeholder="Имя" 
                    name="name" 
                    value={form.name} 
                    size="default" 
                    extraClass="mb-6"
                    onChange={handleChange}
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