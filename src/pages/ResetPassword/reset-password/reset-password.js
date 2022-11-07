import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  setFormValue,
  toggleVisibilityPassword,
} from "../../../services/actions/form";
import { resetPassword } from "../../../services/actions/auth";
import resetPasswordStyles from "./reset-password.module.css";
import { getCookie } from "../../../utils/cookie";

const ResetPassword = () => {
  const { password, token, isFormValid } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const history = useHistory();

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
      resetPassword({
        password: password.value,
        token: token.value,
        newRoute: () => history.replace("/login"),
      })
    );
  };

  const onIconClick = () => {
    dispatch(toggleVisibilityPassword());
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
        <Input
          type={"text"}
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={token.value}
          name={"token"}
          error={!token.isValid}
          errorText={token.errorMessage}
          size={"default"}
          required
        />
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          htmlType="submit"
          disabled={!isFormValid}
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
