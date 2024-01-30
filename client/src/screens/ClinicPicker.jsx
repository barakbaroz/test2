import styled from "styled-components";
import { Link } from "react-router-dom";
import { Translator } from "../components/Translation";
import background from "../assets/Backgrounds/wave_background.svg";
import nurse from "../assets/Characters/Nurse_Clinic_Picker.png";
// import { postAnalytics } from "../analytics";

const clinics = {
  clalit: "כללית",
  meuhedet: "מאוחדת",
  maccabi: "מכבי",
  leumit: "לאומית",
};

export default function ClinicPicker() {
  const handleClinicClick = () => {
    // postAnalytics({ type: "opened-tos" });
  };
  return (
    <Wrapper>
      <Nurse id="NurseImg" src={nurse} alt="nurse_img" />
      <Title>
        <Translator>Clicins-Picker-Title</Translator>
      </Title>
      {Object.entries(clinics).map(([key, value]) => (
        <ClinicButton
          key={key}
          id={key}
          to={"../Video"}
          onClick={handleClinicClick}
        >
          <Translator>{value}</Translator>
        </ClinicButton>
      ))}
    </Wrapper>
  );
}

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

const ClinicButton = styled(Link)`
  text-decoration: none;
  background-color: #ffffff;
  border-radius: 3rem;
  border: none;
  color: #0f0f0f;
  font-size: 1.063rem;
  font-family: inherit;
  text-align: center;
  padding-block: 0.75rem;
  &:active {
    background-color: #7a9dfd;
    color: #ffffff;
  }
`;

const Nurse = styled.img`
  width: 8.063rem;
  max-width: 100%;
  align-self: center;
`;
