import styled from "styled-components";
import { Translator } from "../components/Translation";
import AuthQuestionLayout from "../components/AuthQuestionLayout";
import { useContext } from "react";
import { AuthenticationContext } from "../layouts/AuthenticationLayout";
import arrow_dropdown from "../assets/Icons/arrow_dropdown.svg";

function DepartmentQuestion() {
  const { updateAnswers } = useContext(AuthenticationContext);
  const handleSelect = (e) => {
    updateAnswers({
      questionName: "department",
      answer: e.target.value,
      nextRoute: "Department",
    });
  };

  return (
    <AuthQuestionLayout index={3} key="Department">
      <Title>
        <Translator>schedule-reason</Translator>
      </Title>

      <SelectContainer>
        <Select
          id="cars"
          name="carlist"
          defaultValue=""
          onChange={handleSelect}
        >
          <Option value="" disabled hidden>
            <Translator>choose-answer</Translator>
          </Option>
          <Option value="colonoscopy">
            <Translator>colonoscpy</Translator>
          </Option>

          <Option value="birth">
            <Translator>birth</Translator>
          </Option>

          <Option value="heart">
            <Translator>heart</Translator>
          </Option>
        </Select>
      </SelectContainer>
    </AuthQuestionLayout>
  );
}

export default DepartmentQuestion;

const SelectContainer = styled.div`
  background-color: #f2f2f2;
  color: #b7b7b7;
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
