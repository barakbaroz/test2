import styled, { css } from "styled-components";
import Player from "../components/Video/Player";
import { useState, useRef, useContext } from "react";
import SatisfactionQuestions from "../components/Instructions/SatisfactionQuestions";
import KeepInMind from "../components/Instructions/AtrialFibrillation/KeepInMind";
import arrow_up from "../assets/Icons/arrow_up.svg";
import { Translator } from "../components/Translation";
import ConsultDoctor from "../components/Instructions/AtrialFibrillation/ConsultDoctor";
import RememberMedicine from "../components/Instructions/AtrialFibrillation/RememberMedicine";
import { postAnalytics } from "../analytics";
import { userContext } from "../providers/UserProvider";
import { useParams } from "react-router-dom";

export default function VideoPageAtrial() {
  const [showFeedback, setShowFeedback] = useState(false);
  const userInfo = useContext(userContext);
  const { Case } = userInfo;
  const videoRef = useRef(null);
  const { sending } = useParams();

  const handleAutoPlay = () => {
    if (!videoRef.current) return;
    postAnalytics({ type: "back-to-top" });
    videoRef.current.play();
  };
  return (
    <Container>
      <Title id="video-title">
        <Translator>Video-Page-Title-{Case.instructions}</Translator>
      </Title>
      <Player setShowFeedback={setShowFeedback} />
      <VideoInteraction show={showFeedback}>
        <SatisfactionQuestions />
      </VideoInteraction>
      <KeepInMind show={sending !== "first"} />
      <ConsultDoctor />
      <RememberMedicine />
      <CenteredScrollButton>
        <ScrollButton href="#video-title" onClick={handleAutoPlay}>
          <img src={arrow_up} alt="arrowUp" />
          <Translator>Video-Back-To-Video</Translator>
          <span style={{ width: "19px" }} />
        </ScrollButton>
      </CenteredScrollButton>
      <Divider />
      <Footer>
        <Translator>atrial-slogen</Translator>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  --screen-margin: 25px;
  background: transparent
    linear-gradient(
      180deg,
      #ffffff 0%,
      #f1f4fb 10%,
      #e3e8f6 53%,
      #f5f7fc 85%,
      #ffffff 100%
    )
    0% 0% no-repeat padding-box;
`;

const VideoInteraction = styled.div`
  margin-block-start: 64px;
  margin-inline: var(--screen-margin);
  ${({ show }) =>
    !show &&
    css`
      display: none;
    `}
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.375rem;
  margin-block-end: 0.5rem;
  margin-inline: var(--screen-margin);
`;

const CenteredScrollButton = styled.div`
  display: flex;
  justify-content: center;
`;

const ScrollButton = styled.a`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  text-align: center;
  font-size: 1.125rem;
  width: calc(100% - 50px);
  max-width: 12.25rem;
  cursor: pointer;
  color: #ffffff;
  background-color: #7a9dfd;
  border: none;
  padding-block: 0.688rem;
  padding-inline: 27px;
  border-radius: 50px;
  font-family: inherit;
`;
const Footer = styled.footer`
  font-weight: 700;
  text-align: center;
  font-size: 1.375rem;
  margin-inline: var(--screen-margin);
  padding-block-end: 80px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #84a4fb;
  margin-block: 35px;
  margin-inline: var(--screen-margin);
  opacity: 0.3;
`;
