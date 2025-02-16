import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { loginUser, setUser } from "../../services/user-slice.js"
import { useNavigate, useLocation } from "react-router-dom";

function Login() {

    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function sumbitForm(e) {
        e.preventDefault();
        const result = await dispatch(loginUser(form));
        if (result.payload.success) {
            const userSet = await dispatch(setUser())
            if (userSet.payload.success) {
              navigate(from, { replace: true });
            }
        } else {
          console.log("Error: ", result)
        }
    }

  return (
    <AuthWrapper title="Вход">
        <form className={styles.form} onSubmit={sumbitForm}>
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
            extraClass="mb-20">
              Войти
          </Button>
        </form>
        <p className={styles.text}>Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
        <p className={styles.text}>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
    </AuthWrapper>
  );
}

export default Login;