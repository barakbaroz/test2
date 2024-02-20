import { useContext, useEffect } from "react";
import { userContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// import VideoPageSecondAtrial from "./VideoPageSecondAtrial";

export default function VideoPageNavigate() {
  const navigate = useNavigate();
  const { Case } = useContext(userContext);

  useEffect(() => {
    const { instructions } = Case;
    if (instructions.includes("atrial-fibrillation"))
      return navigate("../video-page-atrial");
    if (instructions.includes("heart-failure"))
      return navigate("../video-page-heart");
    return navigate("../not-found");
  }, [Case, navigate]);

  return <Loader />;
}
