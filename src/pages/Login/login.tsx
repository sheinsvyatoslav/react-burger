import { FormEvent } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { LocationStateProps } from "../../components/app/app";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useFormAndValidation } from "../../hooks/use-form-and-validation";
import { login } from "../../services/slices/auth/auth";
import { getCookie } from "../../utils/cookie";

import styles from "./login.module.scss";

export const Login = () => {
  const { values, handleChange, errors, isValid, resetForm, isHidden, setIsHidden } =
    useFormAndValidation();
  const { email, password } = values;
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(
        login({
          email,
          password,
          resetForm,
        })
      );
    }
  };

  const onIconClick = () => {
    setIsHidden(!isHidden);
  };

  if (getCookie("accessToken")) {
    return <Redirect to={(location.state as LocationStateProps)?.from ?? "/"} />;
  }

  return (
    <section className={styles.main}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
      <form className={`${styles.form} mb-20 mt-6`} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={email ?? ""}
          name="email"
          error={Boolean(errors.email)}
          errorText={errors.email}
          size="default"
          pattern="^.+@(\w+)\.(\w+)$"
          required
          data-at-selector="login-email-input"
        />
        <Input
          type={isHidden ? "password" : "text"}
          placeholder="Пароль"
          onChange={handleChange}
          value={password?.toString() ?? ""}
          name="password"
          error={Boolean(errors.password)}
          errorText={errors.password}
          icon={isHidden ? "ShowIcon" : "HideIcon"}
          onIconClick={onIconClick}
          size="default"
          required
          pattern=".{6,}"
          data-at-selector="login-password-input"
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={!isValid}
          aria-label="Войти"
          data-at-selector="login-button"
        >
          Войти
        </Button>
      </form>
      <p className={`${styles.tip} text text_type_main-default text_color_inactive`}>
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className={`${styles.tip} text text_type_main-default text_color_inactive mt-4`}>
        Забыли пароль?{" "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
};
