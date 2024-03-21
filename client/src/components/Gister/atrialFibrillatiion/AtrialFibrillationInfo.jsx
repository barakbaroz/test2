import styled from "styled-components";
import PropTypes from "prop-types";
import PatientType from "./PatientType";
import MedicineType from "./MedicineType";
import PatientSeniority from "./PatientSeniority";
import { checkEmptyObject } from "../utils";

function AtrialFibrillationInfo({ casesDataRef }) {
  const onUpdate = (key, value) => {
    casesDataRef.current.atrialFibrillation ||= {};
    casesDataRef.current.atrialFibrillation[key] = value;
    const empty = checkEmptyObject(casesDataRef.current.atrialFibrillation);
    if (empty) delete casesDataRef.current.atrialFibrillation;
    document.getElementById("atrialFibrillation")?.classList.remove("invalid");
    document.getElementById("heartFailure")?.classList.remove("invalid");
  };

  return (
    <Container>
      <PatientType onUpdate={onUpdate} />
      <MedicineType casesDataRef={casesDataRef} onUpdate={onUpdate} />
      <PatientSeniority onUpdate={onUpdate} />
    </Container>
  );
}

AtrialFibrillationInfo.propTypes = {
  casesDataRef: PropTypes.shape({ current: PropTypes.object }),
};

export default AtrialFibrillationInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 70px;
`;
