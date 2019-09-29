import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropDownButton from 'components/DropDownButton';
import convertForApi from 'helper/convertForApi';
import { alertActions } from 'store/actions';

import './Menu.scss';

export default function Menu(props) {
  const dispatch = useDispatch();

  const importFlow = () => {
    props.onImportClick();
  };

  const exportFlow = () => {
    const { nodeArea, currentFlow } = props;
    const flowSerialized = nodeArea.serialize();
    const flowSerializedForExport = convertForApi.convertFlow(flowSerialized);
    flowSerializedForExport.name = currentFlow.name;
    navigator.clipboard.writeText(JSON.stringify(flowSerializedForExport));
    dispatch(alertActions.success('Exported flow to clipboard'));
  };

  const items = [
    { name: 'Import Flow', func: importFlow },
    { name: 'Export Flow', func: exportFlow },
  ];

  return (
    <DropDownButton
      className={`${props.className || ''}`}
      items={items.map(item => item.name)}
      onClick={(index) => items[index].func()}
    />
  );
};
