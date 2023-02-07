import { createSlice } from "@reduxjs/toolkit";

import { ThunkActionType } from "../../..";
import { getCookie, setCookie } from "../../../utils/cookie";
import { getUserRequest, updateUserRequest } from "../../../utils/main-api";
import { refreshToken } from "../auth/auth";

export type User = {
  email: string;
  password: number;
  name: string;
};

export type UserState = {
  user: User | null;
  getUserState: string;
  updateUserState: string;
};

export const initialState: UserState = {
  user: null,
  getUserState: "idle",
  updateUserState: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending(state) {
      state.getUserState = "pending";
    },
    getUserSuccess(state, action) {
      state.getUserState = "success";
      state.user = action.payload;
    },
    getUserFailed(state) {
      state.getUserState = "failed";
    },
    updateUserPending(state) {
      state.updateUserState = "pending";
    },
    updateUserSuccess(state, action) {
      state.updateUserState = "success";
      state.user = action.payload;
    },
    updateUserFailed(state) {
      state.updateUserState = "failed";
    },
  },
});

export const {
  getUserPending,
  getUserSuccess,
  getUserFailed,
  updateUserPending,
  updateUserSuccess,
  updateUserFailed,
} = userSlice.actions;

export const getUser = (): ThunkActionType => {
  return async (dispatch) => {
    dispatch(getUserPending());
    return getUserRequest()
      .then((res) => {
        dispatch(
          getUserSuccess({
            name: res.user.name,
            email: res.user.email,
            password: getCookie("password"),
          })
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "invalid token" || err.message === "jwt expired") {
          dispatch(refreshToken(getUser()));
        } else {
          dispatch(getUserFailed());
        }
      });
  };
};

export const updateUser = ({
  email,
  password,
  name,
}: User): ThunkActionType => {
  return async (dispatch) => {
    dispatch(updateUserPending());
    return updateUserRequest({ email, password, name })
      .then(() => {
        setCookie("password", password);
        dispatch(updateUserSuccess({ name, email, password }));
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "invalid token" || err.message === "jwt expired") {
          dispatch(refreshToken(updateUser({ email, password, name })));
        } else {
          dispatch(updateUserFailed());
        }
      });
  };
};

export default userSlice.reducer;
