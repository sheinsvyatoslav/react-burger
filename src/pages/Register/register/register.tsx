import { FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormAndValidation } from "../../../hooks/use-form-and-validation";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { register } from "../../../services/slices/auth";
import registerStyles from "./register.module.css";

const Register = () => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    isHidden,
    setIsHidden,
    resetForm,
  } = useFormAndValidation();
  const { name, email, password } = values;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      register({
        email,
        password,
        name,
        resetForm,
        newRoute: () => history.replace("/"),
      })
    );
  };

  const onIconClick = () => {
    setIsHidden(!isHidden);
  };

  return (
    <section className={registerStyles.main}>
      <h2 className={`${registerStyles.title} text text_type_main-medium`}>
        Регистрация
      </h2>
      <form
        className={`${registerStyles.form} mb-20 mt-6`}
        onSubmit={handleSubmit}
      >
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={handleChange}
          value={name || ""}
          name={"name"}
          error={Boolean(errors.name)}
          errorText={errors.name}
          size={"default"}
          required
          maxLength={30}
        />
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
          aria-label={"Зарегистрироваться"}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${registerStyles.tip} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы?{" "}
        <Link className={registerStyles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
