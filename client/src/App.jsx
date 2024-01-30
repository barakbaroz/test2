import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
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
import ClinicPicker from "./screens/ClinicPicker";
import PurchaseQuestion from "./screens/PurchaseQuestion";
import TakingMedication from "./screens/TakingMedication";

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
      { path: "Legal", element: <Legal /> },
      {
        path: "first-new",
        element: <Outlet />,
        children: [
          { path: "Start", element: <Start type="firstNew" /> },
          {
            path: "CharacterSelection",
            element: <CharacterSelection />,
          },
          { path: "ClinicPicker", element: <ClinicPicker /> },
          { path: "Video", element: <VideoPage /> },
        ],
      },
      {
        path: "second-new",
        element: <Outlet />,
        children: [
          { path: "Start", element: <Start type="secondNew" /> },
          {
            path: "CharacterSelection",
            element: <CharacterSelection />,
          },
          { path: "PurchaseQuestion", element: <PurchaseQuestion /> },
          { path: "TakingMedication", element: <TakingMedication /> },
          { path: "Video", element: <VideoPage /> },
        ],
      },
      {
        path: "first-old",
        element: <Outlet />,
        children: [
          { path: "Start", element: <Start type="firstOld" /> },
          {
            path: "CharacterSelection",
            element: <CharacterSelection />,
          },
          { path: "Video", element: <VideoPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default App;
