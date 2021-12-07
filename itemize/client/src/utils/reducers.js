import { useReducer } from "react";

import { ADD_NOVEL } from './utils/mutations';

export const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case ADD_NOVEL:
        return {
          ...state,
          novels: [...state.novels, action.name, action.author, action.rank, action.isComplete]
        };
    default:
        return state;
    }
};
export function useListReducer(initialState){
    return useReducer (reducer, initialState)
}