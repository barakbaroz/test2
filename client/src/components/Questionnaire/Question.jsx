import { useContext } from "react";
import styled, { css } from "styled-components";
import { Translator } from "../../components/Translation";
import background from "../../assets/Backgrounds/wave_background.svg";
import { buttonCSS } from "../../components/general.style";
import PropTypes from "prop-types";
import { questionnaireContext } from "../../providers/QuestionnaireProvider";
import questions from "../../data/question";
import { useNavigate } from "react-router-dom";

export default function Question({ questionKey }) {
  const navigate = useNavigate();
  const { answers, updateAnswer, submit } = useContext(questionnaireContext);
  const { title, answersOptions, Media } = questions[questionKey];

  const handleAnswerClick = ({ key, next }) => {
    updateAnswer({ questionKey, answerKey: key });
    if (next !== "video") return navigate(`../${next}`);
    else submit();
  };
  return (
    <Wrapper>
      <LottieWrapper>
        <Media />
      </LottieWrapper>
      <Title>
        <Translator>{title}</Translator>
      </Title>
      {answersOptions.map(({ key, next }) => (
        <Answer
          selected={answers.current[questionKey] === key}
          key={key}
          onClick={() => handleAnswerClick({ key, next })}
        >
          <Translator>{key}</Translator>
        </Answer>
      ))}
    </Wrapper>
  );
}

Question.propTypes = {
  questionKey: PropTypes.string,
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

const LottieWrapper = styled.div`
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

// const Nurse = styled.img`
//   width: 8.063rem;
//   max-width: 100%;
//   align-self: center;
// `;
