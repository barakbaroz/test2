import Lottie from "lottie-react";
import { Translator } from "../../Translation";
import styled from "styled-components";
import DoctorCircle from "../../../assets/Lotties/DoctorCircle.json";

export default function ConsultDoctor() {
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
  padding: 25px;
  padding-block-end: 35px;
  box-shadow: 0px 10px 8px #0000001f;
  align-items: center;
  text-align: center;
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
  margin-block-end: 0px;
  font-size: 1.188rem;
`;
const WrapperNote = styled.div`
  color: #7a9dfd;
  font-size: 1.188rem;
`;

const NoteParagraph = styled.div`
  margin-block: 0px;
`;
