import React from 'react';
import { connect } from 'react-redux';
import { alertActions, flowActions, nodeActions } from 'store/actions';
import NodeArea from 'components/NodeArea';
import SideComponents from 'components/SideComponents';
import SideHelper from 'components/SideHelper';
import TabBar from 'components/TabBar';

import ButtonBar from './ButtonBar';
import ImportDialog from './ImportDialog';
import validateFlowJSON from 'helper/validateFlowJSON';

import './Simulator.scss';

class Simulator extends React.Component {
  constructor() {
    super();

    this.state = {
      isImportDialogOpen: false,
    };

    this.nodeAreaRef = React.createRef();
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(nodeActions.loadAvailableNodes());
    this.props.dispatch(flowActions.loadFlow());
  }

  onTabChange(tabIndex) {
    this.props.dispatch(flowActions.changeCurrentFlowIndex(tabIndex));
  }

  handleSelectionChange(object, isSelected = false) {
    const selectedNodeModel = isSelected ? object : {};
    this.props.dispatch(nodeActions.setSelectedNodeModel(selectedNodeModel));
  }

  setImportDialogActive(isOpen) {
    this.setState({ isImportDialogOpen: isOpen });
  }

  importFlowData(jsonFlowString) {
    const jsonFlow = validateFlowJSON(jsonFlowString);
    if (!jsonFlow) {
      this.props.dispatch(alertActions.error('Not a valid Flow'));
    } else {
      this.props.dispatch(flowActions.createNewFlow(jsonFlow));
    }
  }

  onNodeAreaEvent(event) {
    if (event.function === 'selectionChanged') {
      this.handleSelectionChange(event.entity, event.isSelected);
    }
    if (event.function === 'entityRemoved') {
      this.handleSelectionChange(event.entity, false);
    }
  }

  render() {
    const { isImportDialogOpen } = this.state;
    const { flows, currentFlowIndex } = this.props.flowData;
    const { availableNodes, selectedNodeModel } = this.props.nodeData;

    const currentFlow = flows[currentFlowIndex];
    const tabs = flows
      .map(flow => ({ name: flow.name, icon: 'none' }));
    tabs.push({ name: 'Add', icon: 'none' });

    return (
      <div className="simulator">
        <ImportDialog
          open={isImportDialogOpen}
          onClose={() => this.setImportDialogActive(false)}
          onImport={(jsonData) => this.importFlowData(jsonData)}
        />
        <SideComponents
          availableNodes={availableNodes}
        />
        <div className="simulator__nodeArea">
          <ButtonBar 
            nodeAreaRef={this.nodeAreaRef}
            onImportClick={() => this.setImportDialogActive(true)}
          />
          <TabBar
            tabs={tabs}
            onTabChange={(selectedTab) => this.onTabChange(selectedTab)}
          />
          <NodeArea
            ref={this.nodeAreaRef}
            availableNodes={availableNodes}
            options={currentFlow}
            onEvent={(event) => this.onNodeAreaEvent(event)}
          />
        </div>
        <SideHelper
          nodeModel={selectedNodeModel}
        />
      </div>
    );
  }
};

const mapStateToProps = ({ flowData, nodeData }) => ({ flowData, nodeData });

export default connect(mapStateToProps)(Simulator);
