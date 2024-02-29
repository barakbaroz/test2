import styled from "styled-components";
import nurse from "../../../assets/Characters/nurse_patient_screen.png";
import { Translator } from "../../Translation";
import { useUser } from "../../../providers/UserProvider";
import { useParams } from "react-router-dom";

export default function PurchaseMedicine() {
  const { Questionnaires, Case } = useUser();
  const { patientSeniority } = Case.AtrialFibrillation;
  const { sending } = useParams();

  if (sending === "second") return <></>;
  if (patientSeniority === "regularly") return <></>;

  const key =
    Questionnaires["clinic-picker"] === "clalit" ? "clalit" : "general";

  return (
    <Container>
      <Nurse src={nurse} />
      <Divider />
      <Paragraph>
        <Translator>Purchase-Medicine-{key}</Translator>
      </Paragraph>
      <Divider />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: var(--screen-margin);
  margin-block-start: 60px;
`;
const Nurse = styled.img`
  width: 192px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #84a4fb;
  opacity: 0.3;
  width: 100%;
`;
const Paragraph = styled.div`
  margin-block: 23px;
  font-size: 1.375rem;
`;
