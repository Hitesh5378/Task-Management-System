import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoute, PublicRoute } from "./routes";
import { Dashboard, Login, Registration, Todo } from "./screens";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
