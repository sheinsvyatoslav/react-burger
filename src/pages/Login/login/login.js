import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  setFormValue,
  toggleVisibilityPassword,
} from "../../../services/actions/form";
import { login } from "../../../services/actions/auth";
import loginStyles from "./login.module.css";

const Login = () => {
  const { email, password, isFormValid } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const target = e.target;
    dispatch(
      setFormValue(
        target.name,
        target.value,
        target.checkValidity(),
        target.validationMessage,
        target.closest("form").checkValidity()
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: email.value,
        password: password.value,
      })
    );
  };

  const onIconClick = () => {
    dispatch(toggleVisibilityPassword());
  };

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
          value={email.value}
          name={"email"}
          error={!email.isValid}
          errorText={email.errorMessage}
          size={"default"}
          pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required
        />
        <Input
          type={password.isHidden ? "password" : "text"}
          placeholder="Пароль"
          onChange={handleChange}
          value={password.value}
          name={"password"}
          error={!password.isValid}
          errorText={password.errorMessage}
          icon={password.isHidden ? "ShowIcon" : "HideIcon"}
          onIconClick={onIconClick}
          size={"default"}
          required
          pattern=".{6,}"
        />
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          htmlType="submit"
          disabled={!isFormValid}
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
