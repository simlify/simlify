import React, { useState } from 'react';

const DragHandle = (props) => {
  const {
    right,
    bottom,
    width,
    height,
    position = [0.2, 0.2],
  } = props;

  const dragHandleColor = '#00c0ff';
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const handleStroke = 3;
  const handleRadius = 5;

  function relativeToAbsolutePos(relativePosition) {
    return [relativePosition[0] * width, height - relativePosition[1] * height];
  }

  let strokeOriginX = 0;
  let strokeOriginY = 0;
  let [strokeDestinationX, strokeDestinationY] = relativeToAbsolutePos(position);

  if(bottom) {
    strokeOriginY = height;
  }
  if(right) {
    strokeOriginX = width;
  }

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);
  const onMouseUp = () => {
    setDown(false);
    props.onMouseUp();
  };
  const onMouseDown = () => {
    setDown(true);
    props.onMouseDown();
  };

  return(
    <g>
      <line
        stroke={dragHandleColor}
        strokeWidth={hover||down ? 1 + handleStroke : handleStroke}
        x1={strokeOriginX}
        y1={strokeOriginY}
        x2={strokeDestinationX}
        y2={strokeDestinationY} />
      <circle
        cx={strokeDestinationX}
        cy={strokeDestinationY}
        r={handleRadius}
        stroke={dragHandleColor}
        strokeWidth={hover||down ? 2 * handleStroke : handleStroke}
        fill={dragHandleColor}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </g>
  );
}

export default DragHandle;
