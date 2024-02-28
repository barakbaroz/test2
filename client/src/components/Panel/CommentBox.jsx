import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

export default function CommentBox({ CaseId, defaultValue = "" }) {
  const [currentComment, setCurrentwComment] = useState(defaultValue);
  const [newComment, setNewComment] = useState(defaultValue);

  const sendComment = () => {
    axios.post("/api/cases/comment", { CaseId, comment: newComment });
    setCurrentwComment(newComment);
  };

  return (
    <>
      <TextArea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="הוספת הערה..."
      />
      <SaveComment
        onClick={sendComment}
        disabled={currentComment === newComment}
      >
        {currentComment ? "עדכון" : "שמירה"}
      </SaveComment>
    </>
  );
}

CommentBox.propTypes = {
  CaseId: PropTypes.string,
  defaultValue: PropTypes.object,
};

const TextArea = styled.textarea`
  overflow: auto;
  border: none;
  font-size: 16px;
  line-height: 21px;
  resize: none;
  outline: none;
  font-family: "Assistant";
  border: 1px #dfdfdf solid;
  border-radius: 15px;
  padding: 15px;
  height: 6rem;
  box-sizing: border-box;
`;

const SaveComment = styled.button`
  background-color: #84a4fc;
  color: #fcfafa;
  padding-inline: 17px;
  padding-block: 7px;
  border-radius: 20px;
  border: none;
  width: fit-content;
  min-width: 78px;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;
