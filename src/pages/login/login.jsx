import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";

function Login() {
  return (
    <AuthWrapper title="Вход">
        <EmailInput name="email" placeholder="E-mail" extraClass="mb-6" />
        <PasswordInput name="password" placeholder="Пароль" extraClass="mb-6" />
        <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
            Войти
        </Button>
        <p className={styles.text}>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
        <p className={styles.text}>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
    </AuthWrapper>
  );
}

export default Login;