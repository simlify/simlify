import React, { useState } from 'react';
import Curve from './Curve';
import DragHandle from './DragHandle';

import './Bezier.scss';

function renderDragHandle(
  position,
  width,
  height,
  setHandlerDown,
  handlerId = 1,
  invert = false,
) {
  return(
    <DragHandle 
      width={width}
      height={height}
      position={position}
      onMouseUp={() => setHandlerDown(null)}
      onMouseDown={() => setHandlerDown(handlerId)}
      right={handlerId === 2}
      bottom={invert ? handlerId !== 1 : handlerId === 1}
    />
  );
}

function Bezier(props) {
  const {
    width,
    height,
    className = '',
    styles = {},
    defaultPosition = [0.2, 0.2, 0.8, 0.8],
    invert,
    onChange,
  } = props;

  const [selectedHandler, setSelectedHandler] = useState(null);
  const [handler1Position, setHandler1Position] = useState([defaultPosition[0], defaultPosition[1]]);
  const [handler2Position, setHandler2Position] = useState([defaultPosition[2], defaultPosition[3]]);

  const ref = React.createRef();

  function absoluteToRelativePos(absolutePos) {
    const boundingBox = ref.current.getBoundingClientRect();
    const xRelative = (absolutePos[0] - boundingBox.left) / boundingBox.width;
    const yRelative = -(absolutePos[1] - boundingBox.top - boundingBox.height) / boundingBox.height;
    return [xRelative, yRelative];
  };

  function onMouseMove(event) {
    const relPos = absoluteToRelativePos([event.clientX, event.clientY]);
    let positionChanged = false;
    if(selectedHandler === 1) {
      setHandler1Position(relPos);
      positionChanged = true;
    }
    if(selectedHandler === 2) {
      setHandler2Position(relPos);
      positionChanged = true;
    }
    if(positionChanged && onChange) onChange(handler1Position.concat(handler2Position));
  }

  function createCurvePointArray(decreasingCurve = false) {
    // Keep in mind that the point (0, 0) is in the left upper corner
    // Thats why the e.g. (0, 1) is the left lower corner
    let relativePoints = [0, decreasingCurve ? 0 : 1]
      .concat(handler1Position[0], 1 - handler1Position[1])
      .concat(handler2Position[0], 1 - handler2Position[1])
      .concat([1, decreasingCurve ? 1 : 0]);
    return relativePoints.map((point, index) => index % 2 ? point * width : point * height)
  }

  const setHandlerDown = (handlerNumber) => {
    setSelectedHandler(handlerNumber);
  }

  return (
    <svg
      ref={ref}
      className={`bezier__background ${className}`}
      style={styles}
      width={width}
      height={height}
      onMouseMove={onMouseMove}
    >
      <Curve
        curveColor="#aaaaaa"
        curveWidth={3}
        positions={createCurvePointArray(invert)}
      />
      { renderDragHandle(handler1Position, width, height, setHandlerDown, 1, invert) }
      { renderDragHandle(handler2Position, width, height, setHandlerDown, 2, invert) }
    </svg>
  );
};

export default Bezier;
