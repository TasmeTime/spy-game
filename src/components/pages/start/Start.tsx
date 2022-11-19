import { useRouter } from "next/router";
import styled from "styled-components";
import { Colors } from "../../../theme";
import BackBtn from "../../common/BackBtn";
import Button from "../../common/Button";
import NumberInput from "../../common/NumberInput";
import OutlineBtn from "../../common/OutlineBtn";
import Page from "../../common/Page";
import Row, { RowCss } from "../../common/Row";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/mainStore";
import { useEffect } from "react";
import {
  GameStatus,
  setPlayerCount,
  setSpyCount,
  setTime,
  startGame,
} from "../../../state/slices/gameSlice";
import { ChangeEvent, ChangeEventHandler } from "react";
import { MAX_TIMER, MIN_TIMER } from "../../../statics";
import { minToMs, msToMin } from "../../../utils";

const StartEl = styled(Page)`
  gap: 5vh;
`;

const StartBtn = styled(OutlineBtn)`
  ${RowCss};
`;

export default function Start() {
  const router = useRouter();
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);

  const startBtnClicked = () => {
    dispatch(startGame());
  };

  const inputChanged = (
    input: "PLAYERS" | "SPIES" | "TIME",
    payload: ChangeEvent<HTMLInputElement>
  ) => {
    if (payload) {
      switch (input) {
        case "PLAYERS":
          var value: number =
            parseInt(payload.target.value) >= 0
              ? parseInt(payload.target.value)
              : 3;
          dispatch(setPlayerCount(value));
          break;
        case "SPIES":
          var value: number =
            parseInt(payload.target.value) >= 0
              ? parseInt(payload.target.value)
              : 1;

          if (value + 2 <= game.playerCount) dispatch(setSpyCount(value));
          break;
        case "TIME":
          var value: number =
            !isNaN(parseInt(payload.target.value)) &&
            parseInt(payload.target.value) >= MAX_TIMER &&
            parseInt(payload.target.value) <= MIN_TIMER
              ? parseInt(payload.target.value)
              : MIN_TIMER;

          dispatch(setTime(minToMs(value)));
          break;
        default:
          break;
      }
    }
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
    <StartEl>
      <Row ai="center" width="100%" jc="center">
        <BackBtn status={GameStatus.HOME} />
      </Row>
      <Row fd="column" ai="center" gap="5vh" width="100%">
        <NumberInput
          onChange={(e) => {
            inputChanged("PLAYERS", e);
          }}
          value={game.playerCount.toString()}
          title="Player Count"
        />
        <NumberInput
          onChange={(e) => {
            inputChanged("SPIES", e);
          }}
          value={game.spyCount.toString()}
          title="Spy Count"
        />
        <NumberInput
          onChange={(e) => {
            inputChanged("TIME", e);
          }}
          value={msToMin(game.time).toString()}
          title="Time (Minute)"
        />
      </Row>
      <StartBtn onClick={startBtnClicked}>Start</StartBtn>
    </StartEl>
  );
}
