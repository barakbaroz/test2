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
import QuestionnaireProvider from "./providers/QuestionnaireProvider";
import ClinicPicker from "./screens/ClinicPicker";
import PurchaseQuestion from "./screens/PurchaseQuestion";
import TakingMedication from "./screens/TakingMedication";

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
          { path: "start", element: <Start sendingType="firstNew" /> },
          {
            path: "character-selection",
            element: <CharacterSelection />,
          },
          {
            path: "questionnaire",
            children: [{ path: ":questionKey", element: <ClinicPicker /> }],
            element: <QuestionnaireProvider />,
          },
          { path: "video", element: <VideoPage /> },
        ],
      },
      {
        path: "second-new",
        children: [
          { path: "start", element: <Start sendingType="secondNew" /> },
          {
            path: "character-selection",
            element: <CharacterSelection />,
          },
          {
            path: "questionnaire",
            children: [
              { path: "purchased-medicine", element: <PurchaseQuestion /> },
              { path: "taking-medication", element: <TakingMedication /> },
            ],
            element: <QuestionnaireProvider />,
          },
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
