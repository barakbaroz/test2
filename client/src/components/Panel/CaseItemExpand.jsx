import PropTypes from "prop-types";
import styled from "styled-components";
import StepProgress from "./StepProgress";
import CaseItemButtons from "./CaseItemButtons";
import UserAnswers from "./UserAnswers";
import AtrialFibrillationDetails from "./AtrialFibrillationDetails";
import { SectionBody, SectionHeader } from "./CaseItemExpand.style";
import HeartFailureDetails from "./HeartFailureDetails";
import CommentBox from "./CommentBox";

export default function CaseItemExpand({ item, show, notInterested }) {
  return (
    <Container show={show}>
      <CaseItemButtons item={item} />

      <Column style={{ display: "block" }}>
        <SectionHeader>פרטי קשר</SectionHeader>
        <SectionBody>{item.User.phoneNumber}</SectionBody>
        <AtrialFibrillationDetails item={item} />
        <HeartFailureDetails item={item} />
      </Column>

      <Column>
        <Wrapper>
          <UserAnswers item={item} notInterested={notInterested} />
        </Wrapper>
        <CommentBox CaseId={item.id} defaultValue={item.Comment?.text} />
      </Column>

      <Column>
        <StepProgress item={item} />
      </Column>
    </Container>
  );
}

CaseItemExpand.propTypes = {
  item: PropTypes.object,
  show: PropTypes.bool,
  notInterested: PropTypes.bool,
};

export const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: 10% 24.5% 29% 29%;
  grid-column-gap: 2.5%;
`;

const Container = styled(ItemGrid)`
  height: ${({ show }) => (show ? "fit-content" : "0px")};
  overflow: hidden;
`;

const Column = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  margin-block: 2rem;
  gap: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
