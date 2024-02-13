import { useRef, useState } from "react";
import styled from "styled-components";
import GisterHeader from "../components/Gister/GisterHeader";
import GisterStep from "../components/Gister/GisterStep";
import PatientInformation from "../components/Gister/PatientInformation";
import AtrialFibrillationInfo from "../components/Gister/atrialFibrillatiion/AtrialFibrillationInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DuplicatePopUp from "../components/Gister/DuplicatePopUp";
import HeartFailureInfo from "../components/Gister/heartFailure/HeartFailureInfo";

function Gister() {
  const navigate = useNavigate();
  const casesDataRef = useRef({});
  const [loading, setLoading] = useState(false);
  const [showDuplicatePopup, setShowDuplicatePopup] = useState(false);

  const checkMissingFields = (data) => {
    let missing = false;
    for (const [key, test] of Object.entries(validator)) {
      if (test(data)) continue;
      const el = document.getElementById(key);
      if (el) el.classList.add("invalid");
      missing = true;
    }
    return missing;
  };

  const createCase = () => {
    setLoading(true);
    return axios
      .post("/api/cases/create", casesDataRef.current)
      .then(() => navigate("/panel"))
      .finally(() => setLoading(false));
  };

  const duplicate = ({ data }) => {
    if (data === "none") return createCase();
    if (data === "duplicate") return setShowDuplicatePopup(true);
  };

  const handleSubmit = () => {
    const data = casesDataRef.current;
    const missingFields = checkMissingFields(data);
    if (missingFields) return;
    setLoading(true);
    axios
      .post("/api/cases/duplicate", data)
      .then(duplicate)
      .finally(() => setLoading(false));
  };

  return (
    <GisterContainer>
      <DuplicatePopUp
        onConfirm={createCase}
        onCancel={() => setShowDuplicatePopup(false)}
        open={showDuplicatePopup}
        loading={loading}
      />
      <GisterHeader text="מערכת ליווי והדרכת מטופלים עם אי ספיקת לב" />
      <Container>
        <CasesDetails>
          <GisterStep title="פרטי מטופל/ת ויצירת קשר">
            <PatientInformation casesDataRef={casesDataRef} />
          </GisterStep>
          <GisterStep title="יצירת סרטון הדרכה - אי ספיקת לב" id="heartFailure">
            <HeartFailureInfo casesDataRef={casesDataRef} />
          </GisterStep>
          <GisterStep
            title="יצירת סרטון הדרכה - פרפור פרוזדורים"
            id="atrialFibrillation"
          >
            <AtrialFibrillationInfo casesDataRef={casesDataRef} />
          </GisterStep>
        </CasesDetails>
        <ButtonContainer>
          <ErrorTitle>* חסרים נתונים להמשך תהליך</ErrorTitle>
          <SubmitButton disabled={loading} onClick={handleSubmit}>
            שליחה
          </SubmitButton>
        </ButtonContainer>
      </Container>
    </GisterContainer>
  );
}

export default Gister;

const validator = {
  zehutNumber: ({ zehutNumber }) => zehutNumber?.length === 4,
  phoneNumber: ({ phoneNumber }) => /^\d{10}$/.test(phoneNumber),
  yearOfBirth: ({ yearOfBirth }) => yearOfBirth?.length === 4,
  heartFailure: ({ heartFailure, atrialFibrillation }) => {
    if (!heartFailure && !atrialFibrillation) return false;
    if (heartFailure && !heartFailure.heartConditions) return false;
    return true;
  },
  atrialFibrillation: ({ heartFailure, atrialFibrillation }) => {
    if (!heartFailure && !atrialFibrillation) return false;
    if (!atrialFibrillation) return true;
    const { patientType, patientSeniority, medicine } = atrialFibrillation;
    if (!patientType) return false;
    if (!patientSeniority) return false;
    if (!medicine) return false;
    const { type, dosage } = medicine;
    if (type === "eliquis" && !dosage) return false;
    return true;
  },
};

const GisterContainer = styled.div`
  --invalid: #f02a4c;
  width: 100vw;
  height: 100vh;
  direction: rtl;
  font-family: "Abraham";
`;

const ErrorTitle = styled.p`
  font-size: 1.25rem;
  color: #f02a4c;
  visibility: hidden;
`;

const Container = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-block-start: 74px;
  &:has(.invalid) {
    ${ErrorTitle} {
      visibility: visible;
    }
  }
`;

const CasesDetails = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-evenly;
  gap: 80px;
  width: 100%;
  padding-inline: 100px;
`;

const SubmitButton = styled.button`
  width: fit-content;
  background: #f02a4c;
  border-radius: 27px;
  padding-block: 0.688rem;
  padding-inline: 3.125rem;
  border: none;
  color: white;
  font-family: inherit;
  font-size: 1.188rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
