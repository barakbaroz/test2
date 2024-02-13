import styled from "styled-components";
import checkmark from "../../../assets/Icons/white_v.svg";
import MedicineDosage from "./MedicineDosage";
import PropTypes from "prop-types";
import { useRef } from "react";
import { checkEmptyObject, removeCheckedFields } from "../utils";

export default function MedicineType({ onUpdate, casesDataRef }) {
  const medicineRef = useRef(null);

  const updateForm = () => {
    const formData = new FormData(medicineRef.current);
    const medicine = Object.fromEntries(formData.entries());
    const medicineDataEmpty = checkEmptyObject({ medicine }, "medicine");
    if (!medicineDataEmpty) return onUpdate("medicine", medicine);
    delete casesDataRef.current.atrialFibrillation.medicine;
    const empty = checkEmptyObject(casesDataRef.current, "atrialFibrillation");
    if (empty) delete casesDataRef.current.atrialFibrillation;
  };

  const onClick = (event) => {
    const value = event.target.value;
    removeCheckedFields("type", value, "dosage");
    updateForm();
  };
  return (
    <Container ref={medicineRef}>
      <Title>איזה תרופה ניתנת למטופל?</Title>
      <MedicineList>
        {data.map(({ key, name }) => (
          <Medicine key={key}>
            <Circle>
              <Checkmark />
            </Circle>
            <Name>{name}</Name>
            <input
              type="checkbox"
              onClick={onClick}
              name="type"
              value={key}
              hidden
            />
          </Medicine>
        ))}
      </MedicineList>
      <RemoveMe>
        <StyledDosage updateForm={updateForm} />
      </RemoveMe>
    </Container>
  );
}
MedicineType.propTypes = {
  onUpdate: PropTypes.func,
  casesDataRef: PropTypes.shape({ current: PropTypes.object }),
};

const data = [
  {
    key: "eliquis",
    name: "אליקוויס",
  },
  {
    key: "pradaxa",
    name: "פרדקסה",
  },
  {
    key: "xarelto",
    name: "קסרלטו",
  },
];

const Title = styled.div`
  font-size: 1.25rem;
`;
const MedicineList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Checkmark = styled.img.attrs({ src: checkmark })`
  display: none;
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
const Name = styled.div`
  font-size: 1.125rem;
  text-align: center;
`;

const Medicine = styled.label`
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
const StyledDosage = styled(MedicineDosage)`
  display: none;
`;
const RemoveMe = styled.div`
  display: none;
`;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &:has(input[value="eliquis"]:checked) {
    ${RemoveMe} {
      display: block;
    }
  }
`;
