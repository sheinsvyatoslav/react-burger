import { getUserRequest, updateUserRequest } from "../../utils/main-api";
import { getCookie, setCookie } from "../../utils/cookie";
import { refreshToken } from "./auth";
import { TThunkAction } from "../../utils/constants";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

type TUser = {
  email: string;
  password: number;
  name: string;
}

export const getUser = (): TThunkAction => {
  return (dispatch) => {
    dispatch({ type: GET_USER });
    getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: {
              name: res.user.name,
              email: res.user.email,
              password: getCookie("password"),
            },
          });
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "jwt expired") {
          dispatch(refreshToken(getUser()));
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      });
  };
};

export const updateUser = ({ email, password, name }: TUser): TThunkAction => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER,
    });
    updateUserRequest({ email, password, name })
      .then((res) => {
        if (res && res.success) {
          setCookie("password", password);
          dispatch({ type: UPDATE_USER_SUCCESS });
        } else {
          dispatch({ type: UPDATE_USER_FAILED });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "jwt expired") {
          dispatch(refreshToken(updateUser({ email, password, name })));
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      });
  };
};
