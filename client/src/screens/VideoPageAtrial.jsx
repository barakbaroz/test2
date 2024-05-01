import styled, { css } from "styled-components";
import Player from "../components/Video/Player";
import { useState, useRef } from "react";
import SatisfactionQuestions from "../components/Instructions/SatisfactionQuestions";
import { Translator } from "../components/Translation";
import KeepInMind from "../components/Instructions/AtrialFibrillation/KeepInMind";
import ConsultDoctor from "../components/Instructions/AtrialFibrillation/ConsultDoctor";
import RememberMedicine from "../components/Instructions/AtrialFibrillation/RememberMedicine";
import PurchaseMedicine from "../components/Instructions/AtrialFibrillation/PurchaseMedicine";
import Title from "../components/Instructions/AtrialFibrillation/Title";
import ScrollButton from "../components/Instructions/AtrialFibrillation/ScrollButton";
import Switcher from "../components/Instructions/AtrialFibrillation/Switcher";
import waveBackground from "../assets/Backgrounds/wave_background.svg";

export default function VideoPageAtrial() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [procedure, setProcedure] = useState("atrial-fibrillation");
  const videoRef = useRef(null);

  return (
    <Container>
      <Title />
      <Switcher procedure={procedure} setProcedure={setProcedure} />
      <Player
        setShowFeedback={setShowFeedback}
        type={procedure}
        videoRef={videoRef}
      />
      <VideoInteraction show={showFeedback}>
        <SatisfactionQuestions />
      </VideoInteraction>
      <KeepInMind />
      <ConsultDoctor />
      <PurchaseMedicine />
      <RememberMedicine />
      <ScrollButton videoRef={videoRef} />
      <Divider />
      <Footer>
        <Translator>Footer-Atrial</Translator>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  --screen-margin: 25px;
  background-image: url(${waveBackground});
  background-repeat: no-repeat;
  background-size: cover;
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
