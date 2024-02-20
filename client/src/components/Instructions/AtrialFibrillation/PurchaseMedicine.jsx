import styled from "styled-components";
import nurse from "../../../assets/Characters/Nurse_circle.png";
import { Translator } from "../../Translation";
import PropTypes from "prop-types";

export default function PurchaseMedicine({ HMO }) {
  return (
    <Container>
      <Nurse src={nurse} />
      <Divider />
      <Paragraph>
        <Translator>Purchase-Medicine-{HMO}</Translator>
      </Paragraph>
      <Divider />
    </Container>
  );
}
PurchaseMedicine.propTypes = {
  HMO: PropTypes.string,
};
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
  margin-block: 1.938rem;
  font-size: 1.375rem;
`;
