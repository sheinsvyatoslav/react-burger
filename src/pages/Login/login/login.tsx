import { FormEvent } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useFormAndValidation } from "../../../hooks/use-form-and-validation";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login } from "../../../services/actions/auth";
import { getCookie } from "../../../utils/cookie";
import { ILocationState } from "../../../components/app/app";
import loginStyles from "./login.module.css";

const Login = () => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    isHidden,
    setIsHidden,
  } = useFormAndValidation();
  const { email, password } = values;
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      login({
        email,
        password,
        resetForm,
      })
    );
  };

  const onIconClick = () => {
    setIsHidden(!isHidden);
  };

  if (getCookie("accessToken")) {
    return <Redirect to={(location.state as ILocationState)?.from || "/"} />;
  }

  return (
    <section className={loginStyles.main}>
      <h2 className={`${loginStyles.title} text text_type_main-medium`}>
        Вход
      </h2>
      <form
        className={`${loginStyles.form} mb-20 mt-6`}
        onSubmit={handleSubmit}
      >
        <Input
          type={"email"}
          placeholder="E-mail"
          onChange={handleChange}
          value={email || ""}
          name={"email"}
          error={Boolean(errors.email)}
          errorText={errors.email}
          size={"default"}
          pattern="^.+@(\w+)\.(\w+)$"
          required
        />
        <Input
          type={isHidden ? "password" : "text"}
          placeholder="Пароль"
          onChange={handleChange}
          value={password || ""}
          name={"password"}
          error={Boolean(errors.password)}
          errorText={errors.password}
          icon={isHidden ? "ShowIcon" : "HideIcon"}
          onIconClick={onIconClick}
          size={"default"}
          required
          pattern=".{6,}"
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={!isValid}
          aria-label={"Войти"}
        >
          Войти
        </Button>
      </form>
      <p
        className={`${loginStyles.tip} text text_type_main-default text_color_inactive`}
      >
        Вы — новый пользователь?{" "}
        <Link className={loginStyles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`${loginStyles.tip} text text_type_main-default text_color_inactive mt-4`}
      >
        Забыли пароль?{" "}
        <Link className={loginStyles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
};

export default Login;
