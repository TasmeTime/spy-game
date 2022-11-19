import type { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";
import Row, { RowCss } from "../src/components/common/Row";
import { Author, AuthorLink } from "../src/statics";
import { Colors } from "../src/theme";
import { Provider, useSelector } from "react-redux";
import mainStore, { RootState } from "../src/state/mainStore";
const AppEl = styled(Row)`
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
  left: 0;
  top: 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;

  max-height: 100vh;
`;

const GlobalStyleEl = createGlobalStyle`

  body{
    background-color:${Colors.Black20};
  }
 
  * { 
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
}

   * {
     user-select: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
    /* border: 1px solid red; */

 
    ::-webkit-scrollbar {
    width: 5px;
  }

  input{
     user-select: all;
  }

  ::-webkit-scrollbar-track {
    border-radius: 50px;
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #d2d2d2;
    border-radius: 50px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  }

  a{
    text-decoration: none;
    color:inherit;
    
    :visited{
      color:inherit;
    }
  }
 
 
`;

const FooterEl = styled.footer`
  ${RowCss}
  gap:5px;
  width: 100%;
  max-width: 450px;
  height: 5vh;
  justify-content: center;
  font-size: 0.9rem;
  align-items: center;
  color: ${Colors.White};

  & > a {
    color: ${Colors.Pry40} !important;
    font-weight: Bold;
    font-size: 1.2rem;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyleEl />
      <Provider store={mainStore}>
        <AppEl>
          <Content>
            <Component {...pageProps} />
          </Content>
          <FooterEl>
            By <a href={AuthorLink}>{Author}</a>
          </FooterEl>
        </AppEl>
      </Provider>
    </>
  );
}
