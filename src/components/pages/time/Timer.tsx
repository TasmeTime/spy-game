import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../state/mainStore";
import {
  GameStatus,
  spiesRevealed,
  timerEnded,
} from "../../../state/slices/gameSlice";
import { Colors } from "../../../theme";
import { msToMin, msToTime } from "../../../utils";
import OutlineBtn from "../../common/OutlineBtn";
import Page from "../../common/Page";
import Row from "../../common/Row";

const TimerPageEl = styled(Page)``;
const TimerEl = styled.h2`
  font-size: 15vw;
  color: ${Colors.White};
`;

const EndGameBtn = styled(OutlineBtn)``;

export default function TimerPage() {
  const router = useRouter();
  const game = useSelector((state: RootState) => state.game);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currTimer, setCurrTimer] = useState<number>(0);
  const dispatch = useDispatch();

  const endBtnClicked = () => {
    dispatch(spiesRevealed());
    // router.push("/end");
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

    if (!intervalRef.current && router.pathname === "/timer")
      intervalRef.current = setInterval(() => {
        if (currTimer < game.time) {
          setCurrTimer((t) => {
            return t + 1000;
          });
        } else {
          dispatch(timerEnded());
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [router.pathname, game.status, currTimer]);

  return (
    <TimerPageEl>
      <TimerEl> {msToTime(currTimer)}</TimerEl>
      <EndGameBtn onClick={endBtnClicked}>Spies revealed!</EndGameBtn>
    </TimerPageEl>
  );
}
