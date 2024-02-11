import styled from "styled-components";
import PropTypes from "prop-types";
import HeartConditions from "./HeartConditions";
import Symptoms from "./Symptoms";

export default function HeartFailureInfo({ casesDataRef }) {
  const onUpdate = (key, value) => {
    casesDataRef.current.heartFailure ||= {};
    casesDataRef.current.heartFailure[key] = value;
    const empty =
      Object.values(casesDataRef.current.heartFailure).filter(Boolean)
        .length === 0;
    if (empty) delete casesDataRef.current.heartFailure;
    document.getElementById("atrialFibrillation")?.classList.remove("invalid");
    document.getElementById("heartFailure")?.classList.remove("invalid");
  };

  return (
    <Container>
      <HeartConditions onUpdate={onUpdate} />
      <Symptoms onUpdate={onUpdate} />
    </Container>
  );
}

HeartFailureInfo.propTypes = {
  casesDataRef: PropTypes.object,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
