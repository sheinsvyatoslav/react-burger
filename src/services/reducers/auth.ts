import {
  REGISTER_SUBMIT,
  REGISTER_SUBMIT_SUCCESS,
  REGISTER_SUBMIT_FAILED,
  RESTORE_SUBMIT,
  RESTORE_SUBMIT_SUCCESS,
  RESTORE_SUBMIT_FAILED,
  RESET_SUBMIT,
  RESET_SUBMIT_SUCCESS,
  RESET_SUBMIT_FAILED,
  LOGIN_SUBMIT,
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT_FAILED,
  LOGOUT_SUBMIT,
  LOGOUT_SUBMIT_SUCCESS,
  LOGOUT_SUBMIT_FAILED,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
} from "../actions/auth";
import { AnyAction } from "redux";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
  },

  registrationRequest: false,
  registrationFailed: false,

  restoreRequest: false,
  restoreFailed: false,

  resetRequest: false,
  resetFailed: false,

  loginRequest: false,
  loginFailed: false,

  refreshTokenRequest: false,
  refreshTokenFailed: false,
};

export const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REGISTER_SUBMIT: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      };
    }
    case REGISTER_SUBMIT_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
      };
    }
    case REGISTER_SUBMIT_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
      };
    }
    case RESTORE_SUBMIT: {
      return {
        ...state,
        restoreRequest: true,
        restoreFailed: false,
      };
    }
    case RESTORE_SUBMIT_SUCCESS: {
      return {
        ...state,
        restoreRequest: false,
      };
    }
    case RESTORE_SUBMIT_FAILED: {
      return {
        ...state,
        restoreRequest: false,
        restoreFailed: true,
      };
    }
    case RESET_SUBMIT: {
      return {
        ...state,
        resetRequest: true,
        resetFailed: false,
      };
    }
    case RESET_SUBMIT_SUCCESS: {
      return {
        ...state,
        resetRequest: false,
      };
    }
    case RESET_SUBMIT_FAILED: {
      return {
        ...state,
        resetRequest: false,
        resetFailed: true,
      };
    }
    case LOGIN_SUBMIT: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUBMIT_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
      };
    }
    case LOGIN_SUBMIT_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case LOGOUT_SUBMIT: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUBMIT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
      };
    }
    case LOGOUT_SUBMIT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        refreshTokenRequest: true,
        refreshTokenFailed: false,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
