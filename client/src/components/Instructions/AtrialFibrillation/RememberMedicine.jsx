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
  margin-block: 44px 36px;
  align-items: center;
`;
const Flag = styled(Lottie).attrs({
  animationData: RedFlag,
})`
  width: 100px;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 1.375rem;
  margin-block: 30px 12px;
`;
const Paragraph = styled.p`
  margin-block: 0px;
  font-size: 1.188rem;
`;
