import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos"))|| [
  { id: 1, text: "Aprender React.js" },
  { id: 2, text: "Aprender JS" },
  { id: 3, text: "Aprender Vue.js" },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyArray = [...todos];
    const [reorderedItem] = copyArray.splice(startIndex, 1);
    copyArray.splice(endIndex, 0, reorderedItem);
    setTodos(copyArray);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo simple</h1>
      <Droppable droppableId="todos">
        {(dropableProvider) => (
          <ul
            ref={dropableProvider.innerRef}
            {...dropableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                  >
                    {todo.text}{" "}
                  </li>
                )}
              </Draggable>
            ))}
            {dropableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
