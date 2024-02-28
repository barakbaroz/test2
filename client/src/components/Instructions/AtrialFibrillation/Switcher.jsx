import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { Translator } from "../../Translation";
import { useUser } from "../../../providers/UserProvider";
import { postAnalytics } from "../../../analytics";
import PropTypes from "prop-types";

export default function Switcher({ procedure, setProcedure }) {
  const { Case } = useUser();
  const { sending } = useParams();
  const { instructions } = Case;

  const handleSelect = (procedure) => {
    setProcedure(procedure);
    postAnalytics({
      type: `switch-to-${procedure}`,
    });
  };

  console.log(instructions);
  console.log(sending);

  if (sending === "second") return <></>;
  if (instructions !== "atrial-fibrillation-heart-failure") return <></>;

  return (
    <Wrapper>
      <ProcedureOption
        selected={procedure === "atrial-fibrillation"}
        onClick={() => handleSelect("atrial-fibrillation")}
      >
        <Translator>Video-Atrial-Fibrillation</Translator>
      </ProcedureOption>
      <ProcedureOption
        selected={procedure === "heart-failure"}
        onClick={() => handleSelect("heart-failure")}
      >
        <Translator>Video-Heart-Failure</Translator>
      </ProcedureOption>
    </Wrapper>
  );
}
Switcher.propTypes = {
  procedure: PropTypes.string,
  setProcedure: PropTypes.func,
};

const Wrapper = styled.div`
  margin-block-start: 35px;
  margin-block-end: 27px;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  background: #e3e8f6;
  padding: 0.25rem;
  margin-inline: 15px;
  font-size: 1rem;
`;

const ProcedureOption = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding-inline: 0.8rem;
  padding-block: 0.5rem;
  text-align: center;
  width: 100%;
  cursor: pointer;
  background-color: #e3e8f6;
  color: #7a9dfd;
  ${({ selected }) =>
    selected &&
    css`
      background-color: #84a4fc;
      box-shadow: 0px 2px 6px #00000029;
      color: white;
    `}
`;
