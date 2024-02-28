import PropTypes from "prop-types";
import { SectionBody, SectionHeader } from "./CaseItemExpand.style";

export default function AtrialFibrillationDetails({ item }) {
  if (!item.AtrialFibrillation) return <></>;
  const { medicine, patientType } = item.AtrialFibrillation;

  return (
    <>
      <SectionHeader show={true}>סוג מטופל</SectionHeader>
      <SectionBody>{patientTypes[patientType]}</SectionBody>
      <SectionHeader show={true}>תרופה</SectionHeader>
      <SectionBody>
        {medicineType[medicine.type]}
        {medicine.dosage && " - " + medicine.dosage.replace("mg", 'מ"ג')}
      </SectionBody>
    </>
  );
}

AtrialFibrillationDetails.propTypes = {
  item: PropTypes.object,
};

const patientTypes = {
  ambulatory: "אמבולטורי",
  hospitalized: "אשפוזי",
};

const medicineType = {
  eliquis: "אליקוויס",
  pradaxa: "פרדקסה",
  Xarelto: "קסרלטו",
};
