import Lottie from "lottie-react";
import pills from "../assets/Lotties/pills.json";
import perscription from "../assets/Lotties/perscription.json";
import nurse from "../assets/Characters/nurse_circle.png";
import styled from "styled-components";

const StyledLottie = styled(Lottie)`
  height: 130px;
  align-self: center;
`;

const StyledImage = styled.img`
  width: 130px;
  align-self: center;
`;
const questions = {
  "clinic-picker": {
    title: "clinic-picker",
    answersOptions: [
      {
        key: "clalit",
        next: "video-page",
        end: true,
      },
      {
        key: "leumit",
        next: "video-page",
        end: true,
      },
      {
        key: "meuhedet",
        next: "video-page",
        end: true,
      },
      {
        key: "maccabi",
        next: "video-page",
        end: true,
      },
    ],
    Media: () => <StyledImage src={nurse} />,
  },
  "purchased-medicine": {
    title: "purchased-medicine",
    answersOptions: [
      {
        key: "yes",
        next: "questionnaire/taking-medication",
      },
      {
        key: "not-yet",
        next: "questionnaire/why-not-purchased",
      },
    ],
    Media: () => <StyledLottie animationData={perscription} loop={false} />,
  },
  "taking-medication": {
    title: "taking-medication",
    answersOptions: [
      {
        key: "yes",
        next: "video-page",
        end: true,
      },
      {
        key: "not-yet",
        next: "video-page",
        end: true,
      },
    ],
    Media: () => <StyledLottie animationData={pills} loop={false} />,
  },
  "why-not-purchased": {
    title: "why-not-purchased",
    answersOptions: [
      {
        key: "missing-pharmacy",
        next: "video-page",
        end: true,
      },
      {
        key: "didnt-get-to",
        next: "video-page",
        end: true,
      },
      {
        key: "forgot",
        next: "video-page",
        end: true,
      },
      {
        key: "not-interested",
        next: "video-page",
        end: true,
      },
    ],
    Media: () => <StyledLottie animationData={pills} loop={false} />,
  },
};
export default questions;
