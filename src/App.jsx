import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/Login";
import Main from "./layouts/Main";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";

import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Registration from "./pages/registerForm/RegistrationForm";
import Profile from "./pages/profile/Profile";
import ErrorPage from "./pages/errorPage/ErrorPage";
import { useEffect } from "react";
import "./styles/global.css";
import { useSelector } from "react-redux";

import routes from "./routes/routes";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/Errorpage",
      element: <ErrorPage />,
    },
    {
      path: "/",
      element: <Main />,
      children: routes,
    },
  ]);

  const theme = useSelector((select) => select.theme.theme);

  useEffect(() => {
    const existingLink = document.getElementById("theme-stylesheet");
    if (existingLink) {
      existingLink.parentNode.removeChild(existingLink);
    }

    const cssFile =
      theme === "dark" ? "../src/styles/dark.css" : "../src/styles/light.css";

    const link = document.createElement("link");
    link.id = "theme-stylesheet";
    link.rel = "stylesheet";
    link.href = cssFile;
    document.head.appendChild(link);

    console.log(
      `${theme.charAt(0).toUpperCase() + theme.slice(1)} theme loaded`
    );

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
