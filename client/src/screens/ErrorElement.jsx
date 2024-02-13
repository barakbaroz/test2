import { useRouteError, Navigate } from "react-router-dom";
import Error from "../components/Error";

function ErrorElement() {
  const error = useRouteError();
  console.log(error.response);
  if (error.response?.status === 401) return <Navigate to="/login" />;
  if (error.response?.status === 403) return <Navigate to="/login" />;
  if (error.response?.status === 404) return <Navigate to="/NotFound" />;
  return <Error />;
}

export default ErrorElement;
