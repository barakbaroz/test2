import { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GeneralInput } from "./Giser.styled";

const regex = new RegExp("[0-9]");

function PinInput({ ContainerRef, nextInput, onChange, ...props }) {
  const refs = useRef([]);

  const handleChange = (index) => (event) => {
    const { data } = event.nativeEvent;
    const nextPin = refs.current[index + 1] || nextInput?.current;
    if (!regex.test(data))
      return (event.target.value = event.target.value.replace(/\D/g, ""));
    if (data && nextPin) nextPin.focus();
    event.target.value = data;
    onChange(refs.current.map(({ value }) => value).join(""));
  };

  const handleFocus = (index) => () => {
    const prevPin = refs?.current[index - 1];
    if (!prevPin) return;
    const val = prevPin?.value;
    if (!val) prevPin.focus();
  };

  const handleKeyDown = (index) => (event) => {
    const { key, target } = event;
    const { value } = target;
    if (key !== "Backspace") return;
    onChange(
      refs.current
        .map(({ value }) => value)
        .join("")
        .slice(0, -1)
    );
    const prevPin = refs.current[index - 1];
    if (!prevPin) return;
    if (value.length !== 0) return;
    prevPin.focus();
  };

  return (
    <Utility>
      <PinInputContainer ref={ContainerRef} {...props}>
        {[...Array(4)].map((_, index) => (
          <Pin
            type="tel"
            ref={(el) => (refs.current[index] = el)}
            key={index}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            onFocus={handleFocus(index)}
          />
        ))}
      </PinInputContainer>
    </Utility>
  );
}

PinInput.propTypes = {
  ContainerRef: PropTypes.object,
  nextInput: PropTypes.object,
  onChange: PropTypes.func,
};

export default PinInput;

const Pin = styled(GeneralInput)`
  padding-inline: var(--field-padding-block);
  width: var(--field-line-height);
  text-align: center;
`;

const PinInputContainer = styled.div`
  border: 1px solid transparent;
  direction: ltr;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

const Utility = styled.div`
  .invalid {
    & > ${Pin} {
      border-color: var(--invalid);
    }
  }
`;
