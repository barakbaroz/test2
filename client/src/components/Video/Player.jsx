import { useCallback } from "react";
import axios from "axios";
import { Player as GistPlayer } from "@gistmed/gist-ui";
import styled from "styled-components";
import { useContext } from "react";
import { useUser } from "../../providers/UserProvider";
import { LanguageContext } from "../Translation";
import { useMemo } from "react";
import useVideoUrl from "../../hooks/useVideoUrl";
import PropTypes from "prop-types";
import videoThumbnail from "../../assets/videoThumbnail.png";

function Player({ setShowFeedback }) {
  const userInfo = useUser();
  const { language } = useContext(LanguageContext);
  const params = useMemo(() => {
    const { Avatar, heartConditions, symptoms } = userInfo.Case;
    return {
      ...Avatar,
      language,
      heartConditions,
      symptoms,
      hospital: "clalit",
    };
  }, [language, userInfo]);

  const { videoUrl } = useVideoUrl(params, "heart-failure-community");

  const onLocationUpdate = useCallback((percentage, location) => {
    axios.post("/api/user/userVideoAction", {
      type: "watched-video",
      data: { percentage, location },
    });
  }, []);

  const onPlayerPlaying = useCallback(() => {
    setShowFeedback(true);
  }, [setShowFeedback]);

  return (
    <VideoContainer>
      <GistPlayer
        src={videoUrl}
        autoFullScreen={false}
        audioStartDelay={3}
        onLocationUpdate={onLocationUpdate}
        onPlayerPlaying={onPlayerPlaying}
        thumbnail={videoThumbnail}
      />
    </VideoContainer>
  );
}

export default Player;

Player.propTypes = {
  setShowFeedback: PropTypes.func,
};

const VideoContainer = styled.div`
  margin-inline: 15px;
`;
