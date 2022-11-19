import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../theme";
import OutlineBtn from "../../common/OutlineBtn";
import Row from "../../common/Row";
import { FiEye, FiChevronRight, FiCheck } from "react-icons/fi";
import { RootState } from "../../../state/mainStore";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  GameStatus,
  setRevealUserIndex,
  setStatus,
  startGame,
} from "../../../state/slices/gameSlice";
import { Devices } from "../../../devices";

const WRDotsEl = styled(Row)`
  width: 100%;
  height: 20%;
  align-items: center;
  padding-bottom: 5vh;
  justify-content: center;
  gap: 3.5vw;
`;

const DotContainerEl = styled(Row)`
  align-items: center;
  max-width: 90vw;
  gap: 1.5vw;
`;

const DotEl = styled.div<{ active?: boolean }>`
  width: 5vw;
  height: 5vw;
  min-width: 5vw;
  min-height: 5vw;
  position: relative;
  /* cursor: ${(p) => (p.active ? "default" : "pointer")}; */
  @media ${Devices.Tablet} {
    width: 4vw;
    height: 4vw;
    min-width: 4vw;
    min-height: 4vw;
  }

  ::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transition: all 0.3s ease;
    transform: translate(-50%, -50%) scale(${(p) => (p.active ? "1" : "0")});
    height: 100%;
    background-color: transparent;
    border: 0.3vw solid ${(p) => (p.active ? Colors.White : Colors.Pry20)};
    border-radius: 50%;
  }

  ::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: ${(p) => (p.active ? " 50%" : "70%")};
    height: ${(p) => (p.active ? " 50%" : "70%")};
    transform: translate(-50%, -50%);
    background-color: ${(p) => (p.active ? Colors.White : Colors.Pry20)};

    border-radius: 50%;
  }
`;

const ActionBtn = styled(OutlineBtn)`
  border-radius: 50%;
  padding: 0;
  width: 10vw;
  height: 10vw;
  min-width: 10vw;
  min-height: 10vw;
  font-size: 5vw;
  outline-width: 0.9vw;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Devices.MobileS} {
  }

  @media ${Devices.MobileM} {
  }

  @media ${Devices.MobileL} {
  }

  @media ${Devices.Tablet} {
    width: 5vw;
    height: 5vw;
    min-width: 5vw;
    min-height: 5vw;
    font-size: 2.5vw;
  }
`;

export default function WRDots({
  currState,
  setCurrState,
}: {
  currState: "SHOW" | "NEXT" | "LAST";
  setCurrState: Dispatch<SetStateAction<"SHOW" | "NEXT" | "LAST">>;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.game);
  let players: number[] = [];
  for (let i = 0; i < game.playerCount; i++) {
    players.push(i);
  }

  const showClicked = () => {
    if (game.revealUserIndex === game.playerCount - 1) setCurrState("LAST");
    else setCurrState("NEXT");
  };

  const nextClicked = () => {
    if (game.revealUserIndex === game.playerCount - 1) {
      dispatch(setRevealUserIndex(game.playerCount - 1));
      setCurrState("LAST");
    } else {
      dispatch(setRevealUserIndex(game.revealUserIndex + 1));
      setCurrState("SHOW");
    }
  };

  const startClicked = () => {
    if (game.revealUserIndex === game.playerCount - 1) {
      dispatch(setStatus(GameStatus.TIMER));
      router.push("/timer");
    }
  };

  return (
    <WRDotsEl>
      <DotContainerEl>
        {players.map((p, i) => {
          return <DotEl active={game.revealUserIndex === i} key={i} />;
        })}
      </DotContainerEl>
      <ActionBtn>
        {currState === "SHOW" ? (
          <ActionBtn onClick={showClicked}>
            <FiEye />
          </ActionBtn>
        ) : currState === "NEXT" ? (
          <ActionBtn onClick={nextClicked}>
            <FiChevronRight />
          </ActionBtn>
        ) : (
          <ActionBtn onClick={startClicked}>
            <FiCheck />
          </ActionBtn>
        )}
      </ActionBtn>
    </WRDotsEl>
  );
}
