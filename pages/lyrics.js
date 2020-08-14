import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "@emotion/styled";
import Link from "next/link";
import randomColor from "randomcolor";
import { useEffect } from "react";
import Head from "next/head";

const API = "https://api.lyrics.ovh/v1";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const Pre = styled.pre`
  white-space: break-spaces;
  padding: 0 1rem;
  max-width: 768px;
  font-size: 1.4rem;
  line-height: 2;
`;

const Loading = styled.h1`
  font-size: 3rem;
`;

export default function Lyrics(props) {
  const router = useRouter();
  const { artist, song } = router.query;

  const { data } = useSWR(`${API}/${artist}/${song}`, fetcher);

  useEffect(() => {
    if (document && document.body) {
      document.body.style.backgroundColor = randomColor();
    }
  }, []);

  const searchQuery = `${song} by ${artist}`;

  return (
    <>
      <Head>
        <title>{searchQuery}</title>
      </Head>
      <Section>
        {!data && <Loading>Loading</Loading>}
        {data &&
          (data.lyrics ? (
            <>
              <h1>{searchQuery}</h1>
              <Pre>{data.lyrics}</Pre>
            </>
          ) : (
            <>
              <h1>{data.error} 😿</h1>
              <p>
                <span>{`your search for ${searchQuery} didn't go to well, `}</span>
                <Link href="/">
                  <a>try again</a>
                </Link>
              </p>
            </>
          ))}
      </Section>
    </>
  );
}
