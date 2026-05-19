import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Kuryeye (dispatch) yeteneklerini öğretiyoruz
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Dedektife (selector) dükkandaki rafları (state) öğretiyoruz
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
