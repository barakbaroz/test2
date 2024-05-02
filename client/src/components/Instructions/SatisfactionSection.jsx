import PropTypes from "prop-types";
import { useRef } from "react";
import styled from "styled-components";

export default function SatisfactionSection({ children, onComplete }) {
  const ref = useRef(null);

  const handelChange = () => {
    if (!onComplete) return;
    const names = new Set();
    [...ref.current].forEach((i) => names.add(i.name));
    const complete = [...names].every((name) => ref.current[name].value);
    if (complete) onComplete();
  };

  return (
    <SatisfactionContainer onChange={handelChange} ref={ref}>
      {children}
    </SatisfactionContainer>
  );
}

SatisfactionSection.propTypes = {
  children: PropTypes.node,
  onComplete: PropTypes.func,
};

const SatisfactionContainer = styled.form`
  margin-block-start: 64px;
  margin-inline: var(--screen-margin);
`;
