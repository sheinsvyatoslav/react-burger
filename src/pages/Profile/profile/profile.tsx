import { FormEvent, useEffect, MouseEvent } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFormAndValidation } from "../../../hooks/use-form-and-validation";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { logout } from "../../../services/slices/auth";
import { getUser, updateUser } from "../../../services/slices/user";

import profileStyles from "./profile.module.css";

interface IIconEventTarget extends EventTarget {
  closest: (elem: string) => HTMLElement;
}

const Profile = () => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    editMode,
    setEditMode,
    setIsValid,
  } = useFormAndValidation();
  const { name, email, password } = values;

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(logout({ newRoute: () => history.replace("/login") }));
  };

  const onIconClick = (e: MouseEvent) => {
    e.preventDefault();
    const target = (e.target as IIconEventTarget)
      .closest(".input")
      .getElementsByTagName("input")[0];
    setEditMode({
      ...editMode,
      [target.name]: editMode[target.name] ? !editMode[target.name] : true,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: name || user.name,
        email: email || user.email,
        password: password || user.password,
      })
    );
    setEditMode({});
    setIsValid(false);
  };

  const handleResetForm = (e: FormEvent) => {
    e.preventDefault();
    resetForm();
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
          value={name || user.name || ""}
          name={"name"}
          error={Boolean(errors.name)}
          errorText={errors.name}
          icon={editMode.name ? "CheckMarkIcon" : "EditIcon"}
          onIconClick={onIconClick}
          size={"default"}
          disabled={!editMode.name}
          required
          maxLength={30}
        />
        <Input
          type={"email"}
          placeholder="E-mail"
          onChange={handleChange}
          value={email || user.email || ""}
          name={"email"}
          error={Boolean(errors.email)}
          errorText={errors.email}
          icon={editMode.email ? "CheckMarkIcon" : "EditIcon"}
          onIconClick={onIconClick}
          size={"default"}
          disabled={!editMode.email}
          pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+"
          required
        />
        <Input
          type={"password"}
          placeholder="Пароль"
          onChange={handleChange}
          value={password || user.password || ""}
          name={"password"}
          error={Boolean(errors.password)}
          errorText={errors.password}
          icon={editMode.password ? "CheckMarkIcon" : "EditIcon"}
          onIconClick={onIconClick}
          size={"default"}
          disabled={!editMode.password}
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
            disabled={!isValid}
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
