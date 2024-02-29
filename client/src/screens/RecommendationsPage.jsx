import styled from "styled-components";
import { Carousel } from "@gistmed/gist-ui";
import { Translator } from "../components/Translation";
import icons from "../assets/Recommendation";
import { Link } from "react-router-dom";
import backgrounds from "../assets/Backgrounds/wave_background.svg";
import backIcon from "../assets/Icons/back.svg";
import { postAnalytics } from "../analytics";

export default function RecommendationsPage() {
  const handleBackClick = () => {
    postAnalytics({ type: "back-from-recommendations" });
  };

  const handleBoxView = (element) => {
    postAnalytics({ type: `recommendations-view-${element.key}` });
  };

  return (
    <Container>
      <StyledLink to={-1} onClick={handleBackClick}>
        <img src={backIcon} />
        <BackText>
          <Translator>back</Translator>
        </BackText>
      </StyledLink>
      <Header>
        <Translator>Recommendations-Header</Translator>
      </Header>
      <Carousel dir="rtl" gap="0px" onView={handleBoxView}>
        {cards.map(({ key, icons }) => (
          <BoxWrapper key={key}>
            <Icon src={icons} />
            <Title>
              <Translator>Recommendations-Title-{key}</Translator>
            </Title>
            <Paragraph>
              <Translator>Recommendations-Paragraph-{key}</Translator>
            </Paragraph>
          </BoxWrapper>
        ))}
      </Carousel>
    </Container>
  );
}

const cards = [
  { key: "flight", icons: icons.flight },
  { key: "travel", icons: icons.travel },
  { key: "storage", icons: icons.storage },
  { key: "tablet", icons: icons.tablet },
  { key: "fixed-times", icons: icons.fixedtimes },
  { key: "stock", icons: icons.stock },
  { key: "routine", icons: icons.routine },
];

const Container = styled.div`
  background-image: url(${backgrounds});
  min-height: calc(100dvh - var(--header-size));
  --page-margin-inline: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  gap: 8px;
  margin-inline: var(--page-margin-inline);
  margin-block: 8px;
`;

const BackText = styled.span`
  font-size: 1.188rem;
  font-weight: 500;
  color: #f02a4c;
  text-decoration: none;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-block: 24px;
  margin-inline: var(--page-margin-inline);
`;

const BoxWrapper = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 29px;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0px 6px 20px #0000001f;
`;

const Title = styled.h3`
  font-size: 1.375rem;
  font-weight: 500;
`;

const Paragraph = styled.p`
  font-size: 1.188rem;
`;

const Icon = styled.img`
  height: 70px;
`;
