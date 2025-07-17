import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "logged/in":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logged/out":
      return initialState;

    default:
      return new Error("Unique action type");
  }
}

const FakeAuthContext = createContext();
function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function loggedIn(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({
        type: "logged/in",
        payload: FAKE_USER,
      });
  }
  function loggedOut() {
    dispatch({ type: "logged/out" });
  }

  return (
    <FakeAuthContext.Provider
      value={{ user, isAuthenticated, loggedIn, loggedOut }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
}
function useAuthentication() {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw new Error(
      "Authentication context was used outside authentication provider"
    );
  return context;
}
export { FakeAuthProvider, useAuthentication };

/*
1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
