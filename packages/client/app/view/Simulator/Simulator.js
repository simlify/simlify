import React from 'react';
import { connect } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import NodeArea from '../../components/NodeArea';
import TabBar from '../../components/TabBar';
import DropDownButton from '../../components/DropDownButton';
import api from '../../../helper/api';
import SideHelper from '../../components/SideHelper';
import Menu from './Menu';
import { flowActions } from '../../store/actions';

import './Simulator.scss';

class Simulator extends React.Component {
  constructor() {
    super();

    this.state = {
      availableNodes: {},
      selectedNodeModel: {},
    };

    this.nodeAreaRef = React.createRef();
  }

  UNSAFE_componentWillMount() {
    api.getAvailableNodes()
      .then((availableNodes) => {
        this.setState({ availableNodes });
      })
      .catch((err) => {
        console.log(err)
      });

      this.loadFlows();
  }

  loadFlows() {
    this.props.dispatch(flowActions.loadFlow());
  }

  getFlowSerialized() {
    return this.nodeAreaRef.current.serialize();
  }

  sendFlow() {
    const serializedFlow = this.getFlowSerialized();
    this.props.dispatch(flowActions.sendFlow(serializedFlow));
  }

  onTabChange(tabIndex) {
    const { flows } = this.props.flowData;
    if (tabIndex > flows.length - 1) {
      tabIndex = flows.length;
      api.postFlow()
      .then((newFlow) => {
        flows.push(newFlow);
        this.props.dispatch(flowActions.changeCurrentFlowIndex(tabIndex));
      })
      .catch(console.log);
    } else {
      this.props.dispatch(flowActions.changeCurrentFlowIndex(tabIndex));
    }
  }

  handleSelectionChange(object, isSelected = false) {
    const selectedNodeModel = isSelected ? object : {};
    this.setState({ selectedNodeModel });
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
    const {
      availableNodes,
      selectedNodeModel
    } = this.state;

    const { flows, currentFlowIndex } = this.props.flowData;

    const currentFlow = flows[currentFlowIndex];
    const tabs = flows
      .map(flow => ({ name: flow.name, icon: 'none' }));
    tabs.push({ name: 'Add', icon: 'none' });

    return (
      <div className="simulator">
        <div className="simulator__nodeArea">
          <div className="simulator__buttonBar">
            <div className="buttonContainer"/>
            <div className="buttonContainer">
              <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
                <Button onClick={() => this.loadFlows()}>Reset</Button>
                <Button onClick={() => this.sendFlow()}>Save</Button>
              </ButtonGroup>
            </div>
            <Menu
              className="buttonContainer buttonContainer__right"
              nodeArea={this.nodeAreaRef.current}
              currentFlow={currentFlow}
            />
          </div>
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

function mapStateToProps(state) {
  const { flowData } = state;
  return {
    flowData,
  };
}

export default connect(mapStateToProps)(Simulator);
