import { FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch } from "../../hooks/redux-hooks";
import { useFormAndValidation } from "../../hooks/use-form-and-validation";
import { restorePassword } from "../../services/slices/auth/auth";

import styles from "./forgot-password.module.scss";

export const ForgotPassword = () => {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const { email } = values;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      dispatch(
        restorePassword({
          email,
          resetForm,
          newRoute: () => history.replace("/reset-password"),
        })
      );
    }
  };

  return (
    <section className={styles.main}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h2>
      <form className={`${styles.container} mb-20 mt-6`} onSubmit={handleSubmit}>
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
        />
        <Button type="primary" size="medium" htmlType="submit" disabled={!isValid} aria-label={"Восстановить"}>
          Восстановить
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
