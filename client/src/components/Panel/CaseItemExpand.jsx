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

      <Details>
        <div>
          <Text show={true}>פרטי קשר</Text>
          {item.User.phoneNumber}
        </div>
        {item.AtrialFibrillation && (
          <DetailsItems>
            <div>
              <DetailText show={true}>סוג מטופל</DetailText>
              {patientType[item.AtrialFibrillation.patientType]}
            </div>
            <div>
              <DetailText show={true}>תרופה</DetailText>
              {item.AtrialFibrillation.medicine.dosage
                ? `${medicineType[item.AtrialFibrillation.medicine.type]} - ${
                    medicineDosage[item.AtrialFibrillation.medicine.dosage]
                  }`
                : patientType[item.AtrialFibrillation.medicine.type]}
            </div>
          </DetailsItems>
        )}
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
      </Details>

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
const patientType = {
  ambulatory: "אמבולטורי",
  hospitalized: "אשפוזי",
};

const medicineType = {
  eliquis: "אליקוויס",
  pradaxa: "פרדקסה",
  Xarelto: "קסרלטו",
};

const medicineDosage = {
  "2.5mg": '2.5 מ"ג',
  "5mg": '5 מ"ג',
};

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

const Details = styled(Column)`
  gap: 1rem;
`;

const DetailsItems = styled(Column)`
  gap: 1rem;
  margin: 0;
`;

const DetailText = styled(Text)`
  margin: 0;
`;
