import React from 'react';

import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { RightSidePanel, FlexContainer, ContentWrapper } from '@atlaskit/right-side-panel';
import SectionMessage from '@atlaskit/section-message';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';
import Lozenge from '@atlaskit/lozenge';

const Stats = ({data}) => {

  if(!data || (!Object.keys(data).length)) {
    return (
      <h4>No active tasks found</h4>
    );
  }

  return (<div>
    {
      Object.keys(data).map((taskKey) => {
        let tasks = data[taskKey].tasks;
        return (
          <div>
            {
              Object.keys(tasks).map((taskId, i) => {
                let taskObj = tasks[taskId];
                let status = taskObj['status'];
                let indexingPercentage = (status['created'] + status['updated'] + status['deleted']) / status['total'] * 100;
                indexingPercentage = Math.floor(indexingPercentage);
                return (
                  <div className="task-section">
                    <h4>Task {i + 1}</h4>
                    <h5><Lozenge appearance={'new'}>{indexingPercentage + '%'}</Lozenge></h5>
                    <div>
                      <span>
                        <label>Total</label>
                      </span>
                      <span>
                        <label>{status['total']}</label>
                      </span>
                    </div>
                    <div>
                      <span>
                        <label>Created</label>
                      </span>
                      <span>
                        <label>{status['created']}</label>
                      </span>
                    </div>
                    <div>
                      <span>
                        <label>Updated</label>
                      </span>
                      <span>
                        <label>{status['updated']}</label>
                      </span>
                    </div>
                    <div>
                      <span>
                        <label>Deleted</label>
                      </span>
                      <span>
                        <label>{status['deleted']}</label>
                      </span>
                    </div>
                    <div>
                      <span>
                        <label>Indexing percentage</label>
                      </span>
                      <span>
                        <label>{indexingPercentage}</label>
                      </span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      })
    }
    </div>
  )
}

function RightPanel(props) {
  return (
      <FlexContainer id="RightSidePanelExample">
        <ContentWrapper>
          <RightSidePanel isOpen={props.isOpen} attachPanelTo="RightSidePanelExample">
            <div className="panel-header">
              <div><Page24Icon /></div>
              <div onClick={props.closePanel}><EditorCloseIcon /></div>
            </div>
            <SectionMessage appearance="info" title="Running tasks:">
              <Stats data={props.data} />
            </SectionMessage>
          </RightSidePanel>
        </ContentWrapper>
      </FlexContainer>
    );
}

export default RightPanel;