import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrapper = styled.section`
  margin: auto;
`

const Input = styled.input`
  border: none;
  font-size: 1.6rem;
  border-bottom: 0.05rem solid #dadada;
`;

const Note = styled.p`
  text-align: center;
  margin-top: auto;
`;

const Submit = styled.input`
  border: none;
  padding: 0.5rem;
  background: black;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 0.4rem;
  align-self: flex-end;

  &:hover {
    opacity: 0.7;
  }
`;

export default function Search() {
  const router = useRouter();

  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const artistInputRef = useRef();

  useEffect(() => {
    artistInputRef.current?.focus();
  }, [])

  return (
    <>
      <Wrapper>
        <h1>Get yo lyrics 🎶</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            router.push(`/lyrics?artist=${artist}&song=${song}`);
          }}
        >
          <p>
            <label htmlFor="artist">Artist</label>
            <br />
            <Input
              ref={artistInputRef}
              placeholder="Frank Ocean"
              type="text"
              minLength="1"
              required
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="song">Song</label>
            <br />
            <Input
              placeholder="White Ferrari"
              type="text"
              minLength="1"
              required
              name="song"
              value={song}
              onChange={(e) => setSong(e.target.value)}
            />
          </p>
          <Submit type="submit" value="search" />
        </form>
        <br />
        <br />
        <br />
      </Wrapper>
      <Note>
        <strong>Important!</strong> You have to type the names correctly or it
        won't work 😿
      </Note>
    </>
  );
}
