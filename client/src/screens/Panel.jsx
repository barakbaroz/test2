import { useState } from "react";
import styled from "styled-components";
import SideBar from "../components/Panel/SideBar";
import Cases from "../components/Panel/Cases";
import SearchBar from "../components/Panel/SearchBar";
import panelBackground from "../assets/Backgrounds/panel_background.svg";
import { LanguageProvider } from "../components/Translation";
import useCasesCount from "../hooks/useCasesCount";

const Panel = () => {
  const [search, setSearch] = useState({
    patientStatus: "all",
    myCases: true,
  });
  const { casesCount, fetch: refetchCasesCount } = useCasesCount(search);

  return (
    <LanguageProvider>
      <Container>
        <SearchBar search={search} setSearch={setSearch} />
        <Wrapper>
          <SideBar casesCount={casesCount} />
          <Cases search={search} refetchCasesCount={refetchCasesCount} />
        </Wrapper>
      </Container>
    </LanguageProvider>
  );
};
export default Panel;

const Container = styled.div`
  --header-size: calc(60px + 12px * 2);
  min-height: 100vh;
  min-width: 100vw;
  font-family: "Assistant";
  direction: rtl;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-height: calc(100vh - var(--header-size));
  background-image: url(${panelBackground});
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1;
`;
