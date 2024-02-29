import styled from "styled-components";
import { Carousel } from "@gistmed/gist-ui";
import { Translator } from "../components/Translation";
import icons from "../assets/Recommendation";
import { Link } from "react-router-dom";
import backgrounds from "../assets/Backgrounds/wave_background.svg";

export default function RecommendationsPage() {
  return (
    <Container>
      <Top>
        <Link></Link>
        <Header>7 המלצות שימושיות שיעזרו לך להתמיד בטיפול התרופתי</Header>
      </Top>
      <Carousel dir="rtl">
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
`;

const Top = styled.div`
  padding: 30px;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
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
