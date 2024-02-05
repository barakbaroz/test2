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
import ClinicPicker from "./screens/ClinicPicker";
import PurchaseQuestion from "./screens/PurchaseQuestion";
import TakingMedication from "./screens/TakingMedication";
//todo:
//1.convert all paths to kabab-case

const App = () => {
  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  { path: "", element: <Navigate to="/Panel" /> },
  { path: "login", element: <Login /> },

  {
    path: "panel",
    element: <Panel />,
    loader: panelLoader,
    errorElement: <ErrorElement />,
  },
  { path: "gister", element: <Gister /> },
  {
    path: "auth/:userId",
    element: <AuthenticationLayout />,
    children: [
      { path: "zehut", element: <ZehutQuestion /> },
      { path: "dateOfBirth", element: <DateOfBirthQuestion /> },
      { path: "department", element: <DepartmentQuestion /> },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      { path: "legal", element: <Legal /> },
      {
        path: "first-new",
        children: [
          { path: "start", element: <Start type="firstNew" /> },
          {
            path: "character-selection",
            element: <CharacterSelection />,
          },
          { path: "clinic-picker", element: <ClinicPicker /> },
          { path: "video", element: <VideoPage /> },
        ],
      },
      {
        path: "second-new",
        children: [
          { path: "start", element: <Start type="secondNew" /> },
          {
            path: "character-selection",
            element: <CharacterSelection />,
          },
          { path: "purchase-question", element: <PurchaseQuestion /> },
          { path: "taking-medication", element: <TakingMedication /> },
          { path: "video", element: <VideoPage /> },
        ],
      },
      {
        path: "first-old",
        children: [
          { path: "start", element: <Start type="firstOld" /> },
          {
            path: "character-selection",
            element: <CharacterSelection />,
          },
          { path: "video", element: <VideoPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default App;
