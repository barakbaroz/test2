import styled from "styled-components";
import Player from "../components/Video/Player";
import { useState, useContext, useRef } from "react";
import SatisfactionQuestions from "../components/Instructions/SatisfactionQuestions";
import { Translator } from "../components/Translation";
import KeepInMind from "../components/Instructions/AtrialFibrillation/KeepInMind";
import ConsultDoctor from "../components/Instructions/AtrialFibrillation/ConsultDoctor";
import RememberMedicine from "../components/Instructions/AtrialFibrillation/RememberMedicine";
import PurchaseMedicine from "../components/Instructions/AtrialFibrillation/PurchaseMedicine";
import MedicineFeedback from "../components/Instructions/AtrialFibrillation/MedicineFeedback";
import ScrollButton from "../components/Instructions/AtrialFibrillation/ScrollButton";
import { userContext } from "../providers/UserProvider";

export default function VideoPageAtrial() {
  const [showFeedback, setShowFeedback] = useState(false);
  const { Case } = useContext(userContext);
  const videoRef = useRef();

  return (
    <Container>
      <TitleSection>
        <MedicineFeedback />
        <Title id="video-title">
          <Translator>Video-Page-Title-{Case.instructions}</Translator>
        </Title>
      </TitleSection>
      <Player setShowFeedback={setShowFeedback} videoRef={videoRef} />
      <VideoInteraction>
        <SatisfactionQuestions videoStarted={showFeedback} />
      </VideoInteraction>
      <KeepInMind />
      <ConsultDoctor />
      <PurchaseMedicine />
      <RememberMedicine />
      <ScrollButton videoRef={videoRef} />
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
`;

const TitleSection = styled.div`
  margin-block: 2.25rem;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.375rem;
  margin-inline: var(--screen-margin);
`;
const Divider = styled.div`
  height: 1px;
  background-color: #84a4fb;
  margin-block-end: 35px;
  margin-block-start: 35px;
  margin-inline: var(--screen-margin);
  opacity: 0.3;
`;
const Footer = styled.footer`
  font-weight: 500;
  text-align: center;
  font-size: 1.375rem;
  padding-inline: 70px;
`;
