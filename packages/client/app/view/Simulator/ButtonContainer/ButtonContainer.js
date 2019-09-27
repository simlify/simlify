import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import NodeArea from '../../components/NodeArea';
import TabBar from '../../components/TabBar';
import DropDownButton from '../../components/DropDownButton';
import api from '../../../helper/api';
import convertForApi from '../../../helper/convertForApi';
import SideHelper from '../../components/SideHelper';

import './Simulator.scss';

export default function ButtonContainer(props) {

  const loadFlows = () => {
    api.getFlows()
    .then((flows) => {
      this.setState({ flows });
    })
    .catch((err) => {
      console.log(err)
    });
  }

  getFlowSerialized() {
    return props.nodeAreaRef.current.serialize();
  }

  sendFlow() {
    const serializedFlow = this.getFlowSerialized();
    const currentFlow = this.state.flows[this.state.currentFlowIndex];
    serializedFlow.id = currentFlow.id;
    serializedFlow.name = currentFlow.name;
    const serializedFlowForApi = convertForApi.convertFlow(serializedFlow);
    api.putFlow(serializedFlowForApi)
      .then(updatedFlow => {
        const { flows, currentFlowIndex } = this.state;
        flows[currentFlowIndex] = updatedFlow;
        this.setState({ flows });
      })
      .catch(console.log);
  }

  render() {
    const {
      flows,
      currentFlowIndex,
      availableNodes,
      selectedNodeModel
    } = this.state;

    const currentFlow = flows[currentFlowIndex];
    const tabs = flows
      .map(flow => ({ name: flow.name, icon: 'none' }));
    tabs.push({ name: 'Add', icon: 'none' });

    return (
          <div className="buttonBar">
            <div className="buttonContainer"/>
            <div className="buttonContainer">
              <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
                <Button onClick={() => this.loadFlows()}>Reset</Button>
                <Button onClick={() => this.sendFlow()}>Save</Button>
              </ButtonGroup>
            </div>
            <DropDownButton
              className="buttonContainer buttonContainer__right"
              items={['Import Flow', 'Export Flow']}
              onClick={(index) => console.log(index)}
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

export default Simulator;
