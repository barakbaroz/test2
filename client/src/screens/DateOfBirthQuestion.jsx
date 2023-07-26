import { useContext } from "react";
import styled from "styled-components";
import { Translator } from "../components/Translation";
import AuthQuestionLayout from "../components/AuthQuestionLayout";
import PinInput from "../components/Gister/PinInput";
import { AuthenticationContext } from "../layouts/AuthenticationLayout";

function DateOfBirthQuestion() {
  const { updateAnswers } = useContext(AuthenticationContext);

  const handleDateOfBirth = (dateOfBirth) => {
    //Update the corresponding state or something.
    if (dateOfBirth.length !== 4) return;
    updateAnswers({
      questionName: "yearOfBirth",
      answer: dateOfBirth,
      nextRoute: "Department",
    });
  };

  return (
    <AuthQuestionLayout index={2} key="DateOfBirth" nextRoute="Department">
      <Title>
        <Translator>year-of-birth</Translator>
      </Title>

      <PinInput onChange={handleDateOfBirth} />
    </AuthQuestionLayout>
  );
}

export default DateOfBirthQuestion;
const Title = styled.h2`
  margin: 0;
  font-size: 1.188rem;
  font-weight: 400;
`;
