import styled from "styled-components";
import bleedingIcon from "../../../assets/Icons/Bleeding.svg";
import medicineIcon from "../../../assets/Icons/medicine.svg";
import doctorIcon from "../../../assets/Icons/doctor.svg";
import arrowSide from "../../../assets/Icons/arrow_side.svg";
import { Translator } from "../../Translation";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function KeepInMind({ show }) {
  if (!show) return <></>;
  return (
    <InstructionsContainer>
      <InstructionsTitle>
        <Translator>Video-Important-Implement</Translator>
      </InstructionsTitle>
      {ImportantInstructions.map(({ icon, paragraph, title, Extra }, index) => (
        <Fragment key={index}>
          <InstructionsWrapper>
            <Image src={icon} alt={icon} />
            <TextSection>
              <Title>
                <Translator>{title}</Translator>
              </Title>
              <InstructionText>
                <Translator>{paragraph}</Translator>
              </InstructionText>
              {Extra && <Extra />}
            </TextSection>
          </InstructionsWrapper>
          <Divider show={index !== ImportantInstructions.length - 1} />
        </Fragment>
      ))}
    </InstructionsContainer>
  );
}

KeepInMind.propTypes = {
  show: PropTypes.bool,
};

const ImportantInstructions = [
  {
    icon: medicineIcon,
    title: "Video-Persistence-Title",
    paragraph: "Video-Persistences-Paragraph",
    button: {
      icon: arrowSide,
      text: "Video-Persistence-Recommend",
    },
    Extra: () => (
      <Recommend>
        <img src={arrowSide} />
        <Text>
          <Translator>Video-Persistence-Recommend</Translator>
        </Text>
      </Recommend>
    ),
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
  margin-block-start: 44px;
  margin-inline: var(--screen-margin);
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ show }) => (show ? "#84a4fb" : "none")};
  margin-block: ${({ show }) => (show ? "35px" : "25px")};
  opacity: 0.3;
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
  height: 79px;
  width: 80px;
`;

const TextSection = styled.div``;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.375rem;
  margin-block-end: 0.5rem;
`;

const Recommend = styled(Link)`
  display: ${({ show }) => (show ? "flex" : "none")};
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
