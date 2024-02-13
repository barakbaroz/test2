import styled from "styled-components";
import checkmark from "../../../assets/Icons/white_v.svg";
import PropTypes from "prop-types";
import { useRef } from "react";
import { removeCheckedFields } from "../utils";

export default function PatientSeniority({ onUpdate }) {
  const seniorityRef = useRef(null);

  const onClick = (event) => {
    const value = event.target.value;
    removeCheckedFields("patientSeniority", value);
    const formDate = new FormData(seniorityRef.current);
    const [patientSeniority] = formDate.values();
    onUpdate("patientSeniority", patientSeniority);
  };
  return (
    <Container>
      <Title>סטטוס המטופל ביחס לתרופה</Title>
      <PatientSeniorityList ref={seniorityRef}>
        {data.map(({ key, name }) => (
          <Seniority key={key}>
            <input
              type="checkbox"
              name="patientSeniority"
              value={key}
              hidden
              onClick={onClick}
            />
            <Circle>
              <Checkmark />
            </Circle>
            <Name>{name}</Name>
          </Seniority>
        ))}
      </PatientSeniorityList>
    </Container>
  );
}

PatientSeniority.propTypes = {
  onUpdate: PropTypes.func,
};

const data = [
  {
    key: "new",
    name: "חדש",
  },
  {
    key: "regularly",
    name: "קבוע",
  },
  {
    key: "changedMedicine",
    name: "הוחלף סוג",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Title = styled.div`
  font-size: 1.25rem;
`;
const PatientSeniorityList = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Circle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border-color: #7a9dfd;
  transition: border 250ms ease-in;
  border: 2px solid #84a4fc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 3px;
`;
const Checkmark = styled.img.attrs({ src: checkmark })`
  display: none;
`;

const Seniority = styled.label`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  margin-inline-end: 2.0625rem;
  &:has(input:checked) {
    ${Circle} {
      background-color: #7a9dfd;
    }
    ${Checkmark} {
      display: block;
    }
  }
`;

const Name = styled.div`
  font-size: 1.125rem;
  text-align: center;
`;
