import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../assets/Backgrounds/login.jpg";
import gistLogo from "../assets/Logos/gist_logo_mask.svg";
import hospitalLogo from "../assets/Logos/hospital_logo_mask.png";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData.entries());
    axios
      .post("/api/stuffMembers/login", body)
      .then(() => navigate("/panel"))
      .catch((error) => {
        if (error.response.status === 403)
          alert("שם המשתמש או הסיסמה שהקלדת שגויים");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <GistLogo />
      <HopitalLogo />
      <Form onSubmit={handleSubmit}>
        <Titles>
          <Title>ברוכים הבאים</Title>
          <SubTitle>
            למערכת ליווי והדרכת מטופלים עם <br />
            אי ספיקת לב ופרפור פרוזדורים
          </SubTitle>
        </Titles>
        <Input name="email" type="text" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Submit disabled={loading} type="submit">
          כניסה
        </Submit>
      </Form>
    </Container>
  );
};
export default Login;

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  direction: rtl;
  font-family: "Abraham";
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: fit-content;
  align-items: center;
  direction: ltr;
  padding: 95px;
  border-radius: 70px;
  opacity: 1;
  backdrop-filter: blur(30px);
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateX(60%);
`;

const Submit = styled.button`
  border-radius: 3rem;
  border: none;
  background-color: #f02a4c;
  padding: 0.7rem;
  width: 60%;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 200ms linear;
  &:hover {
    box-shadow: 3px 3px 6px rgba(122, 122, 122, 0.5);
  }
  &:disabled {
    opacity: 0.3;
    cursor: progress;
  }
`;

const Titles = styled.div`
  text-align: center;
`;

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  border-radius: 2rem;
  padding-block: 1rem;
  padding-inline: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  width: 16rem;
  text-align: start;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const GistLogo = styled.img.attrs({ src: gistLogo })`
  position: absolute;
  top: 40px;
  left: 40px;
`;

const HopitalLogo = styled.img.attrs({ src: hospitalLogo })`
  position: absolute;
  height: 116px;
  top: 40px;
  right: 40px;
`;
