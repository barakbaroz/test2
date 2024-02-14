import PropTypes from "prop-types";
import styled from "styled-components";
import gistV from "../../assets/Icons/gist_v.svg";

export default function UserAnswers({ item, notInterested }) {
  const filteredQuestions = item.User.Questionnaires?.filter(
    (q) => q.questionKey !== "why-not-purchased"
  );
  return (
    <Wrapper>
      {filteredQuestions.map((question) => (
        <Answer key={question.questionKey}>
          <Checkbox>
            <Vcheck show={question.answerKey === "yes"} />
          </Checkbox>
          {questionsObj[question.questionKey]}
        </Answer>
      ))}
      <NotInterestedText show={notInterested}>
        {notInterestedTexts[item.Avatar.gender]}
      </NotInterestedText>
    </Wrapper>
  );
}

UserAnswers.propTypes = {
  item: PropTypes.object,
  notInterested: PropTypes.bool,
};

const notInterestedTexts = {
  female: "דיווחה שלא מעוניינת בתרופה",
  male: "דיווח שלא מעוניין בתרופה",
  other: "דיווח שלא מעוניין בתרופה",
};

const questionsObj = {
  "purchased-medicine": "רכישת התרופה",
  "taking-medication": "התחלת שימוש",
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
  --checkbox-size: 15px;
  border: 1px solid #e7e7e7;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: 2px;
`;

const Vcheck = styled.img.attrs({ src: gistV, alt: "vCheck" })`
  display: ${({ show }) => (show ? "block" : "none")};
  height: 5px;
  width: 7px;
`;

const NotInterestedText = styled.p`
  color: #f02a4c;
  font-weight: 400;
  font-size: 16px;
  display: ${({ show }) => (show ? "block" : "none")};
`;
