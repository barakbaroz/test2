import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import LanguageBar from "../components/User/LanguageBar";
import { Translator } from "../components/Translation";
import { postAnalytics } from "../analytics";
import { useUser } from "../providers/UserProvider";
import Lottie from "lottie-react";
import doctorStartPage from "../assets/Lotties/doctor_start_page.json";

export default function Start() {
  const { sending } = useParams();
  const { Case } = useUser();
  const { avatarSelection } = Case.CasesProgress;
  const navigate = useNavigate();
  const handleLegalLinkClick = () => {
    postAnalytics({ type: "opened-tos", data: { sending } });
  };
  const paragraphKey = Case.AtrialFibrillation
    ? `${sending}-${Case.AtrialFibrillation.medicine}`
    : "heart";

  const toNextRoute = () => {
    if (!avatarSelection) return "../character-selection";
    if (!Case.AtrialFibrillation) return "../video-page-heart";
    if (sending === "second") return "../questionnaire/purchased-medicine";
    const { patientSeniority } = Case.AtrialFibrillation;
    if (patientSeniority !== "regularly")
      return "../questionnaire/clinic-picker";
    return "../video-page-atrial";
  };

  const handleStartClick = () => {
    postAnalytics({ type: "start-button-clicked", data: { sending } });
    navigate(toNextRoute());
  };

  return (
    <StartContainer id="StartContainer">
      <LanguageBar />
      <Doctor id="startPageNurse" />
      <div id="TextsContainer">
        <Title id="HelloTitle">
          <Translator>Start-Title</Translator>
        </Title>
        <Paragraph id="StartParagraph">
          <Translator>Start-Paragraph-{paragraphKey}</Translator>
        </Paragraph>
      </div>
      <BottomContentContainer>
        <StartButton id="StartButton" onClick={handleStartClick}>
          <Translator>Next</Translator>
        </StartButton>
        <div>
          <Translator>Start-Legal-Explain</Translator>
          &nbsp;
          <LegalLink
            id="LegalLink"
            to="../Legal"
            onClick={handleLegalLinkClick}
          >
            <Translator>Start-Legal-Link</Translator>
          </LegalLink>
        </div>
      </BottomContentContainer>
    </StartContainer>
  );
}

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100dvh - var(--header-size));
  width: 100vw;
  background: linear-gradient(#ffffff, #f1f4fb, #e3e8f6, #f5f7fc, #ffffff);
  padding-inline: 22px;
  padding-block-end: 1.2rem;
  padding-block-start: 4px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const Doctor = styled(Lottie).attrs({
  animationData: doctorStartPage,
})`
  width: 20rem;
  max-width: 100%;
  align-self: center;
`;

const Title = styled.h1`
  font-size: 1.625rem;
  margin: 0;
  text-align: center;
`;

const BottomContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.1875rem;
  margin-block-start: 0.5rem;
  text-align: center;
  margin-inline: 25px;
`;

const StartButton = styled.button`
  text-decoration: none;
  background-color: #f02a4c;
  border-radius: 3rem;
  border: none;
  color: #ffffff;
  padding: 0.5rem 3rem;
  font-size: 1.063rem;
  font-family: inherit;
`;

const LegalLink = styled(Link)`
  color: inherit;
  cursor: pointer;
  font-weight: 500;
`;
