import styled from "styled-components";
import { Translate, Translator } from "../components/Translation";
import Player from "../components/Video/Player";
import { useState } from "react";
import VideoButtons from "../components/Instructions/VideoButtons";
import SatisfactionQuestions from "../components/Instructions/SatisfactionQuestions";
import SurgeryInstructions from "../components/Instructions/SurgeryInstructions";
import DontForget from "../components/Instructions/DontForget";
import Consent from "../components/Instructions/Consent";
import LanguageBar from "../components/User/LanguageBar";

function Instructions() {
  const [showFeedback, setShowFeedback] = useState(false);

  const watchedVideo = "24/06/2023";
  const signedConfirmation = "24/06/2023";
  const points = 0;

  const getTitle = () => {
    const titleType =
      points === 0 && watchedVideo && !signedConfirmation ? "sign" : "default";
    return `video-page-${titleType}-title`;
  };

  const getSubtitle = () => {
    if (points > 0) return "video-page-AnsweredOneYes";
    const watchedVideoString = watchedVideo
      ? "watchedVideo"
      : "notWatchedVideo";
    const SignedString = signedConfirmation
      ? "signedConfirmation"
      : "notSignedConfirmation";
    return `video-page-subtitle-answeredAllNo-${watchedVideoString}-${SignedString}`;
  };

  return (
    <Container>
      <StyledLanguageBar>
        <LanguageBar />
      </StyledLanguageBar>
      <VideoPreviewTexts>
        <Title>
          <Translator>{getTitle()}</Translator>
        </Title>

        <Subtitle>{Translate(getSubtitle())}</Subtitle>
      </VideoPreviewTexts>

      <VideoWrapper id="VideoWrapper">
        <Player setShowFeedback={setShowFeedback} />
        <ShareWrapper>
          <VideoButtons />
        </ShareWrapper>
        <SatisfactionQuestions videoStarted={showFeedback} />
      </VideoWrapper>

      <BlueWrapper>
        <SurgeryInstructions />
        <DontForget />
      </BlueWrapper>

      <Consent />

      <Divider />

      <Footer>
        <Translator>Footer</Translator>
      </Footer>
    </Container>
  );
}

export default Instructions;

const Container = styled.div`
  --screen-texts-padding: 27px;
  padding-block: 20px;
`;

const StyledLanguageBar = styled.div`
  padding-inline: var(--screen-texts-padding);
`;

const VideoPreviewTexts = styled.div`
  margin-inline: var(--screen-texts-padding);
`;

const Title = styled.h1`
  font-size: 1.625rem;
  font-weight: 500;
`;

const Subtitle = styled.h3.attrs(({ children }) => {
  if (
    children ===
    "video-page-subtitle-answeredAllNo-watchedVideo-signedConfirmation"
  )
    return { style: { display: "none" } };
})`
  font-weight: 400;
  font-size: 1.1875rem;
`;

const VideoWrapper = styled.div`
  /* margin: 1.5rem 0 4rem 0;
  padding-block-end: 1rem; */
`;

const ShareWrapper = styled.div`
  text-align: start;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0 0 0;
  gap: 1.2rem;
  margin-inline: var(--screen-texts-padding);
`;

const BlueWrapper = styled.div`
  background-color: #84a4fc;
  border-radius: 0 20px 0 20px;
  margin-block-start: 2rem;
  padding-block-start: 1.6875rem;
  padding-inline: var(--screen-texts-padding);
  padding-block-end: 1.9375rem;
  color: #ffffff;
`;

const Footer = styled.footer`
  font-weight: 500;
  text-align: center;
  color: #444444;
  font-size: 1.5rem;
  padding-inline: 1.2rem;
`;

const Divider = styled.div`
  height: 1px;
  border-radius: 2px;
  background-color: #d6d6d6;
  margin-block: 34px;
  margin-inline: var(--screen-texts-padding);
`;
