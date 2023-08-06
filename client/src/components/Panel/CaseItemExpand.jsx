import PropTypes from "prop-types";
import styled from "styled-components";
import StepProgress from "./StepProgress";
import CaseItemButtons from "./CaseItemButtons";

const CaseItemExpand = ({ item, show }) => {
  return (
    <Container show={show}>
      <CaseItemButtons item={item} />

      <Column>
        <div>
          <Text show={true}>פרטי קשר</Text>
          {item.User.phoneNumber}
        </div>
        <div>
          <Text show={item.symptoms.length > 0}>סימפטומים</Text>
          {item.symptoms.map((symptom) => (
            <div key={symptom}>{symptoms[symptom]}</div>
          ))}
        </div>
      </Column>

      <Column>
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
};

export default CaseItemExpand;

const symptoms = {
  shortness_of_breath: "קוצר נשימה",
  edema: "בצקת",
  chest_pain: "כאבים בחזה",
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
  cursor: not-allowed;
  box-sizing: border-box;
`;
