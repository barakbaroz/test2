import PropTypes from "prop-types";
import styled from "styled-components";
import gistV from "../../assets/Icons/gist_v.svg";

const questionsObj = {
  purchasedMedicine: "רכישת התרופה",
  startedUsing: "התחלת שימוש",
};

export default function UserAnswers({ questions }) {
  return (
    <Wrapper>
      {questions.map((question) => (
        <Answer key={question.questionKey}>
          <Checkbox>
            <Vcheck
              show={question.answerKey !== "No"}
              src={gistV}
              alt="v_mark"
            />
          </Checkbox>
          {questionsObj[question.questionKey]}
        </Answer>
      ))}
    </Wrapper>
  );
}

UserAnswers.propTypes = {
  questions: PropTypes.array,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const Answer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Checkbox = styled.div`
  --checkbox-padding: 0.369rem;
  position: relative;
  border: 0.5px solid #1a1a1a;
  padding: 0.185rem;
  max-height: var(--checkbox-padding);
  max-width: var(--checkbox-padding);
  border-radius: 2px;
  opacity: 0.32;
`;

const Vcheck = styled.img`
  position: relative;
  top: 0;
  left: 0;
  display: ${({ show }) => (show ? "block" : "none")};
  opacity: 1;
  height: 0.313rem;
  width: 0.438rem;
`;
