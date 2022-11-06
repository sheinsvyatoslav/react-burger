export const FORM_SET_VALUE = "REGISTER_FORM_SET_VALUE";
export const FORM_CLEAR = "FORM_CLEAR";
export const TOGGLE_VISIBILITY_PASSWORD = "TOGGLE_VISIBILITY_PASSWORD";
export const SET_EDIT_MODE = "SET_EDIT_MODE";
export const OFF_EDIT_MODE = "OFF_EDIT_MODE";

export const setFormValue = (
  field,
  value,
  isValid,
  errorMessage,
  isFormValid
) => ({
  type: FORM_SET_VALUE,
  field,
  value,
  isValid,
  errorMessage,
  isFormValid,
});

export const setEditMode = (field) => ({
  type: SET_EDIT_MODE,
  field,
});

export const toggleVisibilityPassword = () => ({
  type: TOGGLE_VISIBILITY_PASSWORD,
});

export const clearForm = () => ({
  type: FORM_CLEAR,
});

export const offEditMode = () => ({
  type: OFF_EDIT_MODE,
});
