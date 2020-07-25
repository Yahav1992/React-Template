import { useContext, createContext } from "react";

export const StateContext = createContext(null);

export function useStateContext() {
    return useContext(StateContext);
}