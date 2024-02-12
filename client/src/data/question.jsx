import Lottie from "lottie-react";
import pills from "../assets/Lotties/pills.json";
import perscription from "../assets/Lotties/perscription.json";
import nurse from "../assets/Characters/Nurse_Clinic_Picker.png";

const questions = {
  clinicPicker: {
    title: "clinic-picker",
    answersOptions: [
      {
        key: "clalit",
        next: "video",
      },
      {
        key: "leumit",
        next: "video",
      },
      {
        key: "meuhedet",
        next: "video",
      },
      {
        key: "maccabi",
        next: "video",
      },
    ],
    Media: () => <img src={nurse} />,
  },
  PurchaseQuestion: {
    title: "purchased-medicine",
    answersOptions: [
      {
        key: "yes",
        next: "taking-medication",
      },
      {
        key: "not-yet",
        next: "why-not-purchased",
      },
    ],
    Media: () => <Lottie animationData={perscription} />,
  },
  TakingMedication: {
    title: "started-using",
    answersOptions: [
      {
        key: "yes",
        next: "video",
      },
      {
        key: "not-yet",
        next: "video",
      },
    ],
    Media: () => <Lottie animationData={pills} />,
  },
  WhyNotPurchased: {
    title: "why-not-purchased",
    answersOptions: [
      {
        key: "missing-pharmacy",
        next: "video",
      },
      {
        key: "didnt-get-to",
        next: "video",
      },
      {
        key: "forgot",
        next: "video",
      },
      {
        key: "not-interested",
        next: "video",
      },
    ],
    Media: () => <Lottie animationData={pills} />,
  },
};
export default questions;
