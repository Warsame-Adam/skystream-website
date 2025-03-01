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
    case actionTypes.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case actionTypes.SET_AIRLINES:
      return {
        ...state,
        airlines: action.payload,
      };
    case actionTypes.SET_AIRPORTS:
      return {
        ...state,
        airports: action.payload,
      };
    case actionTypes.SET_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
