import { useContext, createContext } from "react";

export const DispatchContext = createContext(null);

export function useDispatchContext() {
    return useContext(DispatchContext);
}