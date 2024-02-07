import { useContext } from "react";
import styled, { css } from "styled-components";
import { Translator } from "../../components/Translation";
import background from "../../assets/Backgrounds/wave_background.svg";
import Lottie from "lottie-react";
import nurse from "../../assets/Characters/Nurse_Clinic_Picker.png";
import pills from "../../assets/Lotties/pills.json";
import perscription from "../../assets/Lotties/perscription.json";
import { buttonCSS } from "../../components/general.style";
import PropTypes from "prop-types";
import { questionnaireContext } from "../../providers/QuestionnaireProvider";

const lottiesMapper = {
  pills: { animationData: pills },
  perscription: { animationData: perscription },
};
const questionAnswers = {
  "Purchased-Medicine-Question": "purchasedMedicine",
  "Clinic-Picker-Title": "clinicPicker",
  "Why-Not-Title": "WhyNot",
};
export default function Question({
  answersArray,
  title,
  lottieName,
  handleAnswerClick,
}) {
  const { answers } = useContext(questionnaireContext);
  return (
    <Wrapper>
      {lottieName ? (
        <LottieWrapper {...lottiesMapper[lottieName]} />
      ) : (
        <Nurse src={nurse} />
      )}
      <Title>
        <Translator>{title}</Translator>
      </Title>
      {answersArray.map((answer) => (
        <Answer
          selected={answers.current[questionAnswers[title]] === answer}
          key={answer}
          onClick={() => handleAnswerClick(answer)}
        >
          <Translator>{answer}</Translator>
        </Answer>
      ))}
    </Wrapper>
  );
}

Question.propTypes = {
  answersArray: PropTypes.array,
  title: PropTypes.string,
  lottieName: PropTypes.string,
  handleAnswerClick: PropTypes.func,
};

const Wrapper = styled.div`
  height: calc(100dvh - var(--header-size));
  width: 100vw;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-inline: 42px;
  padding-block-start: 1.351rem;
`;

const Title = styled.h1`
  font-size: 1.625rem;
  margin: 0;
  text-align: center;
  padding-block-start: 2.226rem;
  padding-block-end: 2.75rem;
`;

const LottieWrapper = styled(Lottie)`
  width: 7.313rem;
  max-width: 100%;
  align-self: center;
`;

const Answer = styled.button`
  ${buttonCSS}
  ${({ selected }) =>
    selected &&
    css`
      background-color: #84a4fc;
      color: #ffffff;
    `}
`;

const Nurse = styled.img`
  width: 8.063rem;
  max-width: 100%;
  align-self: center;
`;
