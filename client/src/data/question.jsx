import Lottie from "lottie-react";
import pills from "../assets/Lotties/pills.json";
import perscription from "../assets/Lotties/perscription.json";
import nurse from "../assets/Characters/Nurse_Clinic_Picker.png";

const questions = {
  "clinic-picker": {
    title: "clinic-picker",
    answersOptions: [
      {
        key: "clalit",
        next: "video",
        end: true,
      },
      {
        key: "leumit",
        next: "video",
        end: true,
      },
      {
        key: "meuhedet",
        next: "video",
        end: true,
      },
      {
        key: "maccabi",
        next: "video",
        end: true,
      },
    ],
    Media: () => <img src={nurse} />,
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
    Media: () => <Lottie animationData={perscription} />,
  },
  "taking-medication": {
    title: "taking-medication",
    answersOptions: [
      {
        key: "yes",
        next: "video",
        end: true,
      },
      {
        key: "not-yet",
        next: "video",
        end: true,
      },
    ],
    Media: () => <Lottie animationData={pills} />,
  },
  "why-not-purchased": {
    title: "why-not-purchased",
    answersOptions: [
      {
        key: "missing-pharmacy",
        next: "video",
        end: true,
      },
      {
        key: "didnt-get-to",
        next: "video",
        end: true,
      },
      {
        key: "forgot",
        next: "video",
        end: true,
      },
      {
        key: "not-interested",
        next: "video",
        end: true,
      },
    ],
    Media: () => <Lottie animationData={pills} />,
  },
};
export default questions;
