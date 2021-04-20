import React from 'react';
import { StateSlice } from '../interfaces';
import {
  getObjectMatchFromFunctionString,
  getStateSlice,
} from '../utils/utiFuntions';
export function ConnectHoc(
  Component_: React.FunctionComponent,
  stateSlice: StateSlice
): React.FunctionComponent {
  if (typeof Component_ !== 'function' || typeof stateSlice !== 'function') {
    throw new Error('Invalid argument type to connect');
  }

  const objArray = getObjectMatchFromFunctionString(String(stateSlice));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Component_ as any).reduxState = objArray;

  return Component_;
}

export const createStoreHook = (store: any) => {
  return function useStore(comp: React.FunctionComponent): Array<any> {
    const [state, setState] = React.useState({});

    React.useEffect(() => {
      const uns = store.subscribe(setState, (comp as any).reduxState);
      setState(getStateSlice(store.getData(), (comp as any).reduxState));
      return () => {
        uns();
      };
    }, []);
    return [state];
  };
};
