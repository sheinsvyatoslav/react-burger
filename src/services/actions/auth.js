import {
  registerRequest,
  restorePasswordRequest,
  resetPasswordRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
} from "../../utils/auth-api";
import { clearForm } from "./form";
import { setCookie, clearCookie } from "../../utils/cookie";

export const REGISTER_SUBMIT = "REGISTER_SUBMIT";
export const REGISTER_SUBMIT_SUCCESS = "REGISTER_SUBMIT_SUCCESS";
export const REGISTER_SUBMIT_FAILED = "REGISTER_SUBMIT_FAILED";

export const RESTORE_SUBMIT = "RESTORE_SUBMIT";
export const RESTORE_SUBMIT_SUCCESS = "RESTORE_SUBMIT_SUCCESS";
export const RESTORE_SUBMIT_FAILED = "RESTORE_SUBMIT_FAILED";

export const RESET_SUBMIT = "RESET_SUBMIT";
export const RESET_SUBMIT_SUCCESS = "RESET_SUBMIT_SUCCESS";
export const RESET_SUBMIT_FAILED = "RESET_SUBMIT_FAILED";

export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_FAILED = "LOGIN_SUBMIT_FAILED";

export const LOGOUT_SUBMIT = "LOGOUT_SUBMIT";
export const LOGOUT_SUBMIT_SUCCESS = "LOGOUT_SUBMIT_SUCCESS";
export const LOGOUT_SUBMIT_FAILED = "LOGOUT_SUBMIT_FAILED";

export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const register = ({ email, password, name, newRoute }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_SUBMIT });
    registerRequest({ email, password, name })
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: REGISTER_SUBMIT_SUCCESS });
          dispatch(clearForm());
          dispatch(login({ email, password, newRoute }));
          newRoute();
        } else {
          dispatch({ type: REGISTER_SUBMIT_FAILED });
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        dispatch({ type: REGISTER_SUBMIT_FAILED });
      });
  };
};

export const restorePassword = ({ email, newRoute }) => {
  return (dispatch) => {
    dispatch({ type: RESTORE_SUBMIT });
    restorePasswordRequest(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESTORE_SUBMIT_SUCCESS });
          dispatch(clearForm());
          setCookie("message", res.message);
          newRoute();
        } else {
          dispatch({ type: RESTORE_SUBMIT_FAILED });
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        dispatch({ type: RESTORE_SUBMIT_FAILED });
      });
  };
};

export const resetPassword = ({ password, token, newRoute }) => {
  return (dispatch) => {
    dispatch({ type: RESET_SUBMIT });
    resetPasswordRequest({ password, token })
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESET_SUBMIT_SUCCESS });
          dispatch(clearForm());
          clearCookie("message");
          newRoute();
        } else {
          dispatch({ type: RESET_SUBMIT_FAILED });
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        dispatch({ type: RESET_SUBMIT_FAILED });
      });
  };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUBMIT });
    loginRequest({ email, password })
      .then((res) => {
        if (res && res.success) {
          let authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("accessToken", authToken);
            setCookie("password", password);
          }
          setCookie("refreshToken", res.refreshToken);
          dispatch({ type: LOGIN_SUBMIT_SUCCESS });
          dispatch(clearForm());
        } else {
          dispatch({ type: LOGIN_SUBMIT_FAILED });
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        dispatch({ type: LOGIN_SUBMIT_FAILED });
      });
  };
};

export const logout = (newRoute) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_SUBMIT });
    logoutRequest()
      .then((res) => {
        if (res && res.success) {
          clearCookie("accessToken");
          clearCookie("refreshToken");
          clearCookie("password");
          newRoute();
          dispatch({ type: LOGOUT_SUBMIT_SUCCESS });
        } else {
          dispatch({ type: LOGOUT_SUBMIT_FAILED });
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
        dispatch({ type: LOGOUT_SUBMIT_FAILED });
      });
  };
};

export const refreshToken = (afterRefresh) => (dispatch) => {
  refreshTokenRequest().then((res) => {
    let authToken = res.accessToken.split("Bearer ")[1];
    setCookie("accessToken", authToken);
    setCookie("refreshToken", res.refreshToken);
    dispatch(afterRefresh);
  });
};
