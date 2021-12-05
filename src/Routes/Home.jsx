import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Main = styled.div`
  display: grid;
  width: 60vw;
  min-width: 950px;
  max-width: 1200px;
  padding: 80px 10px 0px 10px;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 20px;
  background-color: #1e1e1e;
`;

const Tempbox = styled.div`
  height: 400px;
  background-color: blue;
`;

function Home() {
  return (
    <Wrapper>
      <Main>
        <Tempbox></Tempbox>
        <Tempbox></Tempbox>
        <Tempbox></Tempbox>
        <Tempbox></Tempbox>
        <Tempbox></Tempbox>
        <Tempbox></Tempbox>
        <Tempbox></Tempbox>
      </Main>
    </Wrapper>
  );
}

export default Home;
