import "./css/reset.css";
import "./css/global.css";
import React from "react";
import Board from "./components/Board";
import styled from "styled-components";
import {
  boardDataSubject,
  exportBoardData,
  resetBoardData
} from "./state/boardData";
import { saveAs } from 'file-saver';

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
    if (!file) return reject();

    let fr = new FileReader();
    fr.onload = x=> resolve(fr.result);
    fr.readAsText(file);
  })

}

const LoadBoardFromFile= () =>{
  function read(e) {
    let files= e.target.files;
    if (!files) return
    readFile(files[0])
      .then((content) => {
        const d= JSON.parse(content);
        boardDataSubject.next(d);
      });
  }
  return (
    <input type="file" onChange={read}/>
  );
};


const ExportBoardButton= () => {
  function saveToFile() {
    const content= JSON.stringify(
      exportBoardData(),
      null,
      2
    );
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "board.json");
  }

  return (
    <button onClick={saveToFile}>
      Export
    </button>
  );

};
const ResetBoardButton= () => {
  return (
    <button onClick={resetBoardData}>
      Reset
    </button>
  );
};

function App() {
  return (
    <Container>
      <Heading>
        <LoadBoardFromFile></LoadBoardFromFile>
        <ExportBoardButton></ExportBoardButton>
        <ResetBoardButton></ResetBoardButton>
      </Heading>
      <Board></Board>
    </Container>
  );
}

export default App;
