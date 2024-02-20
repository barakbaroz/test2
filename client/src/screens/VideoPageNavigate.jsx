import { useContext } from "react";
import { userContext } from "../providers/UserProvider";
import { useParams } from "react-router-dom";
import VideoPageHeart from "./VideoPageHeart";
import VideoPageFirstAtrial from "./VideoPageFirstAtrial";
// import VideoPageSecondAtrial from "./VideoPageSecondAtrial";

function VideoPageNavigate() {
  const { Case } = useContext(userContext);
  const { sending } = useParams();

  if (!Case.AtrialFibrillation) return <VideoPageHeart />;
  if (sending === "first") return <VideoPageFirstAtrial />;
  // if (Case.HeartFailure) return <VideoPageSecondAtrial />;
}

export default VideoPageNavigate;
