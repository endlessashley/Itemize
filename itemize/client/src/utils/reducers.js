import { useReducer } from "react";
import {
  UPDATE_BOOKS,
  ADD_TO_SHELF,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_MULTIPLE_TO_SHELF,
  UPDATE_SHELF_QUANTITY,
  // REMOVE_FROM_SHELF,
  CLEAR_SHELF,
  TOGGLE_SHELF,
  ADD_READBOOK,
  REMOVE_READBOOK,
  UPDATE_NOVELS,
} from "./actions";

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {



        case UPDATE_NOVELS:
            return {
              ...state,
              novels: [...action.novels],
            };
      


    default:
      return state;
  }
};

export function useBookReducer(initialState) {
  return useReducer(reducer, initialState)
}