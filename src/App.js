import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import AllTasks from "./pages/AllTasks";
import { useState } from "react";
import AuthContext from "./store/context";
import UserTasks from "./pages/UserTasks";

function App() {
  const restoredAuth = JSON.parse(window.sessionStorage.getItem("auth")) || {};
  const [auth, setAuth] = useState(restoredAuth);
  const updateAuth = (newDetails = {}) => {
    const x = { ...newDetails };
    // console.log(x);
    setAuth(x);
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <CreateTask />
            </RequireAuth>
          }
        />
        <Route
          path="/all"
          element={
            <RequireAuth>
              <AllTasks />
            </RequireAuth>
          }
        />
        <Route
          path="/tasks/:user"
          element={
            <RequireAuth>
              <UserTasks />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
