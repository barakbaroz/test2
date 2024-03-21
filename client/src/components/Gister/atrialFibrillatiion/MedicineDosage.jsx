import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function MedicineDosage({ typeValue, onUpdate, ...props }) {
  const [value, setValue] = useState(null);

  const handleClick = (event) => {
    const { value } = event.target;
    setValue(value);
    onUpdate("medicine", value);
  };

  useEffect(() => {
    setValue(null);
  }, [typeValue]);

  return (
    <DosagesList {...props}>
      {data.map(({ key, name }) => (
        <Dosage key={key}>
          <Text>{name}</Text>
          <Input
            onClick={handleClick}
            name="dosages"
            value={key}
            checked={key === value}
          />
        </Dosage>
      ))}
    </DosagesList>
  );
}
MedicineDosage.propTypes = {
  onUpdate: PropTypes.func,
  typeValue: PropTypes.string,
};

const data = [
  {
    key: "eliquis-2.5mg",
    name: `2.5 מ"ג`,
  },
  {
    key: "eliquis-5mg",
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
