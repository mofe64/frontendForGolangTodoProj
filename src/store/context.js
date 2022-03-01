import React from "react";
const AuthContext = React.createContext({
  auth: {
    userId: null,
    token: null,
    name: null,
    email: null,
    type: [],
  },
  // eslint-disable-next-line no-unused-vars
  setAuth: (authObj = {}) => {},
});

export default AuthContext;
