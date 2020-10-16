const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};
// Auth Reducer
export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { ...state, authenticating: true };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
    case "USER_LOGIN_FAILURE":
      return {
        ...state,
        error: action.payload.err,
      };
    case "USER_LOGOUT_REQUEST":
      return state;
    case "USER_LOGOUT_SUCCESS":
      return {
        ...initialState,
      };
    case "USER_LOGOUT_FAILURE":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
