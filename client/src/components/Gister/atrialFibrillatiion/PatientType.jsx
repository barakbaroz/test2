import styled from "styled-components";
import PropTypes from "prop-types";
import ambulatory from "../../../assets/Gister/ambulatory.svg";
import hospitalized from "../../../assets/Gister/hospitalized.svg";
import { FieldTitle } from "../Giser.styled";
import { ReactComponent as WhiteV } from "../../../assets/Icons/white_v.svg";
import { useRef } from "react";

export default function PatientType({ onUpdate }) {
  const typeRef = useRef(null);

  const onClick = (event) => {
    const value = event.target.value;
    const el = document.querySelector(
      `input[name=patientType]:not([value=${value}]`
    );
    if (!el) return;
    el.checked = false;
    const formData = new FormData(typeRef.current);
    const [patientType] = formData.values();
    onUpdate("patientType", patientType);
  };

  return (
    <div>
      <FieldTitle>סוג המטופל</FieldTitle>
      <PatientTypes ref={typeRef}>
        {data.map(({ key, name, icon }) => (
          <Type key={key}>
            <input
              type="checkbox"
              hidden
              name="patientType"
              value={key}
              onClick={onClick}
            />
            <Icon>
              <img src={icon} />
              <Overlay id="Overlay" />
              <Mark>
                <WhiteV />
              </Mark>
            </Icon>
            <Text>{name}</Text>
          </Type>
        ))}
      </PatientTypes>
    </div>
  );
}

PatientType.propTypes = {
  onUpdate: PropTypes.func,
};

const data = [
  {
    key: "ambulatory",
    name: "אמבולטורי",
    icon: ambulatory,
  },
  {
    key: "hospitalized",
    name: "אשפוזי",
    icon: hospitalized,
  },
];

const Text = styled.p`
  text-align: center;
  font-size: 1.25rem;
  margin: 0;
`;

const PatientTypes = styled.form`
  display: flex;
  gap: 29px;
`;

const Mark = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #f02a4c;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 8px;
  right: 8px;
  display: none;
  z-index: 2;
`;

const Icon = styled.div`
  border: 1px solid #e5ebfb;
  border-radius: 15px;
  position: relative;
  width: 90px;
  height: 90px;
  overflow: hidden;
`;

const Overlay = styled.div`
  transition: all 200ms linear;
  background-color: rgba(0, 0, 0);
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  opacity: 0;
`;

const Type = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5625rem;
  cursor: pointer;
  &:has(input:checked) {
    ${Mark} {
      display: flex;
    }
    ${Overlay} {
      opacity: 0.1;
    }
  }
`;
