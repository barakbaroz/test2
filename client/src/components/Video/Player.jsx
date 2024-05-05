import { useCallback } from "react";
import axios from "axios";
import { Player as GistPlayer } from "@gistmed/gist-ui";
import styled from "styled-components";
import { useContext } from "react";
import { useUser } from "../../providers/UserProvider";
import { LanguageContext } from "../Translation";
import useVideo, { procedureMapper } from "../../hooks/useVideo";
import PropTypes from "prop-types";
import videoThumbnail from "../../assets/videoThumbnail.png";
import { useParams } from "react-router-dom";

function Player({ setShowFeedback, type, videoRef }) {
  const { Case, Questionnaires } = useUser();
  const { language } = useContext(LanguageContext);
  const { sending } = useParams();

  const { video } = useVideo({ language, type, Case, Questionnaires });

  const onLocationUpdate = useCallback(
    (percentage, location) => {
      axios.post("/api/user/userVideoAction", {
        type: `watched-video-${type}-${sending}`,
        data: { percentage, location },
      });
    },
    [type, sending]
  );

  const onPlayerPlaying = useCallback(() => {
    setShowFeedback(true);
  }, [setShowFeedback]);

  return (
    <VideoContainer>
      <GistPlayer
        src={video.src}
        autoFullScreen={false}
        audioStartDelay={3}
        onLocationUpdate={onLocationUpdate}
        onPlayerPlaying={onPlayerPlaying}
        thumbnail={videoThumbnail}
        passedRef={videoRef}
      />
    </VideoContainer>
  );
}

export default Player;

Player.propTypes = {
  setShowFeedback: PropTypes.func,
  type: PropTypes.oneOf(Object.keys(procedureMapper)),
  videoRef: PropTypes.object,
};

const VideoContainer = styled.div`
  margin-inline: 15px;
  margin-block-start: 36px;
`;
