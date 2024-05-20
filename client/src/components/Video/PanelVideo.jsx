import PropTypes from "prop-types";
import styled from "styled-components";
import X_Icon from "../../assets/Icons/white_X.svg";
import useVideo from "../../hooks/useVideo";
import { Player as GistPlayer } from "@gistmed/gist-ui";
import videoThumbnail from "../../assets/videoThumbnail.png";
import { useMemo } from "react";

const PanelVideo = ({ close, item, show }) => {
  const { language } = item.User;
  const type = item.AtrialFibrillation
    ? "atrial-fibrillation"
    : "heart-failure";

  const Questionnaires = useMemo(() => {
    return Object.fromEntries(
      item.User.Questionnaires.map(({ answerKey, questionKey }) => [
        answerKey,
        questionKey,
      ])
    );
  }, [item.User.Questionnaires]);

  const { video } = useVideo({ language, Case: item, type, Questionnaires });

  if (!show) return <></>;

  return (
    <Modal>
      <Close src={X_Icon} onClick={close}></Close>
      <VideoWrapper>
        <GistPlayer
          src={video.src}
          audioStartDelay={3}
          thumbnail={videoThumbnail}
          backgroundMusic={backgroundMusicMapper[type]}
        />
      </VideoWrapper>
    </Modal>
  );
};

const backgroundMusicMapper = {
  "heart-failure": "serious",
  "atrial-fibrillation": "optimistic",
};

PanelVideo.propTypes = {
  close: PropTypes.func,
  item: PropTypes.object,
  show: PropTypes.bool,
};

export default PanelVideo;

const Modal = styled.div`
  position: fixed;
  display: flex;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const VideoWrapper = styled.div`
  width: 60%;
`;

const Close = styled.img`
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  color: white;
  left: 44px;
  top: 40px;
  position: absolute;
`;
