/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { Reducer, ReducerAction, listeners } from './interfaces';
import {
  deepCopyObject,
  objectComparator,
  compareArrayToObject,
  getStateSlice,
} from './utils/utiFuntions';

export function createStore(reducer: Reducer) {
  let state: {};
  let arr: Array<listeners> = [];
  function getData() {
    return state;
  }
  function dispatch(action: ReducerAction) {
    const prevState = deepCopyObject({}, state);
    state = reducer(state, action);
    const { objDiff } = objectComparator();
    const diffState = objDiff(state, prevState);
    arr.forEach(function(x) {
      //   console.log(x.reduxState);
      const shouldUpdate = compareArrayToObject(diffState, x.reduxState);
      if (shouldUpdate) {
        const dataNeeded = getStateSlice(getData(), x.reduxState);
        x.listener(dataNeeded);
      }
    });
  }
  function subscribe(
    listener: React.Dispatch<React.SetStateAction<{}>>,
    reduxState: Array<string>
  ) {
    arr.push({ listener, reduxState });

    return function() {
      arr = arr.filter(x => x.listener !== listener);
    };
  }

  dispatch({});
  return { getData: getData, dispatch: dispatch, subscribe: subscribe };
}
