import { useContext } from "react";
import { questionnaireContext } from "../providers/QuestionnaireProvider";
import Question from "../components/Questionnaire/Question";

const purchasedAnswers = ["Yes", "Not-Yet"];
const notPurchasedAnswers = [
  "Missing-Pharmacy",
  "Didnt-Get-To",
  "Forgot",
  "Not-Interested",
];

export default function TakingMedication() {
  const { updateAnswer, answers, submit } = useContext(questionnaireContext);
  let titleToDisplay;
  let answersToDisplay;
  if (answers.current["purchasedMedicine"] === "Yes") {
    titleToDisplay = "Started-Using-Question";
    answersToDisplay = purchasedAnswers;
  } else {
    answersToDisplay = notPurchasedAnswers;
    titleToDisplay = "Why-Not-Question";
  }
  const handleAnswerClick = (answerKey) => {
    const question =
      answers.current["purchasedMedicine"] === "Yes"
        ? "startedUsing"
        : "whyNotPurchased";
    updateAnswer({ questionKey: question, answerKey });
    submit();
  };
  return (
    <Question
      handleAnswerClick={handleAnswerClick}
      answersArray={answersToDisplay}
      title={titleToDisplay}
      lottieName="pills"
    />
  );
}
