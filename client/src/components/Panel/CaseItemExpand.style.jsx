import styled from "styled-components";
export const SectionBody = styled.div``;
export const SectionHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  margin-block: 16px 2px;
  &:has(+ ${SectionBody}:empty) {
    display: none;
  }
`;
