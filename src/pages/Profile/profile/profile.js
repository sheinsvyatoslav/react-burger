import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import {
  setFormValue,
  setEditMode,
  clearForm,
  offEditMode,
} from "../../../services/actions/form";
import profileStyles from "./profile.module.css";
import { logout } from "../../../services/actions/auth";
import { getUser, updateUser } from "../../../services/actions/user";

const Profile = () => {
  const { name, email, password, isFormValid } = useSelector(
    (state) => state.form
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const onIconClick = (e) => {
    e.preventDefault();
    const target = e.target.closest(".input").getElementsByTagName("input")[0];
    dispatch(setEditMode(target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: name.value || user.name,
        email: email.value || user.email,
        password: password.value || user.password,
      })
    );
    dispatch(offEditMode());
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    dispatch(clearForm());
  };

  return (
    <section className={profileStyles.main}>
      <div className={`${profileStyles.sidebar} mr-15`}>
        <NavLink
          to="/profile"
          className={`${profileStyles.link} text text_type_main-medium`}
          activeClassName={profileStyles.selected}
          exact
        >
          Профиль
        </NavLink>
        <NavLink
          to="/orders"
          className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={profileStyles.selected}
          exact
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={profileStyles.selected}
          onClick={handleLogout}
          exact
        >
          Выход
        </NavLink>
        <p
          className={`${profileStyles.tip} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form
        className={`${profileStyles.container} mb-20`}
        onReset={handleResetForm}
        onSubmit={handleSubmit}
      >
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={handleChange}
          value={name.value || user.name || ""}
          name={"name"}
          error={!name.isValid}
          errorText={name.errorMessage}
          icon={name.editMode ? "CheckMarkIcon" : "EditIcon"}
          onIconClick={onIconClick}
          size={"default"}
          disabled={!name.editMode}
          required
          maxLength="30"
        />
        <Input
          type={"email"}
          placeholder="E-mail"
          onChange={handleChange}
          value={email.value || user.email || ""}
          name={"email"}
          error={!email.isValid}
          errorText={email.errorMessage}
          icon={email.editMode ? "CheckMarkIcon" : "EditIcon"}
          onIconClick={onIconClick}
          size={"default"}
          disabled={!email.editMode}
          pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+"
          required
        />
        <Input
          type={"password"}
          placeholder="Пароль"
          onChange={handleChange}
          value={password.value || user.password || ""}
          name={"password"}
          error={!password.isValid}
          errorText={password.errorMessage}
          icon={password.editMode ? "CheckMarkIcon" : "EditIcon"}
          onIconClick={onIconClick}
          size={"default"}
          disabled={!password.editMode}
          required
          pattern=".{6,}"
        />
        <div className={profileStyles.buttons}>
          <Button
            type="secondary"
            size="medium"
            htmlType="reset"
            onClick={handleResetForm}
            aria-label={"Отменить"}
          >
            Отменить
          </Button>
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            aria-label={"Сохранить"}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
