# PMR JS

## Demo

Github repository for demo website [here](https://github.com/msx47/reddit-lite)

Live demo [here](https://redditlite-6f953.web.app/)

### Experimental state management library for react

Redux like state management in react with less boilerplate and a simple to use hook.

I started a project to learn more about event driven functional JS but somehow ended up with this.

The project still has a lot of shortcomings which I will fix as I learn more.

## About

Written in Typescript

Includes a demo react app using the library

No dependency other than react ofc

I wrote all utility functions for deep / shallow diffs, deep copy for arrays / objects from scratch

Has a lot of monkey-patching all over the place which I plan to fix soon

## Install

```bash
npm install pmrjs
```

```bash
yarn add pmrjs
```

## Usage Example

This follows redux style of code

Creating a store (store.js)

```bash
import { createStore, createStoreHook } from "pmrjs"
import { reducer } from "./reducer"

export const store = createStore(reducer);

export const useStore = createStoreHook(store);
```

Reducer function (reducer.js)

```bash
const initialState = {
    isAuth: false,
    loading: {
      postsLoading: false,
    },
    posts: [],
    user: {},
  }

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHORIZED":
      return {
        ...state,
        isAuth: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: { ...(action.payload as ProfileData) },
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
      };
    case "LOADING_POSTS":
      return {
        ...state,
        loading: {
          ...state.loading,
          postsLoading: true,
        },
      };
    case "LOADED_POSTS":
      return {
        ...state,
        loading: {
          ...state.loading,
          postsLoading: false,
        },
        posts: action.payload.posts,
      };
    default:
      return state;
  }
}

```

Actions (actions.js)

```bash
export const login = (state, history) => {

  fetch(
    `http://localhost:3000/results?email=${state.email}&login.password=${state.password}`
  )
    .then((res) => res.json())

    .then((res) => {

      if (res.length) {
        store.dispatch({
          type: "AUTH_LOADED",
        });
        store.dispatch({
          type: "USER_LOADED",
          payload: res[0],
        });
        history.push("/");
      } else {
        console.log("Error - Invalid Details");
      }
    })
    .catch((err) => console.log(err));
};
```

Usage inside a component (Login.jsx)

```bash
import {login} from "./actions"
import { ConnectHoc } from "pmrjs";
import { useStore } from "./store";

function Login() {
  const [data] = useStore(Login) #pass component reference to useStore

  return (
    #JSX
    <input type="email">
    <input type="password">
    <button onClick={() => login("email and password values")}>
    {
      data.isAuth ? <p>Logged In</p> : <p>Logged Out</p>
    }
  )
}

const mapState = (state) => ({
  isAuth: state.isAuth,
});

export default ConnectHoc(Login, mapState);

```

## Development

### Run

> Clone this repository

> npm install

To Start the demo

> npm start

Run lint checks

> npm run lint

Build

> npm run build
