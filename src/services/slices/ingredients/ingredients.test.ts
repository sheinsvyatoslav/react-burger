import { expect } from "@jest/globals";
import fetchMock from "fetch-mock";
import { AnyAction } from "redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { ThunkActionType } from "../../..";
import { BASE_URL } from "../../../utils/api-constants";
import {
  secondIngredient,
  testBunIngredient,
  testNoBunIngredient,
} from "../../../utils/constants";

import ingredientsReducer, {
  addConstructorIngredient,
  clearConstructor,
  deleteConstructorIngredient,
  getIngredients,
  getIngredientsFailed,
  getIngredientsPending,
  getIngredientsSuccess,
  IngredientsState,
  initialState,
  updateConstructorList,
} from "./ingredients";

const middlewares = [thunk];
const mockStore = configureMockStore<IngredientsState, ThunkActionType>(
  middlewares
);

describe("Ingredients reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("Check initial state", () => {
    expect(ingredientsReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("Get ingredients success", () => {
    fetchMock.getOnce(`${BASE_URL}/ingredients`, {
      status: 200,
      data: [{}, {}, {}],
      success: true,
    });

    const expectedActions = [
      getIngredientsPending(),
      getIngredientsSuccess([{}, {}, {}]),
    ];

    const store = mockStore(initialState);

    return store.dispatch(getIngredients() as unknown as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(
        ingredientsReducer(initialState, getIngredientsSuccess([{}, {}, {}]))
      ).toEqual({
        ...initialState,
        ingredients: [{}, {}, {}],
        getIngredientsState: "success",
      });
    });
  });

  it("Get ingredients failed", () => {
    fetchMock.getOnce(`${BASE_URL}/ingredients`, {
      status: 400,
      success: false,
    });

    const expectedActions = [getIngredientsPending(), getIngredientsFailed()];
    const store = mockStore(initialState);

    return store.dispatch(getIngredients() as unknown as AnyAction).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(ingredientsReducer(initialState, getIngredientsFailed())).toEqual({
        ...initialState,
        getIngredientsState: "failed",
      });
    });
  });

  it("Add bun to the constructor", () => {
    expect(
      ingredientsReducer(
        initialState,
        addConstructorIngredient({
          draggedIngridient: testBunIngredient,
          dragId: "test-dragId",
        })
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: {
        ...initialState.constructorIngredients,
        bun: {
          ...testBunIngredient,
          dragId: "test-dragId",
        },
      },
    });
  });

  it("Add ingredient(no bun) to the constructor", () => {
    expect(
      ingredientsReducer(
        initialState,
        addConstructorIngredient({
          draggedIngridient: testNoBunIngredient,
          dragId: "test-dragId",
        })
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: {
        ...initialState.constructorIngredients,
        noBunIngredients: [
          {
            ...testNoBunIngredient,
            dragId: "test-dragId",
          },
        ],
      },
      ingredientsCount: {
        "test-id": 1,
      },
    });
  });

  it("Delete ingredient from the constructor", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          constructorIngredients: {
            ...initialState.constructorIngredients,
            noBunIngredients: [
              {
                ...testNoBunIngredient,
                dragId: "test-dragId",
              },
            ],
          },
          ingredientsCount: {
            "test-id": 1,
          },
        },
        deleteConstructorIngredient({
          ...testNoBunIngredient,
          dragId: "test-dragId",
        })
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: {
        ...initialState.constructorIngredients,
        noBunIngredients: [],
      },
      ingredientsCount: {
        "test-id": 0,
      },
    });
  });

  it("Update the constructor", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          constructorIngredients: {
            bun: null,
            noBunIngredients: [
              {
                ...testNoBunIngredient,
                dragId: "first-dragId",
              },
              {
                ...secondIngredient,
                dragId: "second-dragId",
              },
            ],
          },
        },
        updateConstructorList([
          {
            ...secondIngredient,
            dragId: "second-dragId",
          },
          {
            ...testNoBunIngredient,
            dragId: "first-dragId",
          },
        ])
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: {
        ...initialState.constructorIngredients,
        noBunIngredients: [
          {
            ...secondIngredient,
            dragId: "second-dragId",
          },
          {
            ...testNoBunIngredient,
            dragId: "first-dragId",
          },
        ],
      },
    });
  });

  it("Clear the constructor", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          constructorIngredients: {
            bun: {
              ...testBunIngredient,
              dragId: "test-dragId",
            },
            noBunIngredients: [
              {
                ...testNoBunIngredient,
                dragId: "test-dragId",
              },
            ],
          },
          ingredientsCount: {
            "test-id": 1,
          },
        },
        clearConstructor()
      )
    ).toEqual(initialState);
  });
});
