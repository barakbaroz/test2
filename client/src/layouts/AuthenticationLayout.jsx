import { createContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { LanguageProvider, Translator } from "../components/Translation";
import Header from "../components/User/Header";
import LanguageBar from "../components/User/LanguageBar";
import styled from "styled-components";
import axios from "axios";
import Loader from "../components/Authentication/Loader";
import gist_v from "../assets/Icons/gist_v.svg";

export const AuthenticationContext = createContext({});

function AuthenticationLayout() {
  const rememberMeRef = useRef(null);
  const [statusState, setStatusState] = useState("loading");
  const { userId } = useParams();
  const [buttonEnabled, setButtonEnable] = useState(false);
  const { state } = useLocation();
  const answersRef = useRef(state || {});
  const navigate = useNavigate();

  const reset = () => {
    setButtonEnable(false);
    answersRef.current = {};
  };

  useEffect(() => {
    axios
      .post("/api/user/getAuthStatus", { userId })
      .then((res) => setStatusState(res.data));
  }, [userId]);

  const updateAnswers = ({ questionName, answer, nextRoute }) => {
    answersRef.current[questionName] = answer;
    if (nextRoute) navigate(nextRoute, { state: answersRef.current });
    setButtonEnable(
      ["zehutNumber", "yearOfBirth", "department"].every(
        (questionKey) => questionKey in answersRef.current
      )
    );
  };

  const handleAuthentication = () => {
    setStatusState("loading");
    axios
      .post("/api/user/verify", {
        id: userId,
        rememberMe: rememberMeRef.current.checked,
        ...answersRef.current,
      })
      .then(() => setStatusState("success"))
      .catch((error) => setStatusState(error.response.data.status));
  };

  if (statusState !== "idle")
    return (
      <LanguageProvider>
        <Loader
          state={statusState}
          setStatusState={setStatusState}
          reset={reset}
        />
      </LanguageProvider>
    );

  return (
    <LanguageProvider>
      <AuthenticationContext.Provider value={{ updateAnswers }}>
        <Container>
          <Header />
          <LanguageBar />
          <Title>
            <Translator>Auth-Questions-Title</Translator>
          </Title>

          <Outlet />
          <DownSection>
            <RememberMe show={buttonEnabled}>
              <Label>
                <CheckBox id="remember-me" ref={rememberMeRef} />
                <Translator>Auth-Remember-Me</Translator>
              </Label>
            </RememberMe>

            <SubmitButton
              disabled={!buttonEnabled}
              onClick={handleAuthentication}
            >
              <Translator>Next</Translator>
            </SubmitButton>
          </DownSection>
        </Container>
      </AuthenticationContext.Provider>
    </LanguageProvider>
  );
}

export default AuthenticationLayout;

const Container = styled.div`
  --field-line-height: 2rem;
  --field-padding-block: 0.813rem;
  --field-font-size: 1.5rem;
  --field-font-family: "Poppins";
  --question-padding: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100dvh;
  width: 100vw;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.375rem;
  font-weight: 600;
  margin-block-start: 3rem;
  margin-block-end: 1.6875rem;
  margin-inline: var(--question-padding);
`;

const DownSection = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.063rem;
`;

const RememberMe = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  gap: 10px;
`;

const CheckBox = styled.input.attrs({
  type: "checkbox",
})`
  width: 1.25rem;
  height: 1.25rem;
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  appearance: none;
  /* For iOS < 15 to remove gradient background */
  background-color: #fff;
  /* Not removed via appearance */
  margin: 0;
  border: 1px solid currentColor;
  border-radius: 2px;
  display: grid;
  place-content: center;

  &::before {
    content: url(${gist_v});
    width: 100%;
    height: 100%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
  }
  &:checked::before {
    transform: scale(0.8);
  }
`;

const SubmitButton = styled.button`
  color: white;
  text-decoration: none;
  padding-inline: 4.875rem;
  padding-block: 0.7rem;
  margin-block-end: 40px;
  margin-inline: var(--question-padding);
  border-radius: 3rem;
  border: none;
  background-color: #f02a4c;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 200ms linear;
  &:disabled {
    opacity: 0.3;
  }
`;
