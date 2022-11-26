import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  GET_TOTAL_PRICE,
} from "../actions/order";
import { TCard } from "../../utils/constants";
import { AnyAction } from "redux";

const initialState = {
  createOrderRequest: false,
  createOrderFailed: false,
  orderNumber: 0,

  totalPrice: 0,
};

export const orderReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        createOrderRequest: true,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createOrderFailed: false,
        orderNumber: action.orderNumber,
        createOrderRequest: false,
      };
    }
    case CREATE_ORDER_FAILED: {
      return { ...state, createOrderFailed: true, createOrderRequest: false };
    }
    case GET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice:
          action.noBunIngredients && action.bun
            ? action.noBunIngredients.reduce(
                (acc: number, item: TCard) => acc + item.price,
                0
              ) +
              action.bun.price * 2
            : 0,
      };
    }
    default: {
      return state;
    }
  }
};
