import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Comments = ({ item }) => {
  const [existsComment, setExistsComment] = useState(item.Comment?.message);
  const [comment, setComment] = useState(item.Comment?.message);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setComment(value);
    setSaved(false);
  };
  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "/api/cases/CommentCase",
      data: { CaseId: item.id, message: comment },
    });
    setSaved(true);
    setExistsComment(true);
  };

  return (
    <Container>
      <TextArea
        defaultValue={item.Comment?.message}
        placeholder="הוספת הערה..."
        disabled={false}
        value={comment}
        onChange={handleChange}
      />
      <SaveButton
        disabled={item.Comment?.message === comment || !comment || saved}
        onClick={handleSubmit}
      >
        {existsComment ? "עדכון" : "שמירה"}
      </SaveButton>
    </Container>
  );
};
Comments.propTypes = {
  item: PropTypes.object,
};

export default Comments;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;
const TextArea = styled.textarea`
  overflow: auto;
  border: none;
  font-size: 16px;
  line-height: 21px;
  color: #444444;
  resize: none;
  outline: none;
  font-family: "Assistant";
  border: 1px #dfdfdf solid;
  border-radius: 15px;
  padding: 15px;
  height: 6rem;
  cursor: pointer;
  box-sizing: border-box;
`;
const SaveButton = styled.button`
  margin-top: 2px;
  color: white;
  font-size: 14px;
  font-family: "Assistant";
  padding: 6px 21px;
  align-self: end;
  border-radius: 15px;
  background-color: #84a4fc;
  border: none;
  margin-top: 2px;
  cursor: pointer;
  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;
