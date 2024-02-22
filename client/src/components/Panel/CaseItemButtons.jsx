import PropTypes from "prop-types";
import styled from "styled-components";
import PhoneInput from "./PhoneInput";
import PlayIcon from "../../assets/Icons/gist_play.svg";
import CopyLinkIcon from "../../assets/Icons/copy_link.svg";
import PanelVideo from "../Video/PanelVideo";
import { useState } from "react";

const getLastSending = (item) => {
  if (item.AtrialFibrillation?.patientSeniority !== "regularly") {
    const createdAtDate = new Date(item.createdAt);
    createdAtDate.setDate(createdAtDate.getDate() + 4);
    const currentDate = new Date(); //new Date object for the current date
    currentDate.setHours(0, 0, 0, 0); //to ignore the time part
    if (createdAtDate.toDateString() === currentDate.toDateString())
      return "second";
  }
  return "first";
};

function CaseItemButtons({ item }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/api/user/entry/${
        item.User.id
      }/${getLastSending(item)}`
    );
    setLinkCopied(true);
  };

  return (
    <Column>
      <PanelVideo
        close={() => setShowVideo(false)}
        item={item}
        show={showVideo}
      />

      <ButtonContainer>
        <Button
          disabled={!item.age || !item.gender}
          onClick={() => setShowVideo(true)}
        >
          <img src={PlayIcon} />
        </Button>
        <ActionText>נגן סרטון</ActionText>
      </ButtonContainer>

      <ButtonContainer>
        <Button onClick={handleCopyLink}>
          <img src={CopyLinkIcon} />
        </Button>
        <ActionText>{linkCopied ? "לינק הועתק" : "העתקת לינק"}</ActionText>
      </ButtonContainer>

      <ButtonContainer>
        <PhoneInput item={item} />
      </ButtonContainer>
    </Column>
  );
}

export default CaseItemButtons;

CaseItemButtons.propTypes = {
  item: PropTypes.object,
};

const Column = styled.div`
  justify-content: space-around;
  text-align: start;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f02a4c;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const ActionText = styled.div`
  color: #f02a4c;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  &:hover > ${Button} {
    background-color: #bf213c;
  }
  &:hover > ${ActionText} {
    color: #bf213c;
  }
`;
