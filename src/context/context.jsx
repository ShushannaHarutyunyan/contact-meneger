import { createContext, useContext, useReducer } from "react";
import { SET_SETTINGS } from "./actions/types";

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

const initialSettings = {
  inlineEdit: false,
  inlineAdd: false,
  listView: true
};

export const AppProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(appReducer, initialSettings);
  return (
    <AppContext.Provider value={settings}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

function appReducer(settings, action) {
  console.log(action.payload);
  switch (action.type) {
    //action.payload
    case SET_SETTINGS:
      return {
        ...settings,
        ...action.payload               
      };

    default:
      return {
        ...settings
      };
  }
}

export function useSettings() {
  return useContext(AppContext);
}

export function useSettingsDispatch() {
  return useContext(AppDispatchContext);
}
