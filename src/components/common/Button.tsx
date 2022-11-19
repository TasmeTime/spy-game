import styled from "styled-components";
import { Devices } from "../../devices";
import { Colors } from "../../theme";
import ClickBounce from "./ClickBounce";

export default styled.button`
  background-color: ${Colors.Pry40};
  transition: all 0.15s ease, transform 0.1s;
  color: ${Colors.White};
  cursor: pointer;
  font-family: "Inter";
  /* font-size: 1.2rem; */
  font-size: 4.5vw;
  outline: 0.5vw solid ${Colors.Pry40};
  padding: 5px 10px;
  border: none;
  user-select: none;
  border-radius: 7px;
  ${ClickBounce}

  :hover {
    background-color: ${Colors.Pry80};
    color: ${Colors.White};
  }

  @media ${Devices.MobileS} {
    font-size: 8vw;
  }

  @media ${Devices.MobileM} {
    font-size: 7vw;
  }

  @media ${Devices.MobileL} {
    font-size: 6vw;
  }

  @media ${Devices.Tablet} {
    font-size: 4.5vw;
    outline-width: 0.5vw;
  }
`;
