import styled, { css } from "styled-components";

export interface RowProps {
  width?: string;
  height?: string;
  gap?: string;
  mr?: string;
  fd?: string;
  ai?: string;
  jc?: string;
  mt?: string;
  br?: string;
  overflow?: string;
  mb?: string;
  ml?: string;
  pos?: string;
  zi?: number | string;
  padding?: string;
}

export const RowCss = css<RowProps>`
  display: flex;
  height: ${(p) => (p.height ? p.height : "")};
  width: ${(p) => (p.width ? p.width : "")};
  padding: ${(p) => (p.padding ? p.padding : "")};
  flex-direction: ${(p) => (p.fd ? p.fd : "row")};
  gap: ${(p) => (p.gap ? p.gap : "")};
  align-items: ${(p) => (p.ai ? p.ai : "")};
  justify-content: ${(p) => (p.jc ? p.jc : "")};
  margin-right: ${(p) => (p.mr ? p.mr : "")};
  margin-left: ${(p) => (p.ml ? p.ml : "")};
  margin-bottom: ${(p) => (p.mb ? p.mb : "")};
  margin-top: ${(p) => (p.mt ? p.mt : "")};
`;

const Row = styled.div<RowProps>`
  display: flex;
  position: ${(p) => (p.pos ? p.pos : "")};
  z-index: ${(p) => (p.zi ? p.zi : "")};
  height: ${(p) => (p.height ? p.height : "")};
  width: ${(p) => (p.width ? p.width : "")};
  padding: ${(p) => (p.padding ? p.padding : "")};
  flex-direction: ${(p) => (p.fd ? p.fd : "row")};
  gap: ${(p) => (p.gap ? p.gap : "")};
  align-items: ${(p) => (p.ai ? p.ai : "")};
  justify-content: ${(p) => (p.jc ? p.jc : "")};
  margin-right: ${(p) => (p.mr ? p.mr : "")};
  border-radius: ${(p) => (p.br ? p.br : "")};
  overflow: ${(p) => (p.overflow ? p.overflow : "")};
  margin-left: ${(p) => (p.ml ? p.ml : "")};
  margin-bottom: ${(p) => (p.mb ? p.mb : "")};
  margin-top: ${(p) => (p.mt ? p.mt : "")};
`;

export const CRow = styled(Row)`
  justify-content: center;
  align-items: center;
`;

export default Row;
