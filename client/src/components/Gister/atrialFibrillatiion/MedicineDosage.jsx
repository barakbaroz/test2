import styled from "styled-components";
import PropTypes from "prop-types";

export default function MedicineDosage({ updateForm }) {
  return (
    <DosagesList>
      {data.map(({ key, name }) => (
        <Dosage key={key}>
          <Text>{name}</Text>
          <Input onClick={updateForm} name="dosage" value={key} />
        </Dosage>
      ))}
    </DosagesList>
  );
}
MedicineDosage.propTypes = {
  updateForm: PropTypes.func,
};

const data = [
  {
    key: "2.5 ml",
    name: `2.5 מ"ג`,
  },
  {
    key: "5 ml",
    name: `5 מ"ג`,
  },
];
const Input = styled.input.attrs({ type: "radio" })`
  display: none;
`;
const DosagesList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;
const Dosage = styled.label`
  padding-inline: 14px;
  padding-block: 5px;
  border: solid 1px #dbdbdb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms linear;
  &:has(${Input}:checked) {
    border-color: transparent;
    background-color: #7a9dfd;
    color: white;
  }
`;
const Text = styled.div`
  font-size: 1.125rem;
`;
