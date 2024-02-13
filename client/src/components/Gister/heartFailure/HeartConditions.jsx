import { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FieldTitle } from "../Giser.styled";
import { ReactComponent as WhiteV } from "../../../assets/Icons/white_v.svg";
import ConditionBackground from "../../../assets/Gister/condition_background.svg";
import heartConditionsIcons from "../../../assets/Gister/heart_conditions/inedx";

function HeartConditions({ onUpdate }) {
  const conditionsRef = useRef(null);

  const handleSelect = () => {
    const formData = new FormData(conditionsRef.current);
    let heartConditions = [...formData.keys()];
    if (!heartConditions.length) heartConditions = null;
    onUpdate("heartConditions", heartConditions);
  };

  return (
    <div>
      <FieldTitle>
        מהו מצב הלב של המטופל/ת? (ניתן לבחור יותר ממצב אחד)
      </FieldTitle>
      <Conditions id="heartConditions" ref={conditionsRef}>
        {data.map(({ key, name, icon }) => (
          <Condition key={key}>
            <Icon>
              <ConditionIcon id="ConditionIcon" src={icon} />
              <Overlay />
              <Mark>
                <WhiteV />
              </Mark>
            </Icon>
            <Input onChange={handleSelect} name={key} />
            <Name>{name}</Name>
          </Condition>
        ))}
      </Conditions>
    </div>
  );
}

HeartConditions.propTypes = {
  onUpdate: PropTypes.func,
};

const data = [
  {
    key: "aortic_valve_regurgitation",
    name: "דלף של המסתם האאורטלי",
    icon: heartConditionsIcons.aortic_valve_regurgitation,
  },
  {
    key: "aortic_valve_stenosis",
    name: "היצרות של המסתם האאורטלי",
    icon: heartConditionsIcons.aortic_valve_stenosis,
  },
  {
    key: "atherosclerosis",
    name: "טרשת עורקים",
    icon: heartConditionsIcons.atherosclerosis,
  },
  {
    key: "cardiac_arrhythmia",
    name: "הפרעות בקצב הלב",
    icon: heartConditionsIcons.cardiac_arrhythmia,
  },
  {
    key: "cardiomyopathy",
    name: "קרדיומיופתיה",
    icon: heartConditionsIcons.cardiomyopathy,
  },
  {
    key: "general",
    name: "כללי",
    icon: heartConditionsIcons.general,
  },
  {
    key: "mitral_valve_regurgitation",
    name: "דלף של המסתם המיטרלי",
    icon: heartConditionsIcons.mitral_valve_regurgitation,
  },
  {
    key: "mitral_valve_stenosis",
    name: "היצרות של המסתם המיטרלי",
    icon: heartConditionsIcons.mitral_valve_stenosis,
  },
  {
    key: "myocardial_infarction",
    name: "אוטם שריר הלב",
    icon: heartConditionsIcons.myocardial_infarction,
  },
];

export default HeartConditions;

const ConditionIcon = styled.img`
  position: absolute;
  z-index: 1;
`;

const Conditions = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const Condition = styled.label`
  display: flex;
  flex-direction: column;
  width: 90px;
`;

const Input = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const Mark = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #f02a4c;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 12px;
  left: 12px;
  display: none;
  z-index: 2;
`;

const Overlay = styled.div`
  transition: all 200ms linear;
  background-color: rgba(0, 0, 0);
  position: relative;
  width: 100%;
  height: 100%;
  inset: 0;
  opacity: 0;
`;

const Icon = styled.div`
  width: 90px;
  height: 90px;
  background-image: url(${ConditionBackground});
  background-size: contain;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:has(+ ${Input}:checked) {
    & > ${Mark} {
      display: flex;
    }
    & > ${Overlay} {
      opacity: 0.5;
    }
  }
`;

const Name = styled.p`
  font-size: 0.875rem;
  text-align: center;
  line-height: 18px;
`;
