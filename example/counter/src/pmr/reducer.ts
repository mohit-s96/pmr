import { Reducer, ReducerAction } from 'pmrjs/dist/core/interfaces';
import { StoreState } from './interfaces';

export const reducer: Reducer = (
  state: StoreState = {
    loading: false,
    one: 0,
    two: 0,
    users: [],
  },
  action: ReducerAction
) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        one: state.one + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        two: state.two - 1,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'LOADED':
      return {
        ...state,
        loading: false,
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, ...(action.payload as [])],
      };
    default:
      return state;
  }
};
