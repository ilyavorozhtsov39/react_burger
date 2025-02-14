import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { loginUser } from "../../services/user-slice.js"

function Login() {

    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    function sumbitForm(e) {
        e.preventDefault();
        dispatch(loginUser(form));
        // console.log("submit")
    }

  return (
    <AuthWrapper title="Вход">
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
          htmlType="button" 
          type="primary" 
          size="medium" 
          extraClass="mb-20"
          onClick={sumbitForm}>
            Войти
        </Button>
        <p className={styles.text}>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
        <p className={styles.text}>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
    </AuthWrapper>
  );
}

export default Login;