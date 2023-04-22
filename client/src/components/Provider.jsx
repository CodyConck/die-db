import { useState } from "react";
import { AppContext, AppStateContext } from "../hooks";

export function AppProvider({ app, ...rest }) {
  return <AppContext.Provider value={app} {...rest} />;
}

export function AppStateProvider(props) {
  const state = useState({});
  return <AppStateContext.Provider value={state} {...props} />;
}