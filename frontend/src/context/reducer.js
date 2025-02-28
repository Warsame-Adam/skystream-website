import * as actionTypes from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SET_VISITOR_DATA:
      return {
        ...state,
        visitorData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
