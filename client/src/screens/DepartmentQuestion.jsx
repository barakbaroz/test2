import styled from "styled-components";
import { Translator } from "../components/Translation";
import AuthQuestionLayout from "../components/AuthQuestionLayout";
import { useContext } from "react";
import { AuthenticationContext } from "../layouts/AuthenticationLayout";
import arrow_dropdown from "../assets/Icons/arrow_dropdown.svg";
import { useState } from "react";

function DepartmentQuestion() {
  const { updateAnswers } = useContext(AuthenticationContext);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const handleSelect = (e) => {
    setSelectedAnswer(true);
    updateAnswers({
      questionName: "department",
      answer: e.target.value,
    });
  };

  return (
    <AuthQuestionLayout index={3} key="Department">
      <Title>
        <Translator>Auth-Schedule-Reason</Translator>
      </Title>

      <SelectContainer selectedAnswer={selectedAnswer}>
        <Select
          id="cars"
          name="carlist"
          defaultValue=""
          onChange={handleSelect}
        >
          <Option value="" disabled hidden>
            <Translator>Auth-Choose-Answer</Translator>
          </Option>
          <Option value="colonoscopy">
            <Translator>Auth-Colonoscopy</Translator>
          </Option>

          <Option value="birth">
            <Translator>Auth-Birth</Translator>
          </Option>

          <Option value="heart-failure">
            <Translator>Auth-Heart-Failure</Translator>
          </Option>
        </Select>
      </SelectContainer>
    </AuthQuestionLayout>
  );
}

export default DepartmentQuestion;

const SelectContainer = styled.div`
  background-color: #f2f2f2;
  color: ${({ selectedAnswer }) => (selectedAnswer ? "black" : "#b7b7b7")};
  border-radius: 8px;
  width: max-content;
  &::after {
    font-size: 1rem;
    text-align: center;
    content: url(${arrow_dropdown});
    pointer-events: none;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    margin-inline-end: 10px;
  }
`;

const Select = styled.select`
  border: none;
  font-family: inherit;
  font-size: 1.1875rem;
  -webkit-appearance: none;
  outline: none;
  background-color: transparent;
  color: inherit;
  padding-block: 1rem;
  padding-inline: 2rem;

  text-align: center;
  text-align: -webkit-center;
  text-align-last: center;
`;

const Option = styled.option`
  text-align: inherit;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.188rem;
  font-weight: 400;
`;
