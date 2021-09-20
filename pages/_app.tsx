import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.div`
  background-color: lightgray;
  border-bottom: 1px solid gray;
  padding: 1em;
  color: black;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <head>
        <title>Simon Karman</title>
      </head>
      <Link href="/">
        <Header>
          <h1>Simon Karman</h1>
          <p>Programmer and Game Developer</p>
        </Header>
      </Link>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
