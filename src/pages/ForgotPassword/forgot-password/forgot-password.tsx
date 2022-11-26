import { FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { restorePassword } from "../../../services/actions/auth";
import { useFormAndValidation } from "../../../hooks/use-form-and-validation";
import forgotPasswordStyles from "./forgot-password.module.css";
import { useAppDispatch } from "../../../hooks/redux-hooks";


const ForgotPassword = () => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const { email } = values;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      restorePassword({
        email,
        resetForm,
        newRoute: () => history.replace("/reset-password"),
      })
    );
  };

  return (
    <section className={forgotPasswordStyles.main}>
      <h2
        className={`${forgotPasswordStyles.title} text text_type_main-medium`}
      >
        Восстановление пароля
      </h2>
      <form
        className={`${forgotPasswordStyles.container} mb-20 mt-6`}
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
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={!isValid}
          aria-label={"Восстановить"}
        >
          Восстановить
        </Button>
      </form>
      <p
        className={`${forgotPasswordStyles.tip} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?{" "}
        <Link className={forgotPasswordStyles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default ForgotPassword;
