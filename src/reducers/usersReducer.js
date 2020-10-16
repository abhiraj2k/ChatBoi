const initialState = {
  users: [],
  conversations: [],
};
// User Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_REALTIME_USERS_REQUEST":
      return state;
    case "GET_REALTIME_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload.users,
      };
    case "GET_REALTIME_MESSAGES":
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    case "GET_REALTIME_MESSAGES_FAILURE":
      return {
        ...state,
        conversations: action.payload.conversations,
      };

    default:
      return state;
  }
};
