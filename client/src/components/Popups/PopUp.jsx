import { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function PopUp({ children, isPreviewOpen }) {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.style.top = window.scrollY + "px";
    if (isPreviewOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isPreviewOpen]);

  return (
    <PopUpContainer ref={modalRef} isPreviewOpen={isPreviewOpen}>
      <PopUpContentWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </PopUpContentWrapper>
    </PopUpContainer>
  );
}
PopUp.propTypes = {
  children: PropTypes.node,
  isPreviewOpen: PropTypes.bool,
};

export default PopUp;

const PopUpContainer = styled.div`
  display: ${({ isPreviewOpen }) => (isPreviewOpen ? "flex" : "none")};
  z-index: 10; /* Sit on top */
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.6);
`;

const PopUpContentWrapper = styled.div`
  position: relative; /* Stay in place */
  background-color: #fefefe;
  margin: auto; /* centered */
  border: 1px solid #888;
  border-radius: 20px;
`;
