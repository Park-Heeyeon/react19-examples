import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { React18Features, React19Features } from "./pages";
import type { ComponentType } from "react";
import "./App.css";

type RouteItem = {
  path: string;
  name?: string;
  redirect?: string;
  element?: ComponentType;
};

function App() {
  const routes: RouteItem[] = [
    { path: "/", redirect: "/react-18" },
    { name: "React 18 Features", path: "/react-18", element: React18Features },
    { name: "React 19 Features", path: "/react-19", element: React19Features },
  ];

  return (
    <BrowserRouter>
      <h1>React 18/19 Features</h1>

      <nav>
        {routes
          .filter((r) => r.name)
          .map((r) => (
            <Link key={r.path} to={r.path} className="navItem">
              {r.name}
            </Link>
          ))}
      </nav>

      <Routes>
        {routes.map((r) =>
          r.redirect ? (
            <Route
              key={r.path}
              path={r.path}
              element={<Navigate to={r.redirect} replace />}
            />
          ) : (
            <Route
              key={r.path}
              path={r.path}
              element={r.element && <r.element />}
            />
          )
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
