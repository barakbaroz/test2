import styled from "styled-components";
import PinInput from "../components/Gister/PinInput";
import { Translator } from "../components/Translation";
import { useContext } from "react";
import AuthQuestionLayout from "../components/AuthQuestionLayout";
import { AuthenticationContext } from "../layouts/AuthenticationLayout";

function ZehutQuestion() {
  const { updateAnswers } = useContext(AuthenticationContext);

  const handleZehutNumber = (zehut) => {
    //Update the corresponding state or something.
    if (zehut.length !== 4) return;
    updateAnswers({
      questionName: "zehutNumber",
      answer: zehut,
      nextRoute: "DateOfBirth",
    });
  };

  return (
    <AuthQuestionLayout index={1} key="zehut" nextRoute="DateOfBirth">
      <Title>
        <Translator>Auth-Zehut</Translator>
      </Title>

      <PinInput onChange={handleZehutNumber} />
    </AuthQuestionLayout>
  );
}

export default ZehutQuestion;

const Title = styled.h2`
  margin: 0;
  font-size: 1.188rem;
  font-weight: 400;
`;
