import styled from "styled-components";
import Player from "../components/Video/Player";
import { useState, Fragment } from "react";
import SatisfactionQuestions from "../components/Instructions/SatisfactionQuestions";
import LanguageBar from "../components/User/LanguageBar";
import medicationsIcon from "../assets/Video/drugs.png";
import dietIcon from "../assets/Video/diet.png";
import activityIcon from "../assets/Video/activity.png";
import bpTest from "../assets/Video/bp_test.png";
import { Translator } from "../components/Translation";

function VideoPage() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <Container>
      <StyledLanguageBar>
        <LanguageBar />
      </StyledLanguageBar>
      <Title>
        <Translator>Video-Title</Translator>
      </Title>
      <Player setShowFeedback={setShowFeedback} />
      <VideoInteraction>
        <SatisfactionQuestions videoStarted={showFeedback} />
      </VideoInteraction>
      <InstructionsContainer>
        <InstructionsTitle>
          <Translator>Video-Instructions-Title</Translator>
        </InstructionsTitle>
        {routinesInstructions.map(({ icon, paragraph }, index) => (
          <Fragment key={index}>
            <RoutineWrapper>
              <Image src={icon} alt={icon} />
              <RoutineText>
                <Translator>{paragraph}</Translator>
              </RoutineText>
            </RoutineWrapper>
            <Divider />
          </Fragment>
        ))}
      </InstructionsContainer>
      <Footer>
        <Translator>Footer</Translator>
      </Footer>
    </Container>
  );
}

export default VideoPage;

const routinesInstructions = [
  {
    icon: medicationsIcon,
    paragraph: "Video-Routine-Medications",
  },
  {
    icon: dietIcon,
    paragraph: "Video-Routine-Diet",
  },
  {
    icon: activityIcon,
    paragraph: "Video-Routine-Activity",
  },
  {
    icon: bpTest,
    paragraph: "Video-Routine-BloodPressureTest",
  },
];

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
  padding-block-end: 57px;
`;

const StyledLanguageBar = styled.div`
  margin-inline: var(--screen-margin);
`;

const InstructionsContainer = styled.div`
  margin-block-start: 44px;
  margin-inline: var(--screen-margin);
`;

const Title = styled.p`
  text-align: start;
  font-size: 1.375rem;
  font-weight: 500;
  margin-block-start: 2.125rem;
  margin-block-end: 1.813rem;
  margin-inline: var(--screen-margin);
`;

const VideoInteraction = styled.div`
  margin-block-start: 64px;
  margin-inline: var(--screen-margin);
`;

const Divider = styled.div`
  height: 1px;
  background-color: #84a4fb;
  margin-block-end: 35px;
  margin-block-start: 35px;
  opacity: 0.3;
`;

const InstructionsTitle = styled.p`
  text-align: start;
  font-size: 1.375rem;
  font-weight: 700;
  margin-block-end: 36px;
`;

const RoutineWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const RoutineText = styled.p`
  text-align: start;
  font-size: 1.188rem;
  font-weight: 400;
  margin-block: 0;
`;

const Footer = styled.footer`
  font-weight: 500;
  text-align: center;
  font-size: 1.375rem;
  padding-inline: 70px;
`;

const Image = styled.img`
  height: 79px;
  width: 80px;
`