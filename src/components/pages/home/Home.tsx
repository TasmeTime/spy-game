import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../state/mainStore";
import {
  resetGame,
  GameStatus,
  startGame,
  initGame,
} from "../../../state/slices/gameSlice";
import { Colors } from "../../../theme";
import Button from "../../common/Button";
import OutlineBtn from "../../common/OutlineBtn";
import Page from "../../common/Page";
import Row from "../../common/Row";
import { FaRedhat } from "react-icons/fa";
import { SlMustache } from "react-icons/sl";

const HomePageEl = styled(Page)`
  gap: 20vh;
`;

const TitleEl = styled.h1`
  font-size: 15vw;
  position: relative;
  color: ${Colors.Pry20};

  & > svg {
    :first-child {
      position: absolute;
      left: 50%;
      top: 0;
      font-size: 20vw;
      transform: translate(-50%, -55%);
      color: ${Colors.Black100};
    }

    :last-child {
      position: absolute;
      left: 50%;
      bottom: -50%;
      font-size: 20vw;
      transform: translate(-50%, 10%);
      color: ${Colors.Black100};
    }
  }
`;

const StartBtn = styled(OutlineBtn)``;
const SettingBtn = styled(OutlineBtn)``;

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);

  const startBtnClicked = () => {
    dispatch(initGame());
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
    <HomePageEl>
      <TitleEl>
        <FaRedhat />
        SPY
        <SlMustache />
      </TitleEl>
      <Row ai="center" fd="column" gap="4vw">
        <StartBtn onClick={startBtnClicked}>Start</StartBtn>
        {/* <SettingBtn>Settings</SettingBtn> */}
      </Row>
    </HomePageEl>
  );
}
