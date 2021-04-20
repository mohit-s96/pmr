export interface ReducerAction {
  type?: string;
  payload?: unknown;
}

export type Reducer = (state: {} | any, action: ReducerAction) => {} | any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateSlice = (state: {}) => {} | any;

export interface listeners {
  // eslint-disable-next-line @typescript-eslint/ban-types
  listener: React.Dispatch<React.SetStateAction<{}>>;
  reduxState: Array<string>;
}
