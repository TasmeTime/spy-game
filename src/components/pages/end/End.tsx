import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../state/mainStore";
import {
  GameStatus,
  repeatGame,
  setStatus,
} from "../../../state/slices/gameSlice";
import { Colors } from "../../../theme";
import OutlineBtn from "../../common/OutlineBtn";
import Page from "../../common/Page";
import Row, { CRow } from "../../common/Row";

const EndPageEl = styled(Page)``;
const ContentEl = styled(CRow)`
  color: ${Colors.White};
  font-size: 5vw;
  max-width: 80vw;
  overflow-wrap: anywhere;
  text-align: center;
`;
const RepeatBtn = styled(OutlineBtn)``;
const HomeBtn = styled(OutlineBtn)``;
export default function EndPage() {
  const router = useRouter();
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const repeatBtnClicked = () => {
    dispatch(repeatGame());
    router.push("/wordReveal");
  };

  const homeBtnClicked = () => {
    dispatch(setStatus(GameStatus.HOME));
  };

  useEffect(() => {
    switch (game.status) {
      case GameStatus.HOME:
        router.replace("/");
        break;
      case GameStatus.GAME_END:
        router.replace("/end");
        break;
      case GameStatus.REVEAL:
        router.replace("/wordReveal");
        break;
      case GameStatus.START:
        router.replace("/start");
        break;
      case GameStatus.TIMER:
        router.replace("/timer");
        break;
      case GameStatus.TIMER_END:
        router.replace("/end");
        break;
      default:
        break;
    }
  }, [router.pathname, game.status]);

  return (
    <EndPageEl>
      <ContentEl>
        {game.winner}
        {" won the game."}
      </ContentEl>
      <Row ai="center" fd="column" gap="5vh">
        <RepeatBtn onClick={repeatBtnClicked}>Repeat</RepeatBtn>
        <HomeBtn onClick={homeBtnClicked}>Home</HomeBtn>
      </Row>
    </EndPageEl>
  );
}
