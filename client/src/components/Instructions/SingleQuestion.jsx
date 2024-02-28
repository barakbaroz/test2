import styled, { css } from "styled-components";
import { Translator } from "../Translation";
import { postAnalytics } from "../../analytics";
import PropTypes from "prop-types";
import { useState } from "react";

function SingleQuestion({ questionKey, onAnswer }) {
  const [answer, setAnswer] = useState("");

  const handleFeedback = (answer) => () => {
    postAnalytics({
      type: `satisfaction-question`,
      data: answer,
    });
    setAnswer(answer);
    if (onAnswer) onAnswer();
  };

  return (
    <FeedBackWrapper id="FeedBackWrapper">
      <FeedbackTitle id="FeedbackTitle">
        <Translator>Satisfaction-question-{questionKey}</Translator>
      </FeedbackTitle>
      <Answers id="Answers">
        <Answer
          id="AnswerYes"
          onClick={handleFeedback("Yes")}
          checked={answer === "Yes"}
        >
          <Translator>yes</Translator>
        </Answer>
        <Answer
          id="AnswerNo"
          onClick={handleFeedback("No")}
          checked={answer === "No"}
        >
          <Translator>no</Translator>
        </Answer>
      </Answers>
    </FeedBackWrapper>
  );
}

export default SingleQuestion;

SingleQuestion.propTypes = {
  questionKey: PropTypes.string.isRequired,
  onAnswer: PropTypes.func,
  show: PropTypes.bool,
};

const FeedBackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-inline: var(--screen-texts-padding);
  overflow: hidden;
`;

const FeedbackTitle = styled.div`
  text-align: start;
  font-size: 1.125rem;
`;

const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;
const Answer = styled.button`
  border: 1.5px solid #84a4fc;
  border-radius: 20px;
  color: #84a4fc;
  background-color: transparent;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25rem 1.75rem;
  ${({ checked }) =>
    checked &&
    css`
      color: #fff;
      background-color: #84a4fc;
    `}
`;
