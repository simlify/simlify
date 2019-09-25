import React, { useState } from 'react';
import Curve from './Curve';
import DragHandle from './DragHandle';

import './Bezier.scss';

const Bezier = (props) => {
  const {
    width,
    height,
    className = '',
    styles = {},
    defaultPosition = [0.2, 0.2, 0.8, 0.8],
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

  function onMouseUp(event) {
    
  }

  function onMouseLeave(event) {
    
  }

  function createCurvePointArray() {
    const relativePoints = [0, 0]
      .concat(handler1Position[0], handler1Position[1])
      .concat(handler2Position[0], handler2Position[1])
      .concat([1, 1]);
    return relativePoints.map((point, index) => index % 2 ? (1 - point) * width : point * height)
  }

  const setHandlerDown = (handlerNumber) => {
    setSelectedHandler(handlerNumber);
  }

  const mouseEvents = {
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };

  return (
    <svg
      ref={ref}
      className={`bezier__background ${className}`}
      style={styles}
      width={width}
      height={height}
      {...mouseEvents}
    >
      <Curve
        curveColor="#aaaaaa"
        curveWidth={3}
        positions={createCurvePointArray()}
      />
      <DragHandle 
        width={width}
        height={height}
        position={handler1Position}
        onMouseUp={() => setHandlerDown(null)}
        onMouseDown={() => setHandlerDown(1)}
        bottom
      />
      <DragHandle 
        width={width}
        height={height}
        position={handler2Position}
        onMouseUp={() => setHandlerDown(null)}
        onMouseDown={() => setHandlerDown(2)}
        right
      />
    </svg>
  );
};

export default Bezier;
