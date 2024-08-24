// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminDashboard from "./Components/AdminDashboard";
import EditorDashboard from "./Components/EditorDashboard";
import ViewerDashboard from "./Components/ViewerDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <PrivateRoute role="editor">
              <EditorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewer"
          element={
            <PrivateRoute role="viewer">
              <ViewerDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

const PrivateRoute = ({ role, children }) => {
  const { authState } = React.useContext(AuthContext);

  if (authState.token && authState.role === role) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default App;
