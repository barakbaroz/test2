import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./stylings/fonts.css";
import Start from "./screens/Start";
import Legal from "./components/TOS/Legal";
import Panel from "./screens/Panel";
import Gister from "./screens/Gister";
import Login from "./screens/Login";
import UserLayout from "./layouts/UserLayout";
import ErrorElement from "./screens/ErrorElement";
import NotFound from "./screens/NotFound";
import CharacterSelection from "./screens/CharacterSelection";
import VideoPage from "./screens/VideoPage";
import panelLoader from "./Loaders/panelLoader";
import ZehutQuestion from "./screens/ZehutQuestion";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import DateOfBirthQuestion from "./screens/DateOfBirthQuestion";
import DepartmentQuestion from "./screens/DepartmentQuestion";

const App = () => {
  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  { path: "", element: <Navigate to="/Panel" /> },
  { path: "Login", element: <Login /> },

  {
    path: "Panel",
    element: <Panel />,
    loader: panelLoader,
    errorElement: <ErrorElement />,
  },
  { path: "Gister", element: <Gister /> },
  {
    path: "Auth/:userId",
    element: <AuthenticationLayout />,
    children: [
      { path: "Zehut", element: <ZehutQuestion /> },
      { path: "DateOfBirth", element: <DateOfBirthQuestion /> },
      { path: "Department", element: <DepartmentQuestion /> },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      { path: "Start", element: <Start /> },
      { path: "Video", element: <VideoPage /> },
      { path: "Legal", element: <Legal /> },
      { path: "CharacterSelection", element: <CharacterSelection /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default App;
