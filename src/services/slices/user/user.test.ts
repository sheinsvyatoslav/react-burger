import { expect } from "@jest/globals";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { USER_URL } from "../../../utils/api-constants";
import { TThunkAction } from "../../../utils/types";

import userReducer, {
  getUser,
  getUserFailed,
  getUserPending,
  getUserSuccess,
  initialState,
  updateUser,
  updateUserFailed,
  updateUserPending,
  updateUserSuccess,
} from "./user";
import { UserState } from "./user";

const middlewares = [thunk];
const mockStore = configureMockStore<UserState, TThunkAction>(middlewares);

describe("User reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("Check initial state", () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("Get user success", () => {
    fetchMock.getOnce(USER_URL, {
      status: 200,
      user: {
        name: "user",
        email: "123456@mail.ru",
      },
      success: true,
    });

    const expectedActions = [
      getUserPending(),
      getUserSuccess({
        name: "user",
        email: "123456@mail.ru",
      }),
    ];
    const store = mockStore(initialState);

    return store.dispatch(getUser() as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(
        userReducer(
          initialState,
          getUserSuccess({
            name: "user",
            email: "123456@mail.ru",
          })
        )
      ).toEqual({
        ...initialState,
        user: { name: "user", email: "123456@mail.ru" },
        getUserState: "success",
      });
    });
  });

  it("Get user failed", () => {
    fetchMock.getOnce(USER_URL, {
      status: 400,
      success: false,
    });

    const expectedActions = [getUserPending(), getUserFailed()];
    const store = mockStore(initialState);

    return store.dispatch(getUser() as any).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(userReducer(initialState, getUserFailed())).toEqual({
        ...initialState,
        getUserState: "failed",
      });
    });
  });

  it("Update user success", () => {
    fetchMock.patchOnce(USER_URL, {
      status: 200,
      user: {
        name: "me",
        password: 123456,
        email: "654321@mail.ru",
      },
      success: true,
    });

    const expectedActions = [
      updateUserPending(),
      updateUserSuccess({
        name: "me",
        password: 123456,
        email: "654321@mail.ru",
      }),
    ];
    const store = mockStore(initialState);

    return store
      .dispatch(
        updateUser({
          name: "me",
          password: 123456,
          email: "654321@mail.ru",
        }) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(
          userReducer(
            initialState,
            updateUserSuccess({
              name: "me",
              password: 123456,
              email: "654321@mail.ru",
            })
          )
        ).toEqual({
          ...initialState,
          user: {
            name: "me",
            password: 123456,
            email: "654321@mail.ru",
          },
          updateUserState: "success",
        });
      });
  });

  it("Update user failed", () => {
    fetchMock.patchOnce(USER_URL, {
      status: 400,
      success: false,
    });

    const expectedActions = [updateUserPending(), updateUserFailed()];
    const store = mockStore(initialState);

    return store
      .dispatch(
        updateUser({
          name: "me",
          password: 123456,
          email: "654321@mail.ru",
        }) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(userReducer(initialState, updateUserFailed())).toEqual({
          ...initialState,
          updateUserState: "failed",
        });
      });
  });
});
