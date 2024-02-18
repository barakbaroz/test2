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
import Question from "./components/Questionnaire/Question";

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
    path: "auth/:userId/:sendingType",
    element: <AuthenticationLayout />,
    children: [
      { path: "zehut", element: <ZehutQuestion /> },
      { path: "date-of-birth", element: <DateOfBirthQuestion /> },
      { path: "department", element: <DepartmentQuestion /> },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      { path: "legal", element: <Legal /> },
      {
        path: ":userType",
        children: [
          { path: "start", element: <Start /> },
          { path: "character-selection", element: <CharacterSelection /> },
          {
            path: "questionnaire",
            children: [{ path: ":questionKey", element: <Question /> }],
            element: <QuestionnaireProvider />,
          },
          { path: "video", element: <VideoPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default App;
