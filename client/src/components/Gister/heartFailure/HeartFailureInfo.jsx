import styled from "styled-components";
import PropTypes from "prop-types";
import HeartConditions from "./HeartConditions";
import Symptoms from "./Symptoms";
import { checkEmptyObject } from "../utils";

export default function HeartFailureInfo({ casesDataRef }) {
  const onUpdate = (key, value) => {
    casesDataRef.current.heartFailure ||= {};
    casesDataRef.current.heartFailure[key] = value;
    const empty = checkEmptyObject(casesDataRef.current.heartFailure);
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
