import AuthWrapper from "../../components/auth-wrapper/auth-wrapper";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.scss";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "../../components/app/app"
import { loginUser, setUser } from "../../services/reducers/user-slice"
import { useNavigate, useLocation } from "react-router-dom";

type RequestResult = {
  payload: {
    success: boolean
  }
}

type State = {
  email: string,
  password: string
}

const Login = (): React.JSX.Element => {

    const [form, setForm] = useState<State>({ email: "", password: "" });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function sumbitForm(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const result = await dispatch(loginUser(form)) as RequestResult;
        if (result.payload.success) {
            const userSet = await dispatch(setUser()) as RequestResult;
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