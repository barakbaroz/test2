import styled, { css } from "styled-components";
import { Translator } from "../../components/Translation";
import background from "../../assets/Backgrounds/wave_background.svg";
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
      <Media />
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
  align-items: stretch;
`;

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
  margin-block-start: 20px;
  margin-block-end: 24px;
`;

const Answer = styled.button`
  background-color: #ffffff;
  border-radius: 3rem;
  border: none;
  color: #0f0f0f;
  font-family: inherit;
  padding-block: 0.75rem;
  cursor: pointer;
  font-size: 1.188rem;
  &:active {
    background-color: #7a9dfd;
    color: #ffffff;
  }
  ${({ selected }) =>
    selected &&
    css`
      background-color: #84a4fc;
      color: #ffffff;
    `}
`;
