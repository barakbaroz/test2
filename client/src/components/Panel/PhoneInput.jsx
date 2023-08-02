import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import xIcon from "../../assets/Icons/black_X.svg";
import Phone from "../../assets/Icons/phone.svg";
import SendIcon from "../../assets/Icons/send.svg";
import axios from "axios";

const NumberRgx = /(^[0-9]+$)/;
const SubmitRgx = /^(?=\d{10}$)[0-9]+$/;

const PhoneInput = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [number, setNumber] = useState("");

  const handleClose = () => {
    setError(false);
    setOpen(false);
    setNumber("");
  };

  const handleClick = () => {
    if (!open) return setOpen(true);
    if (!SubmitRgx.test(number)) return setError(true);

    axios.post("/api/sms/sendImmediate", {
      phoneNumber: number,
      CaseId: item.id,
      type: "caseCreation",
    });
    handleClose();
  };

  const handleChange = (event) => {
    if (error) setError(false);
    const { value } = event.target;
    if (!NumberRgx.test(value)) return;
    setNumber(value);
  };

  return (
    <PhoneWrapper>
      <PhoneContainer>
        <InputWrapper open={open} error={error}>
          <Icon id="sendIcon" onClick={handleClick}>
            <img src={open ? SendIcon : Phone} alt="icon" />
          </Icon>
          <Input
            placeholder="הזן/י מספר נייד"
            type="tel"
            value={number}
            maxLength={10}
            open={open}
            onChange={handleChange}
          />
          <Close open={open} src={xIcon} onClick={handleClose}></Close>
        </InputWrapper>
      </PhoneContainer>
      <ActionText open={open}>שליחה חוזרת</ActionText>
    </PhoneWrapper>
  );
};

PhoneInput.propTypes = {
  item: PropTypes.object,
};

export default PhoneInput;

const ActionText = styled.div`
  visibility: ${({ open }) => (open ? "hidden" : "auto")};
  color: #f02a4c;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Input = styled.input`
  font-family: "Assistant";
  background-color: transparent;
  width: 6em;
  height: 100%;
  border: none;
  outline: none;
  margin-inline-start: 0.688rem;
  margin-inline-end: 16px;
  font-size: 1rem;
`;

const Icon = styled.div`
  border-radius: 50%;
  height: 100%;
  aspect-ratio: 1;
  background-color: #f02a4c;
  z-index: 2;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Close = styled.img`
  width: 0.563rem;
  height: 0.563rem;
  padding: 0.875rem;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  transition: max-width 0.5s ease-in-out;
  background-color: #f0efef;
  display: flex;
  align-items: center;
  position: absolute;
  max-width: ${({ open }) => (open ? "20rem" : "100%")};
  width: auto;
  top: 0;
  bottom: 0;
  border-radius: 99px;
  z-index: 1;
  overflow: hidden;
  border: ${({ error }) => (error ? "1px solid #F02A4C;" : "none")};
`;

const PhoneContainer = styled.div`
  position: relative;
  height: 2.25rem;
  width: 2.25rem;
`;

const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  &:hover ${Icon} {
    background-color: #bf213c;
  }
  &:hover ${ActionText} {
    color: #bf213c;
  }
`;
