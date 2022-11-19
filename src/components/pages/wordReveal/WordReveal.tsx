import styled from "styled-components";
import { Colors } from "../../../theme";
import Page from "../../common/Page";
import { CRow } from "../../common/Row";
import WRDots from "./WRDots";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/mainStore";
import { useEffect } from "react";
import { GameStatus } from "../../../state/slices/gameSlice";
import { useRouter } from "next/router";

const WordRevealPageEl = styled(Page)`
  justify-content: space-between;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;

const ContentEl = styled(CRow)`
  width: 100%;
  height: 80%;
  color: ${Colors.White};
  font-size: 5vw;
  max-width: 80vw;
  overflow-wrap: anywhere;
  text-align: center;
`;

export default function WordRevealPage() {
  const [currState, setCurrState] = useState<"SHOW" | "NEXT" | "LAST">("SHOW");
  const game = useSelector((state: RootState) => state.game);
  const router = useRouter();

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
    <WordRevealPageEl>
      <ContentEl>
        {currState === "SHOW"
          ? "CLICK SHOW"
          : game.players[game.revealUserIndex].isSpy
          ? "YOU ARE SPY"
          : game.word}
      </ContentEl>
      <WRDots currState={currState} setCurrState={setCurrState} />
    </WordRevealPageEl>
  );
}
