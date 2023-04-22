import { createContext, useContext } from "react";

export const AppContext = createContext();
export const useApp = () => {
  return useContext(AppContext);
};

export const AppStateContext = createContext();
export const useAppState = () => {
  return useContext(AppStateContext);
};