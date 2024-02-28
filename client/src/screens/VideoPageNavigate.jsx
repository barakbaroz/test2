import { useEffect } from "react";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function VideoPageNavigate() {
  const navigate = useNavigate();
  const { Case } = useUser();

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
