import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";

const SEARCH_PATHNAME = "/";

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 1rem);
  margin: 0.5rem;
  background-color: white;
  padding: 2rem 0;
  position: relative;
  border-radius: 0.4rem;
`;

const Main = styled.main`
  display: flex;
  flex: 1 0 100%;
  flex-direction: column;
`;

const GoBack = styled.a`
  display: block;
  position: sticky;
  bottom: 1rem;
  width: 9rem;
  text-align: center;
  background: black;
  color: white;
  padding: 0.8rem;
  cursor: pointer;
  margin-left: auto;
  border-radius: 0.4rem;
  margin-right: 1rem;

  &:hover {
    opacity: 0.7;
  }
`;

export default function Layout({ children }) {
  const router = useRouter();

  const search = router.pathname === SEARCH_PATHNAME;

  return (
    <Container>
      <Head>
        <title>Lyrics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        {children}
        {!search && <Link href="/"><GoBack>Search</GoBack></Link>}
      </Main>
    </Container>
  );
}
