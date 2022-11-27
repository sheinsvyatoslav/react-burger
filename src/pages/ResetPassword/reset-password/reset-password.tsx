import { FormEvent } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { resetPassword } from "../../../services/slices/auth";
import { getCookie } from "../../../utils/cookie";
import { useFormAndValidation } from "../../../hooks/use-form-and-validation";
import resetPasswordStyles from "./reset-password.module.css";

const ResetPassword = () => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    isHidden,
    setIsHidden,
  } = useFormAndValidation();
  const { password, token } = values;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password,
        token,
        resetForm,
        newRoute: () => history.replace("/login"),
      })
    );
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
    <section className={resetPasswordStyles.main}>
      <h2 className={`${resetPasswordStyles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <form
        className={`${resetPasswordStyles.container} mb-20 mt-6`}
        onSubmit={handleSubmit}
      >
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
        <Input
          type={"text"}
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={token || ""}
          name={"token"}
          error={Boolean(errors.token)}
          errorText={errors.token}
          size={"default"}
          required
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={!isValid}
          aria-label={"Сохранить"}
        >
          Сохранить
        </Button>
      </form>
      <p
        className={`${resetPasswordStyles.tip} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?{" "}
        <Link className={resetPasswordStyles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default ResetPassword;
