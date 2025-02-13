import styles from "./forgot-password.module.scss";
import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { Link } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
    return (
        <AuthWrapper title="Восстановление пароля">
            <EmailInput name="email" placeholder="Укажите e-mail" extraClass="mb-6" />
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
                Восстановить
            </Button>
            <p className={styles.text}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </AuthWrapper>
    )
}

export default ForgotPassword;