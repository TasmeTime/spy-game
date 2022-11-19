import styled from "styled-components";
import { HiChevronLeft } from "react-icons/hi";
import { Colors } from "../../theme";
import { CRow } from "./Row";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { GameStatus, setStatus } from "../../state/slices/gameSlice";
import { Devices } from "../../devices";

const BackBtnEl = styled(CRow)`
  border: none;
  background-color: transparent;
  outline: 1.5vw solid ${Colors.Pry20};
  border-radius: 2vw;
  color: ${Colors.Pry20};
  width: 10vw;
  height: 10vw;
  font-size: 10vw;
  cursor: pointer;

  & > svg {
    transition: all 0.2s ease;
  }
  :hover {
    & > svg {
      transform: translateX(-7%);
    }
  }

  @media ${Devices.MobileS} {
    width: 8vw;
    height: 8vw;
  }

  @media ${Devices.MobileM} {
    width: 10vw;
    height: 10vw;
  }

  @media ${Devices.MobileL} {
    width: 6vw;
    font-size: 7vw;
    height: 6vw;
    border-radius: 1vw;
  }

  @media ${Devices.Tablet} {
    font-size: 4vw;
    width: 4vw;
    height: 4vw;
    border-radius: 1vw;
  }
`;

export default function BackBtn({ status }: { status: GameStatus }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const backBtnClicked = () => {
    dispatch(setStatus(status));
    // router.back();
  };
  return (
    <BackBtnEl as="button" onClick={backBtnClicked}>
      <HiChevronLeft />
    </BackBtnEl>
  );
}
