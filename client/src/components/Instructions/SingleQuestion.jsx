import styled from "styled-components";
import { Translator } from "../Translation";
import { postAnalytics } from "../../analytics";
import PropTypes from "prop-types";

export default function SingleQuestion({ questionKey }) {
  const handleFeedback = (answer) => {
    postAnalytics({
      type: `satisfaction-question`,
      data: answer,
    });
  };

  return (
    <>
      <FeedbackTitle id="FeedbackTitle">
        <Translator>Satisfaction-Question-{questionKey}</Translator>
      </FeedbackTitle>
      <Answers id="Answers">
        <Answer id="AnswerYes" onClick={() => handleFeedback("Yes")}>
          <input hidden type="radio" name={questionKey} value="yes" />
          <Translator>yes</Translator>
        </Answer>
        <Answer id="AnswerNo" onClick={() => handleFeedback("No")}>
          <input hidden type="radio" name={questionKey} value="no" />
          <Translator>no</Translator>
        </Answer>
      </Answers>
    </>
  );
}

SingleQuestion.propTypes = {
  questionKey: PropTypes.string.isRequired,
  onAnswer: PropTypes.func,
  show: PropTypes.bool,
};

const FeedbackTitle = styled.div`
  text-align: start;
  font-size: 1.125rem;
  margin-block: 18px;
`;

const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-block: 14px 22px;
`;

const Answer = styled.label`
  border: 1.5px solid #84a4fc;
  border-radius: 20px;
  color: #84a4fc;
  background-color: transparent;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25rem 1.75rem;
  &:has(input:checked) {
    color: #fff;
    background-color: #84a4fc;
  }
`;
