import PropTypes from "prop-types";
import styled from "styled-components";
import StepProgress from "./StepProgress";
import CaseItemButtons from "./CaseItemButtons";
import UserAnswers from "./UserAnswers";
import AtrialFibrillationDetails from "./AtrialFibrillationDetails";
import { SectionBody, SectionHeader } from "./CaseItemExpand.style";
import axios from "axios";
import { useState } from "react";

const CaseItemExpand = ({ item, show, notInterested }) => {
  const [comment, setComment] = useState(item.Comment?.message || "");
  const sendComment = () =>
    axios.post("/api/cases/comment", { CaseId: item.id, comment });

  return (
    <Container show={show}>
      <CaseItemButtons item={item} />

      <Column>
        <div>
          <SectionHeader>פרטי קשר</SectionHeader>
          <SectionBody>{item.User.phoneNumber}</SectionBody>
        </div>
        <AtrialFibrillationDetails item={item} />
        {item.HeartFailure && (
          <DetailsItems>
            {Boolean(item.HeartFailure.symptoms.length) && (
              <div>
                <DetailText show={true}>סימפטומים</DetailText>
                {item.HeartFailure.symptoms
                  .map((symptom) => symptoms[symptom])
                  .join(" , ")}
              </div>
            )}
            {Boolean(item.HeartFailure.heartConditions.length) && (
              <div>
                <DetailText show={true}>מצב הלב</DetailText>
                {item.HeartFailure.heartConditions
                  .map((condition) => heartConditions[condition])
                  .join(" , ")}
              </div>
            )}
          </DetailsItems>
        )}
      </Column>

      <Column>
        <Wrapper>
          <UserAnswers item={item} notInterested={notInterested} />
        </Wrapper>
        <TextArea
          defaultValue={item.Comment?.message}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="הוספת הערה..."
        />
        <SaveComment onClick={sendComment}>
          {item.Comment?.message ? "עדכון" : "שמירה"}
        </SaveComment>
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
  notInterested: PropTypes.bool,
};

export default CaseItemExpand;

const heartConditions = {
  aortic_valve_regurgitation: "דלף של המסתם האאורטלי",
  aortic_valve_stenosis: "היצרות של המסתם האאורטלי",
  atherosclerosis: "טרשת עורקים",
  cardiac_arrhythmia: "הפרעות בקצב הלב",
  cardiomyopathy: "קרדיומיופתיה",
  general: "כללי",
  mitral_valve_regurgitation: "דלף של המסתם המיטרלי",
  mitral_valve_stenosis: "היצרות של המסתם המיטרלי",
  myocardial_infarction: "אוטם שריר הלב",
};
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
  gap: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailsItems = styled(Column)`
  gap: 1rem;
  margin: 0;
`;

const DetailText = styled(SectionHeader)`
  margin: 0;
`;

const SaveComment = styled.button`
  background-color: #84a4fc;
  color: #fcfafa;
  padding-inline: 25px;
  padding-block: 7px;
  border-radius: 20px;
  border: none;
  width: fit-content;
  font-weight: 600;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  overflow: auto;
  border: none;
  font-size: 16px;
  line-height: 21px;
  resize: none;
  outline: none;
  font-family: "Assistant";
  border: 1px #dfdfdf solid;
  border-radius: 15px;
  padding: 15px;
  height: 6rem;
  box-sizing: border-box;
`;
