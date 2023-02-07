import { FormEvent } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch } from "../../hooks/redux-hooks";
import { useFormAndValidation } from "../../hooks/use-form-and-validation";
import { resetPassword } from "../../services/slices/auth/auth";
import { getCookie } from "../../utils/cookie";

import styles from "./reset-password.module.scss";

export const ResetPassword = () => {
  const { values, handleChange, errors, isValid, resetForm, isHidden, setIsHidden } = useFormAndValidation();
  const { password, token } = values;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password && token) {
      dispatch(
        resetPassword({
          password,
          token,
          resetForm,
          newRoute: () => history.replace("/login"),
        })
      );
    }
  };

  const onIconClick = () => {
    setIsHidden(!isHidden);
  };

  if (!getCookie("message")) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  return (
    <section className={styles.main}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h2>
      <form className={`${styles.container} mb-20 mt-6`} onSubmit={handleSubmit}>
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
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={token ?? ""}
          name="token"
          error={Boolean(errors.token)}
          errorText={errors.token}
          size="default"
          required
        />
        <Button type="primary" size="medium" htmlType="submit" disabled={!isValid} aria-label="Сохранить">
          Сохранить
        </Button>
      </form>
      <p className={`${styles.tip} text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
};
