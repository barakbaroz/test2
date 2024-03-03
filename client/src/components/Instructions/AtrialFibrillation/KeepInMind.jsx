import styled from "styled-components";
import bleedingIcon from "../../../assets/Icons/Bleeding.svg";
import medicineIcon from "../../../assets/Icons/medicine.svg";
import doctorIcon from "../../../assets/Icons/doctor.svg";
import arrowSide from "../../../assets/Icons/arrow_side.svg";
import { Translator } from "../../Translation";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider";
import { postAnalytics } from "../../../analytics";

export default function KeepInMind() {
  const { sending } = useParams();
  const { Case } = useUser();
  const { patientSeniority } = Case.AtrialFibrillation;

  if (sending === "first" && patientSeniority !== "regularly") return <></>;

  return (
    <InstructionsContainer>
      <InstructionsTitle>
        <Translator>Video-Important-Implement</Translator>
      </InstructionsTitle>
      {ImportantInstructions.map(({ icon, paragraph, title, Extra }, index) => (
        <Fragment key={index}>
          <InstructionsWrapper>
            <Image src={icon} alt={icon} />
            <div>
              <Title>
                <Translator>{title}</Translator>
              </Title>
              <InstructionText>
                <Translator>{paragraph}</Translator>
              </InstructionText>
              {Extra && <Extra />}
            </div>
          </InstructionsWrapper>
          <Divider />
        </Fragment>
      ))}
    </InstructionsContainer>
  );
}

function RecommendationsButton() {
  const handleClick = () => {
    postAnalytics({ type: "recommendations-click" });
  };

  return (
    <Recommend to="../recommendations" onClick={handleClick}>
      <img src={arrowSide} />
      <Text>
        <Translator>Video-Persistence-Recommend</Translator>
      </Text>
    </Recommend>
  );
}

const ImportantInstructions = [
  {
    icon: medicineIcon,
    title: "Video-Persistence-Title",
    paragraph: "Video-Persistences-Paragraph",
    button: {
      icon: arrowSide,
      text: "Video-Persistence-Recommend",
    },
    Extra: RecommendationsButton,
  },
  {
    icon: doctorIcon,
    title: "Video-Doctor-Follow-Up-Title",
    paragraph: "Video-Doctor-Follow-Up-Paragraph",
  },
  {
    icon: bleedingIcon,
    paragraph: "Video-Bleeding-Paragraph",
    title: "Video-Bleeding-Title",
  },
];

const InstructionsContainer = styled.div`
  margin-block: 54px 50px;
  margin-inline: var(--screen-margin);
`;

const Divider = styled.div`
  height: 1px;
  background-color: #84a4fb;
  margin-block: 35px;
  opacity: 0.3;
  &:last-of-type {
    display: none;
  }
`;

const InstructionsTitle = styled.p`
  text-align: start;
  font-size: 1.5rem;
  font-weight: 700;
  margin-block-end: 36px;
`;

const InstructionsWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;
`;

const InstructionText = styled.p`
  text-align: start;
  font-size: 1.188rem;
  font-weight: 400;
  margin-block: 0px;
`;

const Image = styled.img`
  height: 64px;
  width: 64px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.375rem;
  margin-block-end: 0.5rem;
`;

const Recommend = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  margin-block-start: 0.5rem;
  text-decoration: none;
`;

const Text = styled.p`
  font-size: 1.188rem;
  font-weight: 500;
  color: #ef2a4c;
`;
