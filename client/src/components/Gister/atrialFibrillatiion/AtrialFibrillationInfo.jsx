import styled from "styled-components";
import PropTypes from "prop-types";
import PatientType from "./PatientType";
import MedicineType from "./MedicineType";
import PatientSeniority from "./PatientSeniority";

function AtrialFibrillationInfo({ casesDataRef }) {
  const onUpdate = (key, value) => {
    casesDataRef.current.atrialFibrillation ||= {};
    casesDataRef.current.atrialFibrillation[key] = value;
    const empty =
      Object.values(casesDataRef.current.atrialFibrillation).filter(Boolean)
        .length === 0;
    if (empty) delete casesDataRef.current.atrialFibrillation;
    document.getElementById("atrialFibrillation")?.classList.remove("invalid");
    document.getElementById("heartFailure")?.classList.remove("invalid");
  };

  return (
    <Container>
      <PatientType casesDataRef={casesDataRef} onUpdate={onUpdate} />
      <MedicineType casesDataRef={casesDataRef} onUpdate={onUpdate} />
      <PatientSeniority casesDataRef={casesDataRef} onUpdate={onUpdate} />
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
