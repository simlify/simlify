import React, { useState } from 'react';

const DragHandlerLine = ({
  selected,
  strokeVector,
  handleStroke = 3,
  dragHandleColor = '#00c0ff',
}) => {
  return(
    <line
      stroke={dragHandleColor}
      strokeWidth={selected ? 1 + handleStroke : handleStroke}
      x1={strokeVector[0]}
      y1={strokeVector[1]}
      x2={strokeVector[2]}
      y2={strokeVector[3]}
    />
  )
}

const DragHandlerCircle = ({
  selected,
  onMouseDown,
  onMouseUp,
  setHover,
  strokeVector,
  handleStroke = 3,
  handleRadius = 5,
  dragHandleColor = '#00c0ff',
}) => {
  return (
    <circle
      cx={strokeVector[2]}
      cy={strokeVector[3]}
      r={handleRadius}
      stroke={dragHandleColor}
      strokeWidth={selected ? 2 * handleStroke : handleStroke}
      fill={dragHandleColor}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  )
}

const DragHandle = ({
    right,
    bottom,
    width,
    height,
    onMouseUp: propOnMouseUp,
    onMouseDown: propOnMouseDown,
    position = [0.2, 0.2],
}) => {
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  function relativeToAbsolutePos(relativePosition) {
    return [relativePosition[0] * width, height - relativePosition[1] * height];
  }

  const strokeOriginX = right ? width : 0;
  const strokeOriginY = bottom ? height : 0;
  const [strokeDestinationX, strokeDestinationY] = relativeToAbsolutePos(position);

  const strokeVector = [strokeOriginX, strokeOriginY, strokeDestinationX, strokeDestinationY];

  const onMouseUp = () => {
    setDown(false);
    propOnMouseUp();
  };

  const onMouseDown = () => {
    setDown(true);
    propOnMouseDown();
  };

  return(
    <g>
      <DragHandlerLine selected={hover||down} strokeVector={strokeVector} />
      <DragHandlerCircle
        selected={hover||down}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        setHover={setHover}
        strokeVector={strokeVector}
      />
    </g>
  );
}

export default DragHandle;
