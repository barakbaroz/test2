import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./stylings/fonts.css";
// import Panel from "./screens/Panel";
// import Gister from "./screens/Gister";
import Start from "./screens/Start";
import Legal from "./components/Form/Legal";
// import VideoPage from "./screens/VideoPage";
// import NotFound from "./screens/NotFound";
import Privacy from "./components/Form/Privacy";

import Login from "./screens/Login";
import Questionnaire from "./screens/Questionnaire";
import QuestionnaireValidation from "./screens/QuestionnaireValidation";
import Instructions from "./screens/Instructions";
import UserLayout from "./layouts/UserLayout";
import ErrorElement from "./screens/Error";
import NotFound from "./screens/NotFound";
import CharacterSelection from "./screens/CharacterSelection";
// import ErrorElement from "./screens/Error";

const App = () => {
  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  { index: true, element: <Navigate to="/Panel" /> },
  { path: "Login", element: <Login /> },

  // { path: "Panel", element: <Panel /> },
  // { path: "Gister", element: <Gister /> },
  {
    path: "user/:userId",
    element: <UserLayout />,
    errorElement: <ErrorElement />,
    children: [
      { path: "Start", element: <Start /> },
      { path: "Questionnaire", element: <Questionnaire /> },
      { path: "QuestionnaireValidation", element: <QuestionnaireValidation /> },
      { path: "Instructions", element: <Instructions /> },
      { path: "Legal", element: <Legal /> },
      { path: "Privacy", element: <Privacy /> },
      { path: "CharacterSelection", element: <CharacterSelection /> },
      // { path: "VideoPage", element: <VideoPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default App;
