import Lottie from "lottie-react";
import success from "../../assets/Lotties/success.json";
import failed from "../../assets/Lotties/failed.json";
import loading from "../../assets/Lotties/loading.json";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "../User/Header";
import { Translator } from "../Translation";
import { useParams } from "react-router-dom";

const lottiesMapper = {
  loading: { animationData: loading, loop: true },
  success: { animationData: success, loop: false },
  failed: { animationData: failed, loop: false },
  blocked: { animationData: failed, loop: false },
};

export default function Loader({ state }) {
  const { userId, sending } = useParams();
  const navigationRoutes = {
    success: `/api/user/lastStep/${userId}/${sending}`,
    failed: `/auth/${userId}/${sending}/zehut`,
  };
  const handleComplete = () => {
    const nextRoute = navigationRoutes[state];
    if (!nextRoute) return;
    setTimeout(() => {
      window.location.pathname = nextRoute;
    }, 2000);
  };

  return (
    <LoaderContainer>
      <Header />
      <StatusContainer>
        <StatusIndicator
          {...lottiesMapper[state]}
          onComplete={handleComplete}
        />
        <Content>
          <Title>
            <Translator>{`Auth-${state}-Title`}</Translator>
          </Title>

          <Subtitle>
            <Translator>{`Auth-${state}-Subtitle`}</Translator>
          </Subtitle>
        </Content>
      </StatusContainer>
      <span></span>
    </LoaderContainer>
  );
}

Loader.propTypes = {
  state: PropTypes.oneOf(Object.keys(lottiesMapper)),
  setStatusState: PropTypes.func,
  reset: PropTypes.func,
  sendingType: PropTypes.string,
};

const LoaderContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-inline: 15px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1.375rem;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const StatusIndicator = styled(Lottie)`
  width: 120px;
  max-width: 100%;
  margin-block-end: 30px;
`;
