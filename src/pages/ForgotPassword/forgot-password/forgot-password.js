import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import forgotPasswordStyles from "./forgot-password.module.css";
import { restorePassword } from "../../../services/actions/auth";
import { setFormValue } from "../../../services/actions/form";

const ForgotPassword = () => {
  const { email, isFormValid } = useSelector((state) => state.form);
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
      restorePassword({
        email: email.value,
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
          value={email.value}
          name={"email"}
          error={!email.isValid}
          errorText={email.errorMessage}
          size={"default"}
          pattern="^.+@(\w+)\.(\w+)$"
          required
        />
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          htmlType="submit"
          disabled={!isFormValid}
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
