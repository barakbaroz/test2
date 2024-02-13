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
  WhyNotPurchased: {
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
