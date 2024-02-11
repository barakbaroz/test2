import PropTypes from "prop-types";
import { SectionBody, SectionHeader } from "./CaseItemExpand.style";

export default function HeartFailureDetails({ item }) {
  if (!item?.HeartFailure) return <></>;
  const { symptoms, heartConditions } = item.HeartFailure;

  return (
    <>
      <div>
        <SectionHeader show={true}>סימפטומים</SectionHeader>
        <SectionBody>
          {symptoms.map((symptom) => symptomsObj[symptom]).join(", ")}
        </SectionBody>
      </div>
      <div>
        <SectionHeader show={true}>מצב הלב</SectionHeader>
        <SectionBody>
          {heartConditions
            .map((condition) => heartConditionsObj[condition])
            .join(", ")}
        </SectionBody>
      </div>
    </>
  );
}

HeartFailureDetails.propTypes = {
  item: PropTypes.object,
};

const heartConditionsObj = {
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
const symptomsObj = {
  shortness_of_breath: "קוצר נשימה",
  edema: "בצקת",
  chest_pain: "כאבים בחזה",
};
