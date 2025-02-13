import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import styled from "styled-components";
import CircularProgress from "./CircularProgress";
import CaseItemExpand, { ItemGrid } from "./CaseItemExpand";
import DeletePopup from "./DeletePopup";
import Trash from "../../assets/Icons/trash.svg";
import Avatars from "../../assets/Avatars";
import PopUp from "../Popups/PopUp";

const dateOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const notInterestedQuestion = ({ questionKey, answerKey }) =>
  questionKey === "why-not-purchased" && answerKey === "not-interested";

export default function CaseItem({ item, deleteCase }) {
  const [expand, setExpand] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const notInterested = useMemo(() => {
    if (!item.User.Questionnaires.length) return false;
    const question = item.User.Questionnaires.find(notInterestedQuestion);
    return Boolean(question);
  }, [item.User.Questionnaires]);

  const handleExpand = () => setExpand((prev) => !prev);

  return (
    <Case>
      <PopUp isPreviewOpen={showDeletePopUp} setIsOpen={setShowDeletePopUp}>
        <DeletePopup
          deleteCase={() => deleteCase(item.id)}
          close={() => setShowDeletePopUp(false)}
        />
      </PopUp>
      <Container onClick={handleExpand}>
        <Avatar>
          <span />
          <div style={{ position: "relative" }}>
            <Mark show={notInterested} />
            <AvatarImage
              alt="avatar"
              src={
                Avatars[
                  `${item.Avatar?.gender}_${item.Avatar?.age}_${item.Avatar?.ethnicity}`
                ] || Avatars.blank
              }
            />
          </div>
          <Line />
        </Avatar>
        <Unit>
          <Heading>ת.ז {item.zehutNumber}</Heading>
          <SubHeadin>{getLengAndAge(item)}</SubHeadin>
        </Unit>
        <Unit>
          <Heading>{getHeading(item)}</Heading>
          <SubHeadin>
            {new Date(item.createdAt).toLocaleString("he-IL", dateOptions)}
          </SubHeadin>
        </Unit>
        <EndPart>
          <Progress>
            <ProgressText>{getMaxProgress(item)}</ProgressText>
            <CircularProgress
              maxValue={3}
              progress={
                Object.values(item.CasesProgress).filter((progress) => progress)
                  .length
              }
            />
          </Progress>
          <TrashContainer onClick={() => setShowDeletePopUp(true)}>
            <img alt="trash" src={Trash} />
          </TrashContainer>
        </EndPart>
      </Container>
      <CaseItemExpand item={item} show={expand} notInterested={notInterested} />
    </Case>
  );
}

CaseItem.propTypes = {
  item: PropTypes.object,
  deleteCase: PropTypes.func,
};

const getMaxProgress = (item) => {
  if (
    item.CasesProgress.watchedVideoAtrialFibrillation ||
    item.CasesProgress.watchedVideoHeartFailure
  )
    return "סרטון נצפה";
  if (item.CasesProgress.avatarSelection) return "שאלון נענה";
  if (item.CasesProgress.openSms) return "סמס נפתח";
  return "";
};

const getHeading = (item) =>
  Object.entries(item)
    .filter(([, value]) => value)
    .filter(([key]) => ["HeartFailure", "AtrialFibrillation"].includes(key))
    .map(([key]) => procedures[key])
    .join(" + ");

const genders = {
  male: "בן",
  female: "בת",
  other: "אחר",
};

const languages = {
  sp: "ספרדית",
  ar: "ערבית",
  en: "אנגלית",
  ru: "רוסית",
  he: "עברית",
};

const procedures = {
  HeartFailure: "אי ספיקת לב",
  AtrialFibrillation: "פרפור פרוזדורים",
};

const getLengAndAge = ({ gender, age, User }) => {
  return [
    gender && age ? `${genders[gender]} ${age}` : "גיל",
    languages[User.language],
  ].join(", ");
};

const Case = styled.div`
  margin: 30px auto;
  width: 80%;
  border-radius: 15px;
  background: white;
`;

const Container = styled(ItemGrid)`
  cursor: pointer;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 3px 15px #00000029;
  --padding-block: 7px;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 75px;
  height: 75px;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: var(--padding-block);
`;

const Line = styled.div`
  width: 1px;
  background-color: #e5e5e5;
  height: 100%;
`;

const Unit = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  align-items: start;
  justify-content: center;
  margin-block: var(--padding-block);
`;

const Heading = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 28px;
  color: #444444;
`;

const SubHeadin = styled.div`
  font-size: 1rem;
  line-height: 23px;
  color: #444444;
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  background: #f8f8f8;
  height: 100%;
  column-gap: 5%;
  width: 90%;
  justify-content: flex-end;
`;

const TrashContainer = styled.div`
  background-color: #b2b8c9;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const ProgressText = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #84a4fc;
  text-align: end;
  width: max-content;
  padding: 0 0.5rem;
`;

const EndPart = styled.div`
  display: flex;
`;

const Mark = styled.div`
  background-color: #f02a4c;
  position: absolute;
  color: white;
  border-radius: 50%;
  width: 1.313rem;
  height: 1.313rem;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  &::after {
    content: "!";
  }
`;
