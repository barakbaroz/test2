import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const GuidanceSwitcher = ({ search, setSearch }) => {
  const changeGuidance = (value) => () => {
    setSearch((prev) => ({ ...prev, myCases: value }));
  };
  return (
    <Wrapper>
      <GuidanceOption
        selected={!search.myCases}
        onClick={changeGuidance(false)}
      >
        כל ההדרכות
      </GuidanceOption>
      <GuidanceOption selected={search.myCases} onClick={changeGuidance(true)}>
        הדרכות שלי
      </GuidanceOption>
    </Wrapper>
  );
};

GuidanceSwitcher.propTypes = {
  search: PropTypes.shape({
    myCases: PropTypes.bool,
  }),
  setSearch: PropTypes.func,
};

export default GuidanceSwitcher;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.938rem;
  border-radius: 2rem;
  background: #f4f4f4;
  padding: 0.4rem 0.4rem;
  height: var(--field-height);
  padding-block: var(--field-padding-block);
  white-space: nowrap;
`;

const GuidanceOption = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding-inline: 22px;
  height: 2rem;
  width: fit-content;
  cursor: pointer;
  background-color: #f4f4f4;
  font-weight: 600;
  ${({ selected }) =>
    selected &&
    css`
      background-color: #84a4fc;
      box-shadow: 0px 2px 6px #00000029;
      color: white;
      font-weight: 700;
    `}
`;
