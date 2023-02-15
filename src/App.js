import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
const generator = rough.generator();
const createElement = (id, x1, y1, x2, y2) => {
  const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  console.log({ id, x1, y1, x2, y2, roughElement });
  return { id, x1, y1, x2, y2, roughElement };
};
const drawElement = (roughCanvas, context, element) => {
  roughCanvas.draw(element.roughElement);
};
const App = () => {
  const [elements, setElements] = useState([]);
  const [rectValue, setRectValue] = useState(100);
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      drawElement(roughCanvas, context, element);
    });
  }, [elements]);
  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    const id = elements.length;
    const element = createElement(
      id,
      clientX,
      clientY,
      clientX + rectValue,
      clientY + rectValue,
      "rectangle"
    );
    setElements((prevState) => [...prevState, element]);
    console.log(element);
  };
  const handelOnChange = (e) => {
    setRectValue(parseInt(e.target.value));
  };
  const handelIncrease = () => {
    setRectValue(rectValue + 50);
  };
  const handelDecrease = () => {
    setRectValue(rectValue - 50);
  };
  return (
    <>
      <button onClick={handelDecrease}> - </button>
      <input type={"number"} value={rectValue} onChange={handelOnChange} />
      <button onClick={handelIncrease}> + </button>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
      />
    </>
  );
};
export default App;
