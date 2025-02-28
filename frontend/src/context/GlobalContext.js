import React, { createContext, useReducer } from "react";

import * as actionTypes from "./actions";
import reducer from "./reducer";

const initialState = {
  user: null,
  visitorData: null,
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setAuth(user) {
    dispatch({
      type: actionTypes.SET_USER,
      payload: user,
    });
  }
  function setVisitorData(visitorInfo) {
    dispatch({
      type: actionTypes.SET_VISITOR_DATA,
      payload: visitorInfo,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        setAuth,
        visitorData: state.visitorData,
        setVisitorData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
