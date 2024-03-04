import styled from "styled-components";
import { Translator } from "../../../components/Translation";
import { useUser } from "../../../providers/UserProvider";
import { useParams } from "react-router-dom";

export default function Title() {
  const { Case, Questionnaires } = useUser();
  const { sending } = useParams();

  const getTitleKey = () => {
    if (sending === "first") return Case.instructions;
    const [key, value] = Object.entries(Questionnaires).find(([questionKey]) =>
      ["taking-medication", "why-not-purchased"].includes(questionKey)
    );
    return `${key}:${value}`;
  };

  const titleKey = getTitleKey();

  return (
    <>
      <SubTitle show={sending === "second"}>
        <Translator>Video-Page-Sub-Title-{titleKey}</Translator>
      </SubTitle>
      <MainTitle id="video-title">
        <Translator>Video-Page-Title-{titleKey}</Translator>
      </MainTitle>
    </>
  );
}

const MainTitle = styled.h1`
  font-weight: 500;
  font-size: 1.5rem;
  margin-inline: var(--screen-margin);
`;

const SubTitle = styled.p`
  display: ${({ show }) => (show ? "block" : "none")};
  margin-inline: var(--screen-margin);
  font-size: 1.25rem;
`;
