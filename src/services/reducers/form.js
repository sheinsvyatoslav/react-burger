import {
  FORM_SET_VALUE,
  FORM_CLEAR,
  TOGGLE_VISIBILITY_PASSWORD,
  SET_EDIT_MODE,
  OFF_EDIT_MODE,
} from "../actions/form";

const initialState = {
  name: {
    value: "",
    isValid: true,
    errorMessage: "",
    editMode: false,
  },
  email: {
    value: "",
    isValid: true,
    errorMessage: "",
    editMode: false,
  },
  password: {
    value: "",
    isValid: true,
    isHidden: true,
    editMode: false,
    errorMessage: "",
  },
  token: {
    value: "",
    isValid: true,
    errorMessage: "",
  },

  isFormValid: false,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SET_VALUE: {
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.value,
          isValid: action.isValid,
          errorMessage: action.errorMessage,
        },
        isFormValid: action.isFormValid,
      };
    }
    case FORM_CLEAR: {
      return {
        ...initialState,
      };
    }
    case TOGGLE_VISIBILITY_PASSWORD: {
      return {
        ...state,
        password: {
          ...state.password,
          isHidden: !state.password.isHidden,
        },
      };
    }
    case SET_EDIT_MODE: {
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          editMode: !state[action.field].editMode,
        },
      };
    }
    case OFF_EDIT_MODE: {
      return {
        ...state,
        name: {
          ...state.name,
          editMode: false,
        },
        email: {
          ...state.email,
          editMode: false,
        },
        password: {
          ...state.password,
          editMode: false,
        },
        isFormValid: false,
      };
    }
    default: {
      return state;
    }
  }
};
