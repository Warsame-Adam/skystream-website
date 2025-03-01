import React, { createContext, useReducer } from "react";

import * as actionTypes from "./actions";
import reducer from "./reducer";

const initialState = {
  user: null,
  visitorData: null,
  locations: [],
  airlines: [],
  airports: [],
  classes: [],
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

  function setLocationsData(locations) {
    dispatch({
      type: actionTypes.SET_LOCATIONS,
      payload: locations,
    });
  }

  function setAirlinesData(airlines) {
    dispatch({
      type: actionTypes.SET_AIRLINES,
      payload: airlines,
    });
  }

  function setAirportsData(airports) {
    dispatch({
      type: actionTypes.SET_AIRPORTS,
      payload: airports,
    });
  }

  function setClassesData(classes) {
    dispatch({
      type: actionTypes.SET_CLASSES,
      payload: classes,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        setAuth,
        visitorData: state.visitorData,
        setVisitorData,
        locations: state.locations,
        setLocationsData,
        airlines: state.airlines,
        setAirlinesData,
        airports: state.airports,
        setAirportsData,
        classes: state.classes,
        setClassesData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
