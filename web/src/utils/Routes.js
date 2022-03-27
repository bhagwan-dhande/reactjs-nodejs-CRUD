import Home from "../pages/Home";
import Login from "../pages/manager/Login";
import Registration from "../pages/manager/Registration";
export const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/register",
    component: Registration,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
];
