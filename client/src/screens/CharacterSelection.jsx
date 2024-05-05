import { useState, Fragment } from "react";
import styled from "styled-components";
import background from "../assets/Backgrounds/wave_background.svg";
import data from "../components/CharacterSelection/CharacterSelectionData.json";
import { useNavigate, useParams } from "react-router-dom";
import avatarsImg from "../assets/Avatars";
import { Translator } from "../components/Translation";
import { postAnalytics } from "../analytics";
import { useUser } from "../providers/UserProvider";
import PropTypes from "prop-types";
import { buttonCSS } from "../components/general.style";

function CharacterSelection() {
  const { sending } = useParams();
  const navigate = useNavigate();
  const userInfo = useUser();
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
    userInfo.updateCase({ ...answers, Avatar: avatar });
    postAnalytics({ type: "general-information-answered" });

    if (!userInfo.Case.AtrialFibrillation)
      return navigate("../video-page-heart");
    if (sending === "second")
      return navigate("../questionnaire/purchased-medicine");
    const { patientSeniority } = userInfo.Case.AtrialFibrillation;
    if (patientSeniority !== "regularly")
      return navigate("../questionnaire/clinic-picker");
    return navigate("../video-page-atrial");
  };

  return (
    <Page>
      <Title>
        <Translator>Character-Selection-Title</Translator>
      </Title>
      <PickerContainer id="PickerContainer">
        {Object.entries(data).map(([questionKey, questionData]) => (
          <Fragment key={questionKey}>
            <Question id="Question">
              <Translator>{questionData.title}</Translator>
            </Question>
            <Options>
              {Object.entries(questionData.answers).map(
                ([answerKey, answerText]) => (
                  <Fragment key={answerKey}>
                    <Option
                      selected={answerKey === answers[questionKey]}
                      onClick={answerQuestion(questionKey, answerKey)}
                    >
                      <Translator>{answerText}</Translator>
                    </Option>
                    <Divider />
                  </Fragment>
                )
              )}
            </Options>
            <Line />
          </Fragment>
        ))}
        <Question id="Question">
          <Translator>
            Character-Selection-Avatar-
            {filtersAvatars.length === 1 ? "Single" : "General"}
          </Translator>
        </Question>
        <AvatarOptions>
          {filtersAvatars.map(({ key, avatar, image }) => (
            <Avatar
              key={key}
              selected={key === avatarKey}
              onClick={handleAvatar(key, avatar)}
              src={image}
            />
          ))}
        </AvatarOptions>
        <Error id="Error" show={showError}>
          <Translator>Character-Selection-Error</Translator>
        </Error>
      </PickerContainer>
      <ConfirmationButton
        id="Button"
        onClick={handelNext}
        avatarKey={avatarKey}
      >
        <Translator>Next</Translator>
      </ConfirmationButton>
    </Page>
  );
}

export default CharacterSelection;

CharacterSelection.propTypes = {
  sendingType: PropTypes.string,
};

const avatars = [
  {
    key: "male_young_white",
    fields: ["male", "20-50", "50-70", "other"],
    avatar: { gender: "male", age: "young", ethnicity: "white" },
    image: avatarsImg.male_young_white,
  },
  // {
  //   key: "male_young_black",
  //   fields: ["male", "20-50", "50-70", "other"],
  //   avatar: { gender: "male", age: "young", ethnicity: "black" },
  //   image: avatarsImg.male_young_black,
  // },
  {
    key: "male_middle_white",
    fields: ["male", "50-70", "70+", "other"],
    avatar: { gender: "male", age: "middle", ethnicity: "white" },
    image: avatarsImg.male_middle_white,
  },
  // {
  //   key: "male_middle_black",
  //   fields: ["male", "20-50", "50-70", "70+", "other"],
  //   avatar: { gender: "male", age: "middle", ethnicity: "black" },
  //   image: avatarsImg.male_middle_black,
  // },
  {
    key: "male_old_white",
    fields: ["male", "70+", "other"],
    avatar: { gender: "male", age: "old", ethnicity: "white" },
    image: avatarsImg.male_old_white,
  },
  // {
  //   key: "male_old_black",
  //   fields: ["male", "70+", "other"],
  //   avatar: { gender: "male", age: "old", ethnicity: "black" },
  //   image: avatarsImg.male_old_black,
  // },
  {
    key: "female_young_white",
    fields: ["female", "20-50", "50-70", "other"],
    avatar: { gender: "female", age: "young", ethnicity: "white" },
    image: avatarsImg.female_young_white,
  },
  // {
  //   key: "female_young_black",
  //   fields: ["female", "20-50", "50-70", "other"],
  //   avatar: { gender: "female", age: "young", ethnicity: "black" },
  //   image: avatarsImg.female_young_black,
  // },
  {
    key: "female_middle_white",
    fields: ["female", "50-70", "70+", "other"],
    avatar: { gender: "female", age: "middle", ethnicity: "white" },
    image: avatarsImg.female_middle_white,
  },
  // {
  //   key: "female_middle_black",
  //   fields: ["female", "20-50", "50-70", "70+", "other"],
  //   avatar: { gender: "female", age: "middle", ethnicity: "black" },
  //   image: avatarsImg.female_middle_black,
  // },
  {
    key: "female_old_white",
    fields: ["female", "70+", "other"],
    avatar: { gender: "female", age: "old", ethnicity: "white" },
    image: avatarsImg.female_old_white,
  },
  // {
  //   key: "female_old_black",
  //   fields: ["female", "70+", "other"],
  //   avatar: { gender: "female", age: "old", ethnicity: "black" },
  //   image: avatarsImg.female_old_black,
  // },
];

const Page = styled.div`
  min-height: calc(100dvh - var(--header-size));
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
  padding-block-start: 1.938rem;
  padding-block-end: 1.75rem;
  margin: 0;
`;

const PickerContainer = styled.div`
  display: grid;
  grid-template-columns:
    [full-start]
    var(--inner-padding-inline)
    [content-start] 1fr [content-end]
    var(--inner-padding-inline)
    [full-end];
  background-color: #ffffff;
  border-radius: 15px;
  padding-block: 1.75rem 1.875rem;
  box-shadow: 0px 3px 10px 0px #0000000d;
  row-gap: 12px;
`;

const Question = styled.p`
  font-size: 1.1875rem;
  text-align: start;
  margin: 0rem;
  grid-column: content;
`;

const Options = styled.div`
  display: flex;
  overflow-x: auto;
  grid-column: content;
  cursor: pointer;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (width > 700px) {
    flex-wrap: wrap;
  }
`;

const AvatarOptions = styled(Options)`
  --avatar-border-width: 2px;
  grid-column: full;
  gap: calc(17px - (var(--avatar-border-width) * 2));
  padding-inline: calc(
    var(--inner-padding-inline) - var(--avatar-border-width)
  );
`;

const Option = styled.div`
  color: ${({ selected }) => (selected ? "#84A4FC" : "#A7A7A7")};
  font-size: 1.1875rem;
  white-space: nowrap;
`;

const Avatar = styled.img`
  border-radius: 50%;
  border: var(--avatar-border-width) solid
    ${({ selected }) => (selected ? "#84a4fc" : "transparent")};
  width: 4.688rem;
  height: 4.688rem;
`;

const Divider = styled.div`
  margin: 0 1rem;
  width: 1px;
  background-color: #eaeaea;
  border-radius: 10px;
  :last-child {
    display: none;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #eaeaea;
  grid-column: content;
  margin-block: 6px;
`;

const ConfirmationButton = styled.button`
  ${buttonCSS}
  font-size: 1.063rem;
  padding: 0.5rem 3rem;
  opacity: ${({ avatarKey }) => (avatarKey ? 1 : 0.6)};
  margin-top: 2.125rem;
  display: block;
  margin-inline: auto;
`;

const Error = styled.p`
  grid-column: content;
  color: #f02a4c;
  font-size: 0.875rem;
  margin: 0rem;
  display: ${({ show }) => (show ? "block" : "none")};
  ::before {
    content: "*";
  }
`;
