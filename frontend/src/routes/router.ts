import Layout from "@/components/layout/Layout";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import UserProfile from "@/pages/UserProfile";
import PostDetail from "@/pages/PostDetail";
import Saved from "@/pages/Saved";
import RequireAuth from "./RequireAuth";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "posts/:slug", Component: PostDetail },
      { path: "users/:userId", Component: UserProfile },
      {
        // rute koje zahtevaju prijavu
        Component: RequireAuth,
        children: [
          { path: "profile", Component: Profile },
          { path: "saved", Component: Saved },
        ],
      },
    ],
  },
  {
    path: "auth",
    Component: Auth,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
