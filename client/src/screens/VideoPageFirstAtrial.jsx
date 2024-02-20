import styled from "styled-components";
import Player from "../components/Video/Player";
import { useState, Fragment, useRef, useContext } from "react";
import SatisfactionQuestions from "../components/Instructions/SatisfactionQuestions";
import bleedingIcon from "../assets/Icons/Bleeding.svg";
import medicineIcon from "../assets/Icons/medicine.svg";
import doctorIcon from "../assets/Icons/doctor.svg";
import arrowSide from "../assets/Icons/arrow_side.svg";
import arrow_up from "../assets/Icons/arrow_up.svg";
import { Translator } from "../components/Translation";
import { Link } from "react-router-dom";
import ConsultDoctor from "../components/Instructions/ConsultDoctor";
import RememberMedicine from "../components/Instructions/RememberMedicine";
import { postAnalytics } from "../analytics";
import { userContext } from "../providers/UserProvider";

export default function VideoPageFisrtAtrial() {
  const [showFeedback, setShowFeedback] = useState(false);
  const { instructions } = useContext(userContext);
  const videoRef = useRef(null);

  const handleAutoPlay = () => {
    if (!videoRef.current) return;
    postAnalytics({ type: "back-to-top" });
    videoRef.current.play();
  };

  return (
    <Container>
      <Title id="video-title">
        <Translator>Video-Page-Title-{instructions}</Translator>
      </Title>
      <Player setShowFeedback={setShowFeedback} />
      <VideoInteraction>
        <SatisfactionQuestions videoStarted={showFeedback} />
      </VideoInteraction>
      <InstructionsContainer>
        <InstructionsTitle>
          <Translator>Video-Important-Implement</Translator>
        </InstructionsTitle>
        {ImportantInstructions.map(
          ({ icon, paragraph, title, button }, index) => (
            <Fragment key={index}>
              <InstructionsWrapper>
                <Image src={icon} alt={icon} />
                <TextSection>
                  <Title>
                    <Translator>{title}</Translator>
                  </Title>
                  <InstructionText>
                    <Translator>{paragraph}</Translator>
                  </InstructionText>
                  <Recommend show={button}>
                    <img src={button?.icon} />
                    <Text>
                      <Translator>{button?.text}</Translator>
                    </Text>
                  </Recommend>
                </TextSection>
              </InstructionsWrapper>
              <Divider />
            </Fragment>
          )
        )}
      </InstructionsContainer>
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

const ImportantInstructions = [
  {
    icon: medicineIcon,
    title: "Video-Persistence-Title",
    paragraph: "Video-Persistences-Paragraph",
    button: {
      icon: arrowSide,
      text: "Video-Persistence-Recommend",
    },
  },
  {
    icon: doctorIcon,
    title: "Video-Doctor-Follow-Up-Title",
    paragraph: "Video-Doctor-Follow-Up-Paragraph",
  },
  {
    icon: bleedingIcon,
    paragraph: "Video-Bleeding-Paragraph",
    title: "Video-Bleeding-Title",
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
`;

const InstructionsContainer = styled.div`
  margin-block-start: 44px;
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
  font-size: 1.5rem;
  font-weight: 700;
  margin-block-end: 36px;
`;

const InstructionsWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 22px;
`;

const InstructionText = styled.p`
  text-align: start;
  font-size: 1.188rem;
  font-weight: 400;
  margin-block: 0px;
`;

const Image = styled.img`
  height: 79px;
  width: 80px;
`;

const TextSection = styled.div``;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.375rem;
  margin-block-end: 0.5rem;
`;
const Recommend = styled(Link)`
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  margin-block-start: 0.5rem;
  text-decoration: none;
`;
const Text = styled.p`
  font-size: 1.188rem;
  font-weight: 500;
  color: #ef2a4c;
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
