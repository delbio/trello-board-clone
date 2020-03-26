import "./css/reset.css";
import "./css/global.css";
import React from "react";
import Board from "./components/Board";
import styled from "styled-components";
import github from "./img/github.png";


const Heading = styled.div`
  font-family: roboto;
  color: white;
  margin: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 40px;
  position: relative;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function readFile(file) {

  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = x=> resolve(fr.result);
    fr.readAsText(file);
  })

}

const LoadBoardFromFile= () =>{
  function read(input) {
    readFile(input.files[0])
      .then((content) => {
        console.log(content);
      });
  }
  return (
    <input type="file" onChange="read(this)"/>
  );
};

function App() {
  return (
    <Container>
      <Heading>
        <LoadBoardFromFile></LoadBoardFromFile>
      </Heading>
      <Board></Board>
    </Container>
  );
}

export default App;
