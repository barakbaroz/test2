import styled from "styled-components";
import arrow_up from "../../../assets/Icons/arrow_up.svg";
import { Translator } from "../../Translation";
import { useRef } from "react";
import { postAnalytics } from "../../../analytics";
import { useUser } from "../../../providers/UserProvider";
import { useParams } from "react-router-dom";

export default function ScrollButton() {
  const videoRef = useRef(null);
  const { sending } = useParams();
  const { Case } = useUser();
  const { patientSeniority } = Case.AtrialFibrillation;

  const handleAutoPlay = () => {
    if (!videoRef.current) return;
    postAnalytics({ type: "back-to-top" });
    videoRef.current.play();
  };

  if (sending === "first" && patientSeniority !== "regularly") return <></>;

  return (
    <CenteredScrollButton>
      <Button href="#video-title" onClick={handleAutoPlay}>
        <img src={arrow_up} alt="arrowUp" />
        <Translator>Video-Back-To-Video</Translator>
        <span style={{ width: "19px" }} />
      </Button>
    </CenteredScrollButton>
  );
}

const CenteredScrollButton = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.a`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  text-align: center;
  font-size: 1.125rem;
  width: calc(100% - 50px);
  max-width: 12.25rem;
  cursor: pointer;
  color: #ffffff;
  background-color: #7a9dfd;
  border: none;
  padding-block: 0.688rem;
  padding-inline: 27px;
  border-radius: 50px;
  font-family: inherit;
`;
