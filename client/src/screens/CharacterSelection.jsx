import { useState, Fragment, useContext } from "react";
import styled from "styled-components";
import background from "../assets/Backgrounds/wave_background.svg";
import data from "../components/CharacterSelection/CharacterSelectionData.json";
import { useNavigate, useParams } from "react-router-dom";
import avatarsImg from "../assets/Avatars";
import { Translator } from "../components/Translation";
import { postAnalytics } from "../analytics";
import { userContext } from "../providers/UserProvider";
import PropTypes from "prop-types";

function CharacterSelection() {
  const { sending } = useParams();
  const navigate = useNavigate();
  const userInfo = useContext(userContext);
  const [answers, setAnswers] = useState({});
  const [avatarKey, setAvatarKey] = useState("");
  const [avatar, setAvatar] = useState({});
  const [showError, setShowError] = useState(false);

  const answerQuestion = (questionKey, answerKey) => () => {
    postAnalytics({ type: `answer-${questionKey}-${answerKey}` });
    setAvatarKey("");
    setAnswers((prev) => ({ ...prev, [questionKey]: answerKey }));
  };

  const handleAvatar = (key, avatar) => () => {
    postAnalytics({ type: `avatarKey-${key}` });
    const missinsAnswers = !Object.keys(data).every((key) => key in answers);
    setShowError(missinsAnswers);
    if (missinsAnswers) return;
    setAvatarKey(key);
    setAvatar(avatar);
  };

  const filtersAvatars = Object.values(answers).reduce(
    (prev, answer) => prev.filter(({ fields }) => fields.includes(answer)),
    avatars
  );

  const handelNext = () => {
    if (!avatarKey) return setShowError(true);
    postAnalytics({ type: "general-information-answered" });
    userInfo.updateCase({ ...answers, Avatar: avatar });
    if (sending === "first") return navigate("../questionnaire/clinic-picker");
    if (sending === "second")
      return navigate("../questionnaire/purchased-medicine");
    return navigate("../video-page");
  };

  return (
    <CharacterSelectionContainer id="CharacterSelectionContainer">
      <Title id="PickYourCharecter">
        <Translator>Character-Selection-Title</Translator>
      </Title>
      <PickerContainer id="PickerContainer">
        {Object.entries(data).map(([questionKey, questionData]) => (
          <Fragment key={questionKey}>
            <QuestionWrapper id="QuestionWrapper">
              <Question id="Question">
                <Translator>{questionData.title}</Translator>
              </Question>
              <QuestionPickerContainer id="QuestionPickerContainer">
                {Object.entries(questionData.answers).map(
                  ([answerKey, answerText]) => (
                    <Fragment key={answerKey}>
                      <QuestionPicker
                        id="QuestionPicker"
                        selected={answerKey === answers[questionKey]}
                        onClick={answerQuestion(questionKey, answerKey)}
                      >
                        <Translator>{answerText}</Translator>
                      </QuestionPicker>
                      <Divider id="Divider" />
                    </Fragment>
                  )
                )}
              </QuestionPickerContainer>
            </QuestionWrapper>
            <Line />
          </Fragment>
        ))}
        <CharacterQuestion id="CharacterQuestion">
          <Question id="Question">
            <Translator>Character-Selection-Avatar</Translator>
          </Question>
          <CharacterQuestionPickerContainer id="CharacterQuestionPickerContainer">
            {filtersAvatars.map(({ key, avatar, image }) => (
              <Avatar
                id="Avatar"
                key={key}
                selected={key === avatarKey}
                onClick={handleAvatar(key, avatar)}
                src={image}
              />
            ))}
          </CharacterQuestionPickerContainer>
          <ErrorContainer id="ErrorContainer">
            <Error id="Error" show={showError}>
              <Translator>Character-Selection-Error</Translator>
            </Error>
          </ErrorContainer>
        </CharacterQuestion>
      </PickerContainer>
      <ConfirmationButton
        id="Button"
        onClick={handelNext}
        avatarKey={avatarKey}
      >
        <Translator>Next</Translator>
      </ConfirmationButton>
    </CharacterSelectionContainer>
  );
}

export default CharacterSelection;

CharacterSelection.propTypes = {
  sendingType: PropTypes.string,
};

const avatars = [
  {
    key: "male_middle_white",
    fields: ["male", "20-50", "50-70", "70+", "other"],
    avatar: { gender: "male", age: "middle", ethnicity: "white" },
    image: avatarsImg.male_middle_white,
  },
  {
    key: "male_middle_black",
    fields: ["male", "20-50", "50-70", "70+", "other"],
    avatar: { gender: "male", age: "middle", ethnicity: "black" },
    image: avatarsImg.male_middle_black,
  },
  {
    key: "male_old_white",
    fields: ["male", "70+", "other"],
    avatar: { gender: "male", age: "old", ethnicity: "white" },
    image: avatarsImg.male_old_white,
  },
  {
    key: "male_old_black",
    fields: ["male", "70+", "other"],
    avatar: { gender: "male", age: "old", ethnicity: "black" },
    image: avatarsImg.male_old_black,
  },
  {
    key: "female_middle_white",
    fields: ["female", "20-50", "50-70", "70+", "other"],
    avatar: { gender: "female", age: "middle", ethnicity: "white" },
    image: avatarsImg.female_middle_white,
  },
  {
    key: "female_middle_black",
    fields: ["female", "20-50", "50-70", "70+", "other"],
    avatar: { gender: "female", age: "middle", ethnicity: "black" },
    image: avatarsImg.female_middle_black,
  },
  {
    key: "female_old_white",
    fields: ["female", "70+", "other"],
    avatar: { gender: "female", age: "old", ethnicity: "white" },
    image: avatarsImg.female_old_white,
  },
  {
    key: "female_old_black",
    fields: ["female", "70+", "other"],
    avatar: { gender: "female", age: "old", ethnicity: "black" },
    image: avatarsImg.female_old_black,
  },
];

const CharacterSelectionContainer = styled.div`
  height: calc(100dvh - var(--header-size));
  width: 100vw;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  padding-inline: 17px;
  box-sizing: border-box;
  --inner-padding-inline: 18px;
`;

const Title = styled.p`
  text-align: start;
  font-size: 1.5rem;
  font-weight: 500;
  padding-inline: var(--inner-padding-inline);
  padding-block: 1.438em;
  margin: 0;
`;

const PickerContainer = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding: var(--inner-padding-inline);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0px 3px 10px 0px #0000000d;
`;

const Question = styled.p`
  font-size: 1.1875rem;
  text-align: start;
  margin: 0rem;
`;

const QuestionPicker = styled.div`
  color: ${({ selected }) => (selected ? "#84A4FC" : "#A7A7A7")};
  font-size: 1.1875rem;
`;

const QuestionPickerContainer = styled.div`
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: pointer;
`;

const CharacterQuestionPickerContainer = styled(QuestionPickerContainer)`
  width: calc(100% + (var(--inner-padding-inline) * 2));
  margin-inline-start: calc(var(--inner-padding-inline) * -1);
  cursor: pointer;
`;

const Divider = styled.div`
  margin: 0 1rem;
  width: 1px;
  background-color: #d1dcfc;
  border-radius: 10px;
  :last-child {
    display: none;
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #eaeaea;
`;

const ConfirmationButton = styled.button`
  text-decoration: none;
  padding: 0.5rem 3rem;
  background-color: #f02a4c;
  border-radius: 200px;
  border: none;
  color: #ffffff;
  font-size: 1.063rem;
  font-family: inherit;
  opacity: 0.6;
  opacity: ${({ avatarKey }) => avatarKey && 1};
  margin-top: 2.125rem;
  display: block;
  margin-inline: auto;
`;

const Avatar = styled.img`
  margin: 0.5rem;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? "#84a4fc" : "transparent")};
  width: 4.688rem;
  height: 4.688rem;
`;

const CharacterQuestion = styled.div`
  width: 100%;
  display: inline-block;
`;

const ErrorContainer = styled.div`
  display: flex;
`;

const Error = styled.p`
  color: #f02a4c;
  font-size: 0.875rem;
  margin: 0rem;
  display: ${({ show }) => (show ? "block" : "none")};
  ::before {
    content: "*";
  }
`;
