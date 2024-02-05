import PropTypes from "prop-types";
import styled from "styled-components";
import StepProgress from "./StepProgress";
import CaseItemButtons from "./CaseItemButtons";
import UserAnswers from "./UserAnswers";

const CaseItemExpand = ({ item, show, whyNotPurchasedAnswer }) => {
  const filteredQuestions = item.User?.Questionnaires?.filter(
    (q) => q.questionKey !== "whyNotPurchased"
  );
  return (
    <Container show={show}>
      <CaseItemButtons item={item} />

      <Column>
        <div>
          <Text show={true}>פרטי קשר</Text>
          {item.User.phoneNumber}
        </div>
      </Column>

      <Column>
        <Wrapper>
          <UserAnswers questions={filteredQuestions} />
          <NotInterestedText show={whyNotPurchasedAnswer === "notInterested"}>
            {notInterestedTexts[item.Avatar.gender]}
          </NotInterestedText>
        </Wrapper>
        <TextArea
          defaultValue={item.Comment?.message}
          placeholder="הוספת הערה..."
          disabled={true}
        />
      </Column>

      <Column>
        <StepProgress item={item} />
      </Column>
    </Container>
  );
};
CaseItemExpand.propTypes = {
  item: PropTypes.object,
  show: PropTypes.bool,
  whyNotPurchasedAnswer: PropTypes.string,
};

export default CaseItemExpand;

const notInterestedTexts = {
  female: "דיווחה שלא מעוניינת בתרופה",
  male: "דיווח שלא מעוניין בתרופה",
  other: "דיווח שלא מעוניין בתרופה",
};

export const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: 10% 24.5% 29% 29%;
  grid-column-gap: 2.5%;
`;

const Container = styled(ItemGrid)`
  height: ${({ show }) => (show ? "fit-content" : "0px")};
  overflow: hidden;
`;

const Column = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  margin-block: 2rem;
  gap: 1.5rem;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  color: #444444;
  margin-bottom: 5px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const TextArea = styled.textarea`
  overflow: auto;
  border: none;
  font-size: 16px;
  line-height: 21px;
  color: #444444;
  resize: none;
  outline: none;
  font-family: "Assistant";
  border: 1px #dfdfdf solid;
  border-radius: 15px;
  padding: 15px;
  height: 6rem;
  cursor: text;
  box-sizing: border-box;
`;

const NotInterestedText = styled(Text)`
  color: #f02a4c;
  font-weight: 400;
  font-size: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
