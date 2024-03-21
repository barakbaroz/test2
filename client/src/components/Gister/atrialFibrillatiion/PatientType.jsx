import styled from "styled-components";
import PropTypes from "prop-types";
import ambulatory from "../../../assets/Gister/ambulatory.svg";
import hospitalized from "../../../assets/Gister/hospitalized.svg";
import { FieldTitle } from "../Giser.styled";
import { ReactComponent as WhiteV } from "../../../assets/Icons/white_v.svg";
import { useState } from "react";

export default function PatientType({ onUpdate }) {
  const [value, setValue] = useState(null);

  const onClick = (event) => {
    setValue((prev) => {
      const { value } = event.target;
      let newValue = value;
      if (prev === value) newValue = null;
      onUpdate("patientType", newValue);
      return newValue;
    });
  };

  return (
    <div>
      <FieldTitle>סוג המטופל</FieldTitle>
      <PatientTypes>
        {data.map(({ key, name, icon }) => (
          <Type key={key}>
            <input
              type="checkbox"
              hidden
              checked={key === value}
              name="patientType"
              value={key}
              onClick={onClick}
            />
            <Icon>
              <Image src={icon} />
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
    key: "hospitalized",
    name: "אשפוזי",
    icon: hospitalized,
  },
  {
    key: "ambulatory",
    name: "אמבולטורי",
    icon: ambulatory,
  },
];

const Text = styled.p`
  text-align: center;
  font-size: 1.25rem;
  margin: 0;
`;

const Image = styled.img`
  height: 40px;
`;

const PatientTypes = styled.div`
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
  display: flex;
  opacity: 0;
  z-index: 2;
  transition: opacity 200ms linear;
`;

const Icon = styled.div`
  border: 1px solid#7A9DFD;
  border-radius: 15px;
  position: relative;
  width: 90px;
  height: 90px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms linear;
`;

const Overlay = styled.div`
  transition: all 200ms linear;
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
      opacity: 1;
    }
    ${Overlay} {
      opacity: 1;
    }
    ${Icon} {
      background-color: #e5ebfb;
    }
  }
`;
