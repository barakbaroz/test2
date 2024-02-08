import PropTypes from "prop-types";
import { SectionBody, SectionHeader } from "./CaseItemExpand.style";
import styled from "styled-components";

export default function AtrialFibrillationDetails({ item }) {
  if (!item.AtrialFibrillation) return <></>;
  const { medicine, patientType } = item.AtrialFibrillation;

  return (
    <>
      <div>
        <SectionHeader show={true}>סוג מטופל</SectionHeader>
        <SectionBody>{patientTypes[patientType]}</SectionBody>
      </div>
      <div>
        <SectionHeader show={true}>תרופה</SectionHeader>
        <SectionBody>
          {medicineType[medicine.type]}
          <Dsoage>{medicineDosage[medicine.dosage]}</Dsoage>
        </SectionBody>
      </div>
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

const medicineDosage = {
  //todo: add spacing between the number and the unit, and in here translate only the unit
  "2.5mg": '2.5 מ"ג',
  "5mg": '5 מ"ג',
};

const Dsoage = styled.span`
  &::before {
    content: " - ";
  }
  &:empty {
    display: none;
  }
`;
