import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./register.module.scss";

function Register() {
    return (
        <AuthWrapper title="Регистрация">
            <Input type="text" placeholder="Имя" name="name" size="default" extraClass="mb-6" />
            <EmailInput name="email" placeholder="E-mail" extraClass="mb-6" />
            <PasswordInput name="password" placeholder="Пароль" extraClass="mb-6" />
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
                Зарегистрироваться
            </Button>
            <p className={styles.text}>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
        </AuthWrapper>
    )
}

export default Register;