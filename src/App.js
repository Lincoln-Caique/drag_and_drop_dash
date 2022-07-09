/* eslint-disable no-unused-vars */
import './App.css';
import { useState, useEffect } from 'react';
import GlobalStyle from './global';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Whapper = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
 
`;

const Main = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 50%;
  /* min-height: 800px; */
  background-color: ${props => props.color};
`;

const ContainerGraph = styled.li`
  width: 400px;
  height: 200px;
  display: flex;
  align-items: center;
  border: solid 2px #d0d0d0;
  border-radius: .2em;
  padding: .5em .8em .5em .5em;
  margin-bottom: 1em;
  background-color: #FFD17D;
  

  .type {
    display: flex;
    padding-left: 0;
    padding-top: 4em;
  }

`;


const graphsDate = [

  {
    "id": 3090, "type": 1, "tag": "1", "period": 2592000, "sensors": {
      "temp": [
        {
          "mac": "4548AAEE0001",
          "name": "36"
        }
      ]
    },
    "userId": 43
  },
  {
    "id": 3091, "type": 2, "tag": "2", "period": 0, "sensors": {
      "fftx": [
        {
          "mac": "4548AAEE0001",
          "name": "36"
        }
      ]
    },
    "userId": 43
  },
  {
    "id": 3093, "type": 3, "tag": "3", "period": 0, "sensors": {
      "accRawy": [
        {
          "mac": "4548AAEE0004",
          "name": "37"
        }
      ]
    },
    "userId": 43
  }
];

const graphsDateRight = [];



function App() {

  const [graphs, updateGraph] = useState(graphsDate);
  const [graphsRight, updateGraphRight] = useState(graphsDateRight);

  // const [hasLoaded, setHasLoaded] = useState(false);

  // useEffect(() => {
  //   const existingGraphs = JSON.parse(
  //     localStorage.getItem("graph_positions")
  //   );
  //   updateGraph(existingGraphs);
  //   setHasLoaded(true);

  // }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(graphs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateGraph(items);
  };

  // useEffect(() => {
  //   localStorage.setItem('graph_positions', JSON.stringify(graphs))
  // }, [graphs])




  return (
    <>
      <GlobalStyle />
      <Whapper>
        <DragDropContext onDragEnd={handleOnDragEnd}>

          <Droppable droppableId='graphs'>
            {(provided) => (
              <Main  {...provided.droppableProps} ref={provided.innerRef}>
                Esquerda
                {graphs.map(({ id, type, tag }, index) => {
                  return (
                    <Draggable key={id} draggableId={`${id}`} index={index}>
                      {(provided) => (
                        <ContainerGraph 
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                         {...provided.dragHandleProps}>
                          <div >
                            <h1 >{tag}</h1>
                          </div>
                          <p className='type'>
                            Type:{type}
                          </p>
                        </ContainerGraph>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Main>
            )}
          </Droppable>

          <Droppable droppableId='graphs2'>
            {(provided) => (
              <Main color='blue' {...provided.droppableProps} ref={provided.innerRef}>
                Direita
                {graphsRight?.map(({ id, type, tag }, index) => {
                  return (
                    <Draggable key={id} draggableId={`${id}`} index={index}>
                      {(provided) => (
                        <ContainerGraph 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                          <div >
                            <h1 >{tag}</h1>
                          </div>
                          <p className='type'>
                            Type:{type}
                          </p>
                        </ContainerGraph>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Main>
            )}
          </Droppable>
        </DragDropContext>
      </Whapper>


    </>
  );
}

export default App;
