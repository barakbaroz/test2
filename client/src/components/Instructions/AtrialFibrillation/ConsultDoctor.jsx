import Lottie from "lottie-react";
import { Translator } from "../../Translation";
import styled from "styled-components";
import DoctorCircle from "../../../assets/Lotties/DoctorCircle.json";
import { useUser } from "../../../providers/UserProvider";
import { useParams } from "react-router-dom";

export default function ConsultDoctor() {
  const { sending } = useParams();
  const { Case } = useUser();
  const { patientSeniority } = Case.AtrialFibrillation;

  if (sending === "first" && patientSeniority !== "regularly") return <></>;

  return (
    <Container>
      <Doctor />
      <Title>
        <Translator>Consult-Doctor-Title</Translator>
      </Title>
      <Paragraph>
        <Translator>Consult-Doctor-Paragraph</Translator>
      </Paragraph>
      <WrapperNote>
        <NoteTitle>
          <Translator>Consult-Doctor-Note-Title</Translator>
        </NoteTitle>
        <NoteParagraph>
          <Translator>Consult-Doctor-Note-Text</Translator>
        </NoteParagraph>
      </WrapperNote>
    </Container>
  );
}

const Container = styled.div`
  margin-inline: var(--screen-margin);
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  padding-inline: var(--screen-margin);
  padding-block: 26px;
  box-shadow: 0px 10px 8px #0000001f;
  align-items: center;
  text-align: center;
  margin-block: 50px 44px;
`;

const Doctor = styled(Lottie).attrs({
  animationData: DoctorCircle,
})`
  width: 7.375rem;
  max-width: 100%;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.375rem;
`;

const Paragraph = styled.p`
  margin-block: 0px;
  font-size: 1.188rem;
`;

const NoteTitle = styled.p`
  margin-block: 0px;
  font-size: 1.188rem;
`;

const WrapperNote = styled.div`
  color: #7a9dfd;
  font-size: 1.188rem;
  font-weight: 500;
  margin-block-start: 1rem;
`;

const NoteParagraph = styled.p`
  margin-block: 0px;
`;
