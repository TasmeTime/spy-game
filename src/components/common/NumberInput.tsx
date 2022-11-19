import { ChangeEventHandler } from "react";
import styled from "styled-components";
import { Devices } from "../../devices";
import { Colors } from "../../theme";
import Row from "./Row";

const NumberInputContainerEl = styled(Row)`
  align-items: center;
  position: relative;
  border: 2vw solid ${Colors.Pry20};
  padding: 2vw 5vw;
  border-radius: 100vw;
  width: 80%;

  @media ${Devices.MobileS} {
    border-width: 1vw;
  }

  @media ${Devices.MobileM} {
  }

  @media ${Devices.MobileL} {
  }

  @media ${Devices.Tablet} {
    padding: 2vw 2.7vw;
  }

  @media ${Devices.LaptopL} {
    font-size: 2vw;
    border-radius: 1vw;
    padding: 2vw 2vw;
  }
`;

const InputTitleEl = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 1vw;
  transform: translate(-20%, -60%);
  background-color: ${Colors.Black20};
  color: ${Colors.White};
  font-size: 5vw;

  @media ${Devices.MobileS} {
    font-size: 5vw;
  }

  @media ${Devices.MobileM} {
    font-size: 5vw;
  }

  @media ${Devices.MobileL} {
    font-size: 3vw;
  }

  @media ${Devices.Tablet} {
    font-size: 2vw;
  }

  @media ${Devices.LaptopL} {
    font-size: 2vw;
  }
`;

const InputEl = styled.input`
  all: unset;
  font-size: 10vw;
  font-weight: bold;
  text-align: right;
  color: ${Colors.White};
  width: 100%;
  padding: 0 1vw;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :-moz-appearance: textfield;

  @media ${Devices.MobileS} {
    font-size: 10vw;
  }

  @media ${Devices.MobileM} {
    font-size: 10vw;
  }

  @media ${Devices.MobileL} {
    font-size: 5vw;
  }

  @media ${Devices.Tablet} {
    font-size: 4vw;
  }

  @media ${Devices.LaptopL} {
    font-size: 2vw;
  }
`;

export interface INumberInput {
  title?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function NumberInput({
  title,
  defaultValue,
  value,
  onChange,
}: INumberInput) {
  return (
    <NumberInputContainerEl>
      {title ? <InputTitleEl>{title}</InputTitleEl> : ""}
      <InputEl
        type="number"
        step="1"
        min={0}
        max={50}
        title={title}
        defaultValue={defaultValue || 5}
        value={value}
        onChange={onChange}
      />
    </NumberInputContainerEl>
  );
}
