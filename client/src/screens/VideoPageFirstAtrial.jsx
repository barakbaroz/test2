import styled from "styled-components";
import Player from "../components/Video/Player";
import { useState, useRef, useContext } from "react";
import SatisfactionQuestions from "../components/Instructions/SatisfactionQuestions";
import { KeepInMind } from "../components/Instructions/AtrialFibrillation/KeepInMind";
import arrow_up from "../assets/Icons/arrow_up.svg";
import { Translator } from "../components/Translation";
import ConsultDoctor from "../components/Instructions/ConsultDoctor";
import RememberMedicine from "../components/Instructions/RememberMedicine";
import { postAnalytics } from "../analytics";
import { userContext } from "../providers/UserProvider";

export default function VideoPageAtrial() {
  const [showFeedback, setShowFeedback] = useState(false);
  const { Case } = useContext(userContext);
  const videoRef = useRef(null);

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
      <VideoInteraction>
        <SatisfactionQuestions videoStarted={showFeedback} />
      </VideoInteraction>
      <KeepInMind Case={Case} />
      <ConsultDoctor />
      <RememberMedicine />
      <CenteredScrollButton>
        <ScrollButton href="#video-title" onClick={handleAutoPlay}>
          <img src={arrow_up} alt="arrowUp" />
          <Translator>Video-Back-To-Video</Translator>
          <span style={{ width: "19px" }} />
        </ScrollButton>
      </CenteredScrollButton>
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
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.375rem;
  margin-block-end: 0.5rem;
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
  font-weight: 500;
  text-align: center;
  font-size: 1.375rem;
  padding-inline: 70px;
`;
