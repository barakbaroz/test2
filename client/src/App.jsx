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
import panelLoader from "./Loaders/panelLoader";
import ZehutQuestion from "./screens/ZehutQuestion";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import DateOfBirthQuestion from "./screens/DateOfBirthQuestion";
import DepartmentQuestion from "./screens/DepartmentQuestion";
import QuestionnaireProvider from "./providers/QuestionnaireProvider";
import VideoPageNavigate from "./screens/VideoPageNavigate";
import VideoPageHeart from "./screens/VideoPageHeart";
import VideoPageAtrial from "./screens/VideoPageAtrial";

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
    path: "auth/:userId/:sending",
    element: <AuthenticationLayout />,
    children: [
      { path: "zehut", element: <ZehutQuestion /> },
      { path: "date-of-birth", element: <DateOfBirthQuestion /> },
      { path: "department", element: <DepartmentQuestion /> },
    ],
  },
  {
    path: "user/:sending",
    element: <UserLayout />,
    children: [
      { path: "legal", element: <Legal /> },
      { path: "start", element: <Start /> },
      { path: "character-selection", element: <CharacterSelection /> },
      {
        path: "questionnaire/:questionKey",
        element: <QuestionnaireProvider />,
      },
      { path: "video-page", element: <VideoPageNavigate /> },
      { path: "video-page-heart", element: <VideoPageHeart /> },
      { path: "video-page-atrial", element: <VideoPageAtrial /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default App;
