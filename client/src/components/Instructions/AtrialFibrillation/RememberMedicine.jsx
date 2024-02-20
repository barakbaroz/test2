import Lottie from "lottie-react";
import { Translator } from "../../Translation";
import styled from "styled-components";
import RedFlag from "../../../assets/Lotties/RedFlag.json";

export default function RememberMedicine() {
  return (
    <Container>
      <Flag />
      <Title>
        <Translator>Remember-Medicine-Title</Translator>
      </Title>
      <Paragraph>
        <Translator>Remember-Medicine-Paragraph</Translator>
      </Paragraph>
    </Container>
  );
}

const Container = styled.div`
  margin-inline: var(--screen-margin);
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 25px;
  padding-block-end: 35px;
  align-items: center;
`;
const Flag = styled(Lottie).attrs({
  animationData: RedFlag,
})`
  width: 5.25rem;
  max-width: 100%;
`;
const Title = styled.h1`
  color: #1a1a1a;
  font-weight: 700;
  font-size: 1.375rem;
`;
const Paragraph = styled.p`
  margin-block: 0px;
  font-size: 1.188rem;
`;
