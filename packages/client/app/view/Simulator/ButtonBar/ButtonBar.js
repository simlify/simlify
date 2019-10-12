import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Menu from '../Menu';
import { flowActions } from 'store/actions';

import './ButtonBar.scss';

export default function ButtonBar({
  nodeAreaRef,
  onImportClick,
  onDeleteClick,
}) {
  const { flows, currentFlowIndex } = useSelector(state => state.flowData);
  const dispatch = useDispatch();
  const currentFlow = flows[currentFlowIndex];

  const sendFlow = () => {
    const serializedFlow = nodeAreaRef.current.serialize();
    dispatch(flowActions.updateFlow(serializedFlow));
  }

  const loadFlow = () => {
    dispatch(flowActions.loadFlow());
  }

  const deleteFlow = () => {
    onDeleteClick();
  }
  
  return (
    <div className="buttonBar">
      <div className="buttonContainer buttonContainer__left">
        <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
          <Button color="secondary" onClick={() => deleteFlow()}>Delete</Button>
        </ButtonGroup>
      </div>
      <div className="buttonContainer">
        <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
          <Button onClick={() => loadFlow()}>Reset</Button>
          <Button onClick={() => sendFlow()}>Save</Button>
        </ButtonGroup>
      </div>
      <Menu
        className="buttonContainer buttonContainer__right"
        nodeArea={nodeAreaRef.current}
        currentFlow={currentFlow}
        onImportClick={onImportClick}
      />
    </div>
  );
};
