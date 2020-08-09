import { useReducer, useEffect } from "react";
import reducerz, { SET_DATA } from "./reducers/appDataReducer"; 

export default function useAppData() {
 
  const [state, dispatch] = useReducer(reducerz, {})
 

  return { state, dispatch };
}
