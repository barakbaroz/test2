import styled, { css } from "styled-components";
import { Translator } from "../../components/Translation";
import background from "../../assets/Backgrounds/wave_background.svg";
import { buttonCSS } from "../../components/general.style";
import PropTypes from "prop-types";

export default function Question({
  selectedKey,
  handleAnswerClick,
  title,
  answersOptions,
  Media,
}) {
  return (
    <Wrapper>
      <LottieWrapper>
        <Media />
      </LottieWrapper>
      <Title>
        <Translator>Questionnaire-Question-{title}</Translator>
      </Title>
      {answersOptions.map(({ key, next, end }) => (
        <Answer
          selected={selectedKey === key}
          key={key}
          onClick={() => handleAnswerClick({ key, next, end })}
        >
          <Translator>Questionnaire-Answer-{key}</Translator>
        </Answer>
      ))}
    </Wrapper>
  );
}

Question.propTypes = {
  questionKey: PropTypes.string,
  selectedKey: PropTypes.string,
  handleAnswerClick: PropTypes.func,
  title: PropTypes.string,
  answersOptions: PropTypes.array,
  Media: PropTypes.func,
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
  padding-block-start: 1.288rem;
  padding-block-end: 1.5rem;
`;

const LottieWrapper = styled.div`
  width: 7.313rem;
  max-width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
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
